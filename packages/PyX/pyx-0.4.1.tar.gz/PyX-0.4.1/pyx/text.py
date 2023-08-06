#!/usr/bin/env python
# -*- coding: ISO-8859-1 -*-
#
#
# Copyright (C) 2002-2003 J�rg Lehmann <joergl@users.sourceforge.net>
# Copyright (C) 2002-2003 Andr� Wobst <wobsta@users.sourceforge.net>
# Copyright (C) 2003 Michael Schindler <m-schindler@users.sourceforge.net>
#
# This file is part of PyX (http://pyx.sourceforge.net/).
#
# PyX is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# PyX is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with PyX; if not, write to the Free Software
# Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA  02111-1307  USA

import exceptions, glob, os, threading, Queue, traceback, re, struct, tempfile, sys, atexit, time
import helper, unit, bbox, box, base, canvas, color, trafo, path, prolog, pykpathsea, version

class fix_word:
    def __init__(self, word):
        if word >= 0:
            self.sign = 1
        else:
            self.sign = -1

        self.precomma = abs(word) >> 20
        self.postcomma = abs(word) & 0xFFFFF

    def __float__(self):
        return self.sign * (self.precomma + 1.0*self.postcomma/0xFFFFF)

    def __mul__(self, other):
        # hey, it's Q&D
        result = fix_word(0)

        result.sign = self.sign*other.sign
        c = self.postcomma*other.precomma + self.precomma*other.postcomma
        result.precomma = self.precomma*other.precomma + (c >> 20)
        result.postcomma = c & 0xFFFFF + ((self.postcomma*other.postcomma) >> 40)
        return result


class binfile:

    def __init__(self, filename, mode="r"):
        self.file = open(filename, mode)

    def tell(self):
        return self.file.tell()

    def read(self, bytes):
        return self.file.read(bytes)

    def readint(self, bytes=4, signed=0):
        first = 1
        result = 0
        while bytes:
            value = ord(self.file.read(1))
            if first and signed and value > 127:
                value -= 256
            first = 0
            result = 256 * result + value
            bytes -= 1
        return result

    def readint32(self):
        return struct.unpack(">l", self.file.read(4))[0]

    def readuint32(self):
        return struct.unpack(">L", self.file.read(4))[0]

    def readint24(self):
        # XXX: checkme
        return struct.unpack(">l", "\0"+self.file.read(3))[0]

    def readuint24(self):
        # XXX: checkme
        return struct.unpack(">L", "\0"+self.file.read(3))[0]

    def readint16(self):
        return struct.unpack(">h", self.file.read(2))[0]

    def readuint16(self):
        return struct.unpack(">H", self.file.read(2))[0]

    def readchar(self):
        return struct.unpack("b", self.file.read(1))[0]

    def readuchar(self):
        return struct.unpack("B", self.file.read(1))[0]

    def readstring(self, bytes):
        l = self.readuchar()
        assert l <= bytes-1, "inconsistency in file: string too long"
        return self.file.read(bytes-1)[:l]


# class tokenfile:
#     """ ascii file containing tokens separated by spaces.
#
#     Comments beginning with % are ignored. Strings containing spaces
#     are not handled correctly
#     """
#
#     def __init__(self, filename):
#         self.file = open(filename, "r")
#         self.line = None
#
#     def gettoken(self):
#         """ return next token or None if EOF """
#         while not self.line:
#             line = self.file.readline()
#             if line == "":
#                 return None
#             self.line = line.split("%")[0].split()
#         token = self.line[0]
#         self.line = self.line[1:]
#         return token
#
#     def close(self):
#         self.file.close()


##############################################################################
# TFM file handling
##############################################################################

class TFMError(exceptions.Exception): pass


class char_info_word:
    def __init__(self, word):
        self.width_index  = int((word & 0xFF000000L) >> 24) #make sign-safe
        self.height_index = (word & 0x00F00000) >> 20
        self.depth_index  = (word & 0x000F0000) >> 16
        self.italic_index = (word & 0x0000FC00) >> 10
        self.tag          = (word & 0x00000300) >> 8
        self.remainder    = (word & 0x000000FF)


class TFMFile:
    def __init__(self, name, debug=0):
        self.file = binfile(name, "rb")
        self.debug = debug

        #
        # read pre header
        #

        self.lf = self.file.readint16()
        self.lh = self.file.readint16()
        self.bc = self.file.readint16()
        self.ec = self.file.readint16()
        self.nw = self.file.readint16()
        self.nh = self.file.readint16()
        self.nd = self.file.readint16()
        self.ni = self.file.readint16()
        self.nl = self.file.readint16()
        self.nk = self.file.readint16()
        self.ne = self.file.readint16()
        self.np = self.file.readint16()

        if not (self.bc-1 <= self.ec <= 255 and
                self.ne <= 256 and
                self.lf == 6+self.lh+(self.ec-self.bc+1)+self.nw+self.nh+self.nd
                +self.ni+self.nl+self.nk+self.ne+self.np):
            raise TFMError, "error in TFM pre-header"

        if debug:
            print "lh=%d" % self.lh

        #
        # read header
        #

        self.checksum = self.file.readint32()
        self.designsizeraw = self.file.readint32()
        assert self.designsizeraw > 0, "invald design size"
        self.designsize = fix_word(self.designsizeraw)
        if self.lh > 2:
            assert self.lh > 11, "inconsistency in TFM file: incomplete field"
            self.charcoding = self.file.readstring(40)
        else:
            self.charcoding = None

        if self.lh > 12:
            assert self.lh > 16, "inconsistency in TFM file: incomplete field"
            self.fontfamily = self.file.readstring(20)
        else:
            self.fontfamily = None

        if self.debug:
            print "(FAMILY %s)" % self.fontfamily
            print "(CODINGSCHEME %s)" % self.charcoding
            print "(DESINGSIZE R %f)" % self.designsize

        if self.lh > 17:
            self.sevenbitsave = self.file.readuchar()
            # ignore the following two bytes
            self.file.readint16()
            facechar = self.file.readuchar()
            # decode ugly face specification into the Knuth suggested string
            if facechar < 18:
                if facechar >= 12:
                    self.face = "E"
                    facechar -= 12
                elif facechar >= 6:
                    self.face = "C"
                    facechar -= 6
                else:
                    self.face = "R"

                if facechar >= 4:
                    self.face = "L" + self.face
                    facechar -= 4
                elif facechar >= 2:
                    self.face = "B" + self.face
                    facechar -= 2
                else:
                    self.face = "M" + self.face

                if facechar == 1:
                    self.face = self.face[0] + "I" + self.face[1]
                else:
                    self.face = self.face[0] + "R" + self.face[1]

            else:
                self.face = None
        else:
            self.sevenbitsave = self.face = None

        if self.lh > 18:
            # just ignore the rest
            print self.file.read((self.lh-18)*4)

        #
        # read char_info
        #

        self.char_info = [None]*(self.ec+1)

        for charcode in range(self.bc, self.ec+1):
            self.char_info[charcode] = char_info_word(self.file.readint32())
            if self.char_info[charcode].width_index == 0:
                # disable character if width_index is zero
                self.char_info[charcode] = None

        #
        # read widths
        #

        self.width = [None for width_index in range(self.nw)]
        for width_index in range(self.nw):
            # self.width[width_index] = fix_word(self.file.readint32())
            self.width[width_index] = self.file.readint32()

        #
        # read heights
        #

        self.height = [None for height_index in range(self.nh)]
        for height_index in range(self.nh):
            # self.height[height_index] = fix_word(self.file.readint32())
            self.height[height_index] = self.file.readint32()

        #
        # read depths
        #

        self.depth = [None for depth_index in range(self.nd)]
        for depth_index in range(self.nd):
            # self.depth[depth_index] = fix_word(self.file.readint32())
            self.depth[depth_index] = self.file.readint32()

        #
        # read italic
        #

        self.italic = [None for italic_index in range(self.ni)]
        for italic_index in range(self.ni):
            # self.italic[italic_index] = fix_word(self.file.readint32())
            self.italic[italic_index] = self.file.readint32()

        #
        # read lig_kern
        #

        # XXX decode to lig_kern_command

        self.lig_kern = [None for lig_kern_index in range(self.nl)]
        for lig_kern_index in range(self.nl):
            self.lig_kern[lig_kern_index] = self.file.readint32()

        #
        # read kern
        #

        self.kern = [None for kern_index in range(self.nk)]
        for kern_index in range(self.nk):
            # self.kern[kern_index] = fix_word(self.file.readint32())
            self.kern[kern_index] = self.file.readint32()

        #
        # read exten
        #

        # XXX decode to extensible_recipe

        self.exten = [None for exten_index in range(self.ne)]
        for exten_index in range(self.ne):
            self.exten[exten_index] = self.file.readint32()

        #
        # read param
        #

        # XXX decode

        self.param = [None for param_index in range(self.np)]
        for param_index in range(self.np):
            self.param[param_index] = self.file.readint32()

        self.file.file.close()


# class FontEncoding:
#
#     def __init__(self, filename):
#         """ font encoding contained in filename """
#         encpath = pykpathsea.find_file(filename, pykpathsea.kpse_tex_ps_header_format)
#         encfile = tokenfile(encpath)
#
#         # name of encoding
#         self.encname = encfile.gettoken()
#         token = encfile.gettoken()
#         if token != "[":
#             raise RuntimeError("cannot parse encoding file '%s', expecting '[' got '%s'" % (filename, token))
#         self.encvector = []
#         for i in range(256):
#             token = encfile.gettoken()
#             if token is None or token=="]":
#                 raise RuntimeError("not enough charcodes in encoding file '%s'" % filename)
#             self.encvector.append(token)
#         if encfile.gettoken() != "]":
#             raise RuntimeError("too many charcodes in encoding file '%s'" % filename)
#         token = encfile.gettoken()
#         if token != "def":
#             raise RuntimeError("cannot parse encoding file '%s', expecting 'def' got '%s'" % (filename, token))
#         token = encfile.gettoken()
#         if token != None:
#             raise RuntimeError("encoding file '%s' too long" % filename)
#         encfile.close()
#
#     def encode(self, charcode):
#         return self.encvector[charcode]

##############################################################################
# Font handling
##############################################################################

_ReEncodeFont = prolog.definition("ReEncodeFont", """{
  5 dict
  begin
    /newencoding exch def
    /newfontname exch def
    /basefontname exch def
    /basefontdict basefontname findfont def
    /newfontdict basefontdict maxlength dict def 
    basefontdict {
      exch dup dup /FID ne exch /Encoding ne and
      { exch newfontdict 3 1 roll put }
      { pop pop }
      ifelse
    } forall
    newfontdict /FontName newfontname put
    newfontdict /Encoding newencoding put
    newfontname newfontdict definefont pop
  end
}""")

#
# PostScript font selection and output primitives
#

class _selectfont(base.PSOp):
    def __init__(self, name, size):
        self.name = name
        self.size = size

    def write(self, file):
        file.write("/%s %f selectfont\n" % (self.name, self.size))

    # XXX: should we provide a prolog method for the font inclusion
    # instead of using the coarser logic in DVIFile.prolog


class _show(base.PSOp):
    def __init__(self, x, y, s):
        self.x = x
        self.y = y
        self.s = s

    def write(self, file):
        file.write("%f %f moveto (%s) show\n" % (self.x, self.y, self.s))


class FontMapping:

    tokenpattern = re.compile(r'"(.*?)("\s+|"$|$)|(.*?)(\s+|$)')

    def __init__(self, s):
        """ construct font mapping from line s of dvips mapping file """
        self.texname = self.basepsname = self.fontfile = None

        # standard encoding
        self.encodingfile = None

        # supported postscript fragments occuring in psfonts.map
        self.reencodefont = self.extendfont = self.slantfont = None

        tokens = []
        while len(s):
            match = self.tokenpattern.match(s)
            if match:
                if match.groups()[0]:
                    tokens.append('"%s"' % match.groups()[0])
                else:
                    tokens.append(match.groups()[2])
                s = s[match.end():]
            else:
                raise RuntimeError("wrong syntax in font catalog file 'psfonts.map'")

        for token in tokens:
            if token.startswith("<"):
                if token.startswith("<<"):
                    # XXX: support non-partial download here
                    self.fontfile = token[2:]
                elif token.startswith("<["):
                    self.encodingfile = token[2:]
                elif token.endswith(".pfa") or token.endswith(".pfb"):
                    self.fontfile = token[1:]
                elif token.endswith(".enc"):
                    self.encodingfile = token[1:]
                else:
                    raise RuntimeError("wrong syntax in font catalog file 'psfonts.map'")
            elif token.startswith('"'):
                pscode = token[1:-1].split()
                # parse standard postscript code fragments
                while pscode:
                    try:
                        arg, cmd = pscode[:2]
                    except:
                        raise RuntimeError("Unsupported Postscript fragment '%s' in psfonts.map" % pscode)
                    pscode = pscode[2:]
                    if cmd == "ReEncodeFont":
                        self.reencodefont = arg
                    elif cmd == "ExtendFont":
                        self.extendfont = arg
                    elif cmd == "SlantFont":
                        self.slantfont = arg
                    else:
                        raise RuntimeError("Unsupported Postscript fragment '%s %s' in psfonts.map" % (arg, cmd))
            else:
                if self.texname is None:
                    self.texname = token
                else:
                    self.basepsname = token
        if self.basepsname is None:
            self.basepsname = self.texname

    def __str__(self):
        return ("'%s' is '%s' read from '%s' encoded as '%s'" %
                (self.texname, self.basepsname, self.fontfile, repr(self.encodingfile)))

# generate fontmap

def readfontmap(filenames):
    """ read font map from filename (without path) """
    fontmap = {}
    for filename in filenames:
        mappath = pykpathsea.find_file(filename, pykpathsea.kpse_dvips_config_format)
        if not mappath:
            raise RuntimeError("cannot find dvips font catalog '%s', aborting" % filename)
        mapfile = open(mappath, "r")
        for line in mapfile.readlines():
            line = line.rstrip()
            if not (line=="" or line[0] in (" ", "%", "*", ";" , "#")):
                fontmapping = FontMapping(line)
                fontmap[fontmapping.texname] = fontmapping

        mapfile.close()
    return fontmap


fontmap = readfontmap(["psfonts.map"])


class Font:
    def __init__(self, name, c, q, d, tfmconv, debug=0):
        self.name = name
        self.tfmpath = pykpathsea.find_file("%s.tfm" % self.name, pykpathsea.kpse_tfm_format)
        if not self.tfmpath:
            raise TFMError("cannot find %s.tfm" % self.name)
        self.tfmfile = TFMFile(self.tfmpath, debug)
        self.fontmapping = fontmap.get(name)
        if self.fontmapping is None:
            raise RuntimeError("no information for font '%s' found in font mapping file, aborting" % name)
        # print "found mapping %s for font %s" % (self.fontmapping, self.name)

        if self.tfmfile.checksum != c:
            raise DVIError("check sums do not agree: %d vs. %d" %
                           (self.tfmfile.checksum, c))

        self.tfmdesignsize = round(tfmconv*self.tfmfile.designsizeraw)

        if abs(self.tfmdesignsize - d) > 2:
            raise DVIError("design sizes do not agree: %d vs. %d" %
                           (self.tfmdesignsize, d))
        if q < 0 or q > 134217728:
            raise DVIError("font '%s' not loaded: bad scale" % self.name)
        if d < 0 or d > 134217728:
            raise DVIError("font '%s' not loaded: bad design size" % self.name)

        self.scale = 1.0*q/d
        self.alpha = 16;
        self.q = self.qorig = q
        while self.q >= 8388608:
            self.q = self.q/2
            self.alpha *= 2

        self.beta = 256/self.alpha;
        self.alpha = self.alpha*self.q;

        # for bookkeeping of used characters
        self.usedchars = [0] * 256

    def __str__(self):
        return "Font(%s, %d)" % (self.name, self.tfmdesignsize)

    __repr__ = __str__

    def convert(self, width):
        # simplified version
        return 16L*width*self.qorig/16777216L

        # original algorithm of Knuth (at the moment not used)
        b0 = width >> 24
        b1 = (width >> 16) & 0xff
        b2 = (width >> 8 ) & 0xff
        b3 = (width      ) & 0xff

        if b0 == 0:
            return (((((b3*self.q)/256)+(b2*self.q))/256)+(b1*self.q))/self.beta
        elif b0 == 255:
            return (((((b3*self.q)/256)+(b2*self.q))/256)+(b1*self.q))/self.beta-self.alpha
        else:
            raise TFMError("error in font size")

    def getwidth(self, charcode):
        return self.convert(self.tfmfile.width[self.tfmfile.char_info[charcode].width_index])

    def getheight(self, charcode):
        return self.convert(self.tfmfile.height[self.tfmfile.char_info[charcode].height_index])

    def getdepth(self, charcode):
        return self.convert(self.tfmfile.depth[self.tfmfile.char_info[charcode].depth_index])

    def getitalic(self, charcode):
        return self.convert(self.tfmfile.italic[self.tfmfile.char_info[charcode].italic_index])

    def markcharused(self, charcode):
        self.usedchars[charcode] = 1

    def mergeusedchars(self, otherfont):
        for i in range(len(self.usedchars)):
            self.usedchars[i] = self.usedchars[i] or otherfont.usedchars[i]

    def getbasepsname(self):
        return self.fontmapping.basepsname

    def getpsname(self):
        if self.fontmapping.reencodefont:
            return "%s-%s" % (self.fontmapping.basepsname, self.fontmapping.reencodefont)
        else:
            return self.fontmapping.basepsname

    def getfontfile(self):
        return self.fontmapping.fontfile

    def getencoding(self):
        return self.fontmapping.reencodefont

    def getencodingfile(self):
        return self.fontmapping.encodingfile

##############################################################################
# DVI file handling
##############################################################################

_DVI_CHARMIN     =   0 # typeset a character and move right (range min)
_DVI_CHARMAX     = 127 # typeset a character and move right (range max)
_DVI_SET1234     = 128 # typeset a character and move right
_DVI_SETRULE     = 132 # typeset a rule and move right
_DVI_PUT1234     = 133 # typeset a character
_DVI_PUTRULE     = 137 # typeset a rule
_DVI_NOP         = 138 # no operation
_DVI_BOP         = 139 # beginning of page
_DVI_EOP         = 140 # ending of page
_DVI_PUSH        = 141 # save the current positions (h, v, w, x, y, z)
_DVI_POP         = 142 # restore positions (h, v, w, x, y, z)
_DVI_RIGHT1234   = 143 # move right
_DVI_W0          = 147 # move right by w
_DVI_W1234       = 148 # move right and set w
_DVI_X0          = 152 # move right by x
_DVI_X1234       = 153 # move right and set x
_DVI_DOWN1234    = 157 # move down
_DVI_Y0          = 161 # move down by y
_DVI_Y1234       = 162 # move down and set y
_DVI_Z0          = 166 # move down by z
_DVI_Z1234       = 167 # move down and set z
_DVI_FNTNUMMIN   = 171 # set current font (range min)
_DVI_FNTNUMMAX   = 234 # set current font (range max)
_DVI_FNT1234     = 235 # set current font
_DVI_SPECIAL1234 = 239 # special (dvi extention)
_DVI_FNTDEF1234  = 243 # define the meaning of a font number
_DVI_PRE         = 247 # preamble
_DVI_POST        = 248 # postamble beginning
_DVI_POSTPOST    = 249 # postamble ending

_DVI_VERSION     = 2 # dvi version

# position variable indices
_POS_H           = 0
_POS_V           = 1
_POS_W           = 2
_POS_X           = 3
_POS_Y           = 4
_POS_Z           = 5

# reader states
_READ_PRE       = 1
_READ_NOPAGE    = 2
_READ_PAGE      = 3
_READ_POST      = 4
_READ_POSTPOST  = 5
_READ_DONE      = 6


class DVIError(exceptions.Exception): pass

# save and restore colors

class _savecolor(base.PSOp):
    def write(self, file):
        file.write("currentcolor currentcolorspace\n")


class _restorecolor(base.PSOp):
    def write(self, file):
        file.write("setcolorspace setcolor\n")

class _savetrafo(base.PSOp):
    def write(self, file):
        file.write("matrix currentmatrix\n")


class _restoretrafo(base.PSOp):
    def write(self, file):
        file.write("setmatrix\n")

class DVIFile:

    def __init__(self, filename, debug=0):
        self.filename = filename
        self.debug = debug
        self.readfile()

    # helper routines 

    def flushout(self):
        """ flush currently active string """
        if self.actoutstart:
            x =  unit.t_m(self.actoutstart[0] * self.conv * 0.0254 / self.resolution)
            y = -unit.t_m(self.actoutstart[1] * self.conv * 0.0254 / self.resolution)
            if self.debug:
                print "[%s]" % self.actoutstring
            self.actpage.insert(_show(unit.topt(x), unit.topt(y), self.actoutstring))
            self.actoutstart = None

    def putchar(self, char, inch=1):
        if self.actoutstart is None:
            self.actoutstart = self.pos[_POS_H], self.pos[_POS_V]
            self.actoutstring = ""
        if char > 32 and char < 127 and chr(char) not in "()[]<>":
            ascii = "%s" % chr(char)
        else:
            ascii = "\\%03o" % char
        self.actoutstring = self.actoutstring + ascii
        dx = inch and self.fonts[self.activefont].getwidth(char) or 0
        self.fonts[self.activefont].markcharused(char)
        if self.debug:
            print ("%d: %schar%d h:=%d+%d=%d, hh:=%d" %
                   (self.filepos,
                    inch and "set" or "put",
                    char,
                    self.pos[_POS_H], dx, self.pos[_POS_H]+dx,
                    0))
        self.pos[_POS_H] += dx
        if not inch:
            # XXX: correct !?
            self.flushout()

    def putrule(self, height, width, inch=1):
        self.flushout()
        x1 =  unit.t_m(self.pos[_POS_H] * self.conv * 0.0254 / self.resolution)
        y1 = -unit.t_m(self.pos[_POS_V] * self.conv * 0.0254 / self.resolution)
        w = unit.t_m(width * self.conv * 0.0254 / self.resolution)
        h = unit.t_m(height * self.conv * 0.0254 / self.resolution)

        if height > 0 and width > 0:
            if self.debug:
                pixelw = int(width*self.conv)
                if pixelw < width*self.conv: pixelw += 1
                pixelh = int(height*self.conv)
                if pixelh < height*self.conv: pixelh += 1

                print ("%d: %srule height %d, width %d (%dx%d pixels)" %
                       (self.filepos, inch and "set" or "put", height, width, pixelh, pixelw))
            self.actpage.fill(path.rect(x1, y1, w, h))
        else:
            if self.debug:
                print ("%d: %srule height %d, width %d (invisible)" %
                       (self.filepos, inch and "set" or "put", height, width))

        if inch:
            if self.debug:
                print (" h:=%d+%d=%d, hh:=%d" %
                   (self.pos[_POS_H], width, self.pos[_POS_H]+width, 0))
            self.pos[_POS_H] += width


    def usefont(self, fontnum):
        self.flushout()
        self.activefont = fontnum

        fontpsname = self.fonts[self.activefont].getpsname()
        fontscale = self.fonts[self.activefont].scale
        fontdesignsize = float(self.fonts[self.activefont].tfmfile.designsize)
        self.actpage.insert(_selectfont(fontpsname,
                                        fontscale*fontdesignsize*72/72.27))

        if self.debug:
            print ("%d: fntnum%i current font is %s" %
                   (self.filepos,
                    self.activefont, self.fonts[fontnum].name))

    def definefont(self, cmdnr, num, c, q, d, fontname):
        # cmdnr: type of fontdef command (only used for debugging output)
        # c:     checksum
        # q:     scaling factor
        #        Note that q is actually s in large parts of the documentation.
        # d:     design size

        self.fonts[num] =  Font(fontname, c, q, d, self.tfmconv, self.debug > 1)

        if self.debug:
            print "%d: fntdef%d %i: %s" % (self.filepos, cmdnr, num, fontname)

#            scale = round((1000.0*self.conv*q)/(self.trueconv*d))
#            m = 1.0*q/d
#            scalestring = scale!=1000 and " scaled %d" % scale or ""
#            print ("Font %i: %s%s---loaded at size %d DVI units" %
#                   (num, fontname, scalestring, q))
#            if scale!=1000:
#                print " (this font is magnified %d%%)" % round(scale/10)

    def special(self, s):
        self.flushout()
        x =  unit.t_m(self.pos[_POS_H] * self.conv * 0.0254 / self.resolution)
        y = -unit.t_m(self.pos[_POS_V] * self.conv * 0.0254 / self.resolution)
        if self.debug:
            print "%d: xxx '%s'" % (self.filepos, s)
        if not s.startswith("PyX:"):
            raise RuntimeError("the special '%s' cannot be handled by PyX, aborting" % s)
        command, args = s[4:].split()[0], s[4:].split()[1:]
        if command=="color_begin":
            if args[0]=="cmyk":
                c = color.cmyk(float(args[1]), float(args[2]), float(args[3]), float(args[4]))
            elif args[0]=="gray":
                c = color.gray(float(args[1]))
            elif args[0]=="hsb":
                c = color.hsb(float(args[1]), float(args[2]), float(args[3]))
            elif args[0]=="rgb":
                c = color.rgb(float(args[1]), float(args[2]), float(args[3]))
            elif args[0]=="RGB":
                c = color.rgb(int(args[1])/255.0, int(args[2])/255.0, int(args[3])/255.0)
            elif args[0]=="texnamed":
                try:
                    c = getattr(color.cmyk, args[1])
                except AttributeError:
                    raise RuntimeError("unknown TeX color '%s', aborting" % args[1])
            else:
                raise RuntimeError("color model '%s' cannot be handled by PyX, aborting" % args[0])
            self.actpage.insert(_savecolor())
            self.actpage.insert(c)
        elif command=="color_end":
            self.actpage.insert(_restorecolor())
        elif command=="rotate_begin":
            self.actpage.insert(_savetrafo())
            self.actpage.insert(trafo.rotate(float(args[0]), x, y))
        elif command=="rotate_end":
            self.actpage.insert(_restoretrafo())
        elif command=="scale_begin":
            self.actpage.insert(_savetrafo())
            self.actpage.insert(trafo.scale(float(args[0]), float(args[1]), x, y))
        elif command=="scale_end":
            self.actpage.insert(_restoretrafo())
        elif command=="epsinclude":
            # XXX: we cannot include epsfile in the header because this would
            # generate a cyclic import with the canvas and text modules
            import epsfile

            # parse arguments
            argdict = {}
            for arg in args:
                name, value = arg.split("=")
                argdict[name] = value

            # construct kwargs for epsfile constructor
            epskwargs = {}
            epskwargs["filename"] = argdict["file"]
            epskwargs["bbox"] = bbox._bbox(float(argdict["llx"]), float(argdict["lly"]),
                                           float(argdict["urx"]), float(argdict["ury"]))
            if argdict.has_key("width"):
                epskwargs["width"] = unit.t_pt(float(argdict["width"]))
            if argdict.has_key("height"):
                epskwargs["height"] = unit.t_pt(float(argdict["height"]))
            if argdict.has_key("clip"):
               epskwargs["clip"] = int(argdict["clip"])
            self.actpage.insert(epsfile.epsfile(x, y, **epskwargs))
        else:
            raise RuntimeError("unknown PyX special '%s', aborting" % command)

    # routines corresponding to the different reader states of the dvi maschine

    def _read_pre(self):
        file = self.file
        while 1:
            self.filepos = file.tell()
            cmd = file.readuchar()
            if cmd == _DVI_NOP:
                pass
            elif cmd == _DVI_PRE:
                if self.file.readuchar() != _DVI_VERSION: raise DVIError
                num = file.readuint32()
                den = file.readuint32()
                mag = file.readuint32()

                self.tfmconv = (25400000.0/num)*(den/473628672)/16.0;
                # resolution in dpi
                self.resolution = 300.0
                # self.trueconv = conv in DVIType docu
                self.trueconv = (num/254000.0)*(self.resolution/den)
                self.conv = self.trueconv*(mag/1000.0)

                comment = file.read(file.readuchar())
                return _READ_NOPAGE
            else:
                raise DVIError

    def _read_nopage(self):
        file = self.file
        while 1:
            self.filepos = file.tell()
            cmd = file.readuchar()
            if cmd == _DVI_NOP:
                pass
            elif cmd == _DVI_BOP:
                self.flushout()
                if self.debug:
                    print "%d: beginning of page" % self.filepos,
                    print file.readuint32()
                    for i in range(9): file.readuint32()
                else:
                    for i in range(10): file.readuint32()
                file.readuint32()
                return _READ_PAGE
            elif cmd == _DVI_POST:
                return _READ_DONE # we skip the rest
            else:
                raise DVIError

    def _read_page(self):
        self.pos = [0, 0, 0, 0, 0, 0]
        self.pages.append(canvas.canvas())
        self.actpage = self.pages[-1]
        file = self.file
        while 1:
            self.filepos = file.tell()
            cmd = file.readuchar()
            if cmd == _DVI_NOP:
                pass
            if cmd >= _DVI_CHARMIN and cmd <= _DVI_CHARMAX:
                self.putchar(cmd)
            elif cmd >= _DVI_SET1234 and cmd < _DVI_SET1234 + 4:
                self.putchar(file.readint(cmd - _DVI_SET1234 + 1))
            elif cmd == _DVI_SETRULE:
                self.putrule(file.readint32(), file.readint32())
            elif cmd >= _DVI_PUT1234 and cmd < _DVI_PUT1234 + 4:
                self.putchar(file.readint(cmd - _DVI_PUT1234 + 1), inch=0)
            elif cmd == _DVI_PUTRULE:
                self.putrule(file.readint32(), file.readint32(), 0)
            elif cmd == _DVI_EOP:
                self.flushout()
                if self.debug:
                    print "%d: eop" % self.filepos
                    print
                return _READ_NOPAGE
            elif cmd == _DVI_PUSH:
                self.stack.append(tuple(self.pos))
                if self.debug:
                    print "%d: push" % self.filepos
                    print ("level %d:(h=%d,v=%d,w=%d,x=%d,y=%d,z=%d,hh=,vv=)" %
                           (( len(self.stack)-1,)+tuple(self.pos)))
            elif cmd == _DVI_POP:
                self.flushout()
                self.pos = list(self.stack[-1])
                del self.stack[-1]
                if self.debug:
                    print "%d: pop" % self.filepos
                    print ("level %d:(h=%d,v=%d,w=%d,x=%d,y=%d,z=%d,hh=,vv=)" %
                           (( len(self.stack),)+tuple(self.pos)))
            elif cmd >= _DVI_RIGHT1234 and cmd < _DVI_RIGHT1234 + 4:
                self.flushout()
                dh = file.readint(cmd - _DVI_RIGHT1234 + 1, 1)
                if self.debug:
                    print ("%d: right%d %d h:=%d%+d=%d, hh:=" %
                           (self.filepos,
                            cmd - _DVI_RIGHT1234 + 1,
                            dh,
                            self.pos[_POS_H],
                            dh,
                            self.pos[_POS_H]+dh))
                self.pos[_POS_H] += dh
            elif cmd == _DVI_W0:
                self.flushout()
                if self.debug:
                    print ("%d: w0 %d h:=%d%+d=%d, hh:=" %
                           (self.filepos,
                            self.pos[_POS_W],
                            self.pos[_POS_H],
                            self.pos[_POS_W],
                            self.pos[_POS_H]+self.pos[_POS_W]))
                self.pos[_POS_H] += self.pos[_POS_W]
            elif cmd >= _DVI_W1234 and cmd < _DVI_W1234 + 4:
                self.flushout()
                self.pos[_POS_W] = file.readint(cmd - _DVI_W1234 + 1, 1)
                if self.debug:
                    print ("%d: w%d %d h:=%d%+d=%d, hh:=" %
                           (self.filepos,
                            cmd - _DVI_W1234 + 1,
                            self.pos[_POS_W],
                            self.pos[_POS_H],
                            self.pos[_POS_W],
                            self.pos[_POS_H]+self.pos[_POS_W]))
                self.pos[_POS_H] += self.pos[_POS_W]
            elif cmd == _DVI_X0:
                self.flushout()
                self.pos[_POS_H] += self.pos[_POS_X]
            elif cmd >= _DVI_X1234 and cmd < _DVI_X1234 + 4:
                self.flushout()
                self.pos[_POS_X] = file.readint(cmd - _DVI_X1234 + 1, 1)
                self.pos[_POS_H] += self.pos[_POS_X]
            elif cmd >= _DVI_DOWN1234 and cmd < _DVI_DOWN1234 + 4:
                self.flushout()
                dv = file.readint(cmd - _DVI_DOWN1234 + 1, 1)
                if self.debug:
                    print ("%d: down%d %d v:=%d%+d=%d, vv:=" %
                           (self.filepos,
                            cmd - _DVI_DOWN1234 + 1,
                            dv,
                            self.pos[_POS_V],
                            dv,
                            self.pos[_POS_V]+dv))
                self.pos[_POS_V] += dv
            elif cmd == _DVI_Y0:
                self.flushout()
                if self.debug:
                    print ("%d: y0 %d v:=%d%+d=%d, vv:=" %
                           (self.filepos,
                            self.pos[_POS_Y],
                            self.pos[_POS_V],
                            self.pos[_POS_Y],
                            self.pos[_POS_V]+self.pos[_POS_Y]))
                self.pos[_POS_V] += self.pos[_POS_Y]
            elif cmd >= _DVI_Y1234 and cmd < _DVI_Y1234 + 4:
                self.flushout()
                self.pos[_POS_Y] = file.readint(cmd - _DVI_Y1234 + 1, 1)
                if self.debug:
                    print ("%d: y%d %d v:=%d%+d=%d, vv:=" %
                           (self.filepos,
                            cmd - _DVI_Y1234 + 1,
                            self.pos[_POS_Y],
                            self.pos[_POS_V],
                            self.pos[_POS_Y],
                            self.pos[_POS_V]+self.pos[_POS_Y]))
                self.pos[_POS_V] += self.pos[_POS_Y]
            elif cmd == _DVI_Z0:
                self.flushout()
                self.pos[_POS_V] += self.pos[_POS_Z]
            elif cmd >= _DVI_Z1234 and cmd < _DVI_Z1234 + 4:
                self.flushout()
                self.pos[_POS_Z] = file.readint(cmd - _DVI_Z1234 + 1, 1)
                self.pos[_POS_V] += self.pos[_POS_Z]
            elif cmd >= _DVI_FNTNUMMIN and cmd <= _DVI_FNTNUMMAX:
                self.usefont(cmd - _DVI_FNTNUMMIN)
            elif cmd >= _DVI_FNT1234 and cmd < _DVI_FNT1234 + 4:
                self.usefont(file.readint(cmd - _DVI_FNT1234 + 1, 1))
            elif cmd >= _DVI_SPECIAL1234 and cmd < _DVI_SPECIAL1234 + 4:
                self.special(file.read(file.readint(cmd - _DVI_SPECIAL1234 + 1)))
            elif cmd >= _DVI_FNTDEF1234 and cmd < _DVI_FNTDEF1234 + 4:
                if cmd == _DVI_FNTDEF1234:
                    num=file.readuchar()
                elif cmd == _DVI_FNTDEF1234+1:
                    num=file.readuint16()
                elif cmd == _DVI_FNTDEF1234+2:
                    num=file.readuint24()
                elif cmd == _DVI_FNTDEF1234+3:
                    # Cool, here we have according to docu a signed int. Why?
                    num = file.readint32()
                self.definefont(cmd-_DVI_FNTDEF1234+1,
                                num,
                                file.readint32(),
                                file.readint32(),
                                file.readint32(),
                                file.read(file.readuchar()+file.readuchar()))
            else: raise DVIError

    def readfile(self):
        """ reads and parses dvi file

        This routine reads the dvi file and generates a list
        of pages in self.pages. Each page consists itself of
        a list of PSCommands equivalent to the content of
        the dvi file. Furthermore, the list of used fonts
        can be extracted from the array self.fonts. 
        """

        # XXX max number of fonts
        self.fonts = [None for i in range(64)]
        self.activefont = None

        self.stack = []

        # here goes the result, for each page one list.
        self.pages = []

        # pointer to currently active page
        self.actpage = None

        # currently active output: position and content
        self.actoutstart = None
        self.actoutstring = ""

        self.file = binfile(self.filename, "rb")

        # currently read byte in file (for debugging output)
        self.filepos = None

        # start up reading process
        state = _READ_PRE
        while state!=_READ_DONE:
            if state == _READ_PRE:
                state = self._read_pre()
            elif state == _READ_NOPAGE:
                state = self._read_nopage()
            elif state == _READ_PAGE:
                state = self._read_page()
            else:
                raise DVIError # unexpected reader state, should not happen
        self.flushout()

    def prolog(self, page): # TODO: AW inserted this page argument -> should return the prolog needed for that page only!
        """ return prolog corresponding to contents of dvi file """
        # XXX replace this by prolog method in _selectfont
        result = [_ReEncodeFont]
        for font in self.fonts:
            if font:
                result.append(prolog.fontdefinition(font.getbasepsname(),
                                                    font.getfontfile(),
                                                    font.getencodingfile(),
                                                    font.usedchars))
                if font.getencoding():
                    result.append(prolog.fontencoding(font.getencoding(), font.getencodingfile()))
                    result.append(prolog.fontreencoding(font.getpsname(), font.getbasepsname(), font.getencoding()))
        result.extend(self.pages[page-1].prolog())
        return result

    def write(self, file, page):
        """write PostScript output for page into file"""
        # XXX: remove this method by return canvas to TexRunner
        if self.debug:
            print "dvifile(\"%s\").write() for page %s called" % (self.filename, page)
        self.pages[page-1].write(file)


###############################################################################
# texmessages
# - please don't get confused:
#   - there is a texmessage (and a texmessageparsed) attribute within the
#     texrunner; it contains TeX/LaTeX response from the last command execution
#   - instances of classes derived from the class texmessage are used to
#     parse the TeX/LaTeX response as it is stored in the texmessageparsed
#     attribute of a texrunner instance
#   - the multiple usage of the name texmessage might be removed in the future
# - texmessage instances should implement _Itexmessage
###############################################################################

class TexResultError(Exception):
    """specialized texrunner exception class
    - it is raised by texmessage instances, when a texmessage indicates an error
    - it is raised by the texrunner itself, whenever there is a texmessage left
      after all parsing of this message (by texmessage instances)"""

    def __init__(self, description, texrunner):
        self.description = description
        self.texrunner = texrunner

    def __str__(self):
        """prints a detailed report about the problem
        - the verbose level is controlled by texrunner.errordebug"""
        if self.texrunner.errordebug >= 2:
            return ("%s\n" % self.description +
                    "The expression passed to TeX was:\n"
                    "  %s\n" % self.texrunner.expr.replace("\n", "\n  ").rstrip() +
                    "The return message from TeX was:\n"
                    "  %s\n" % self.texrunner.texmessage.replace("\n", "\n  ").rstrip() +
                    "After parsing this message, the following was left:\n"
                    "  %s" % self.texrunner.texmessageparsed.replace("\n", "\n  ").rstrip())
        elif self.texrunner.errordebug == 1:
            firstlines = self.texrunner.texmessageparsed.split("\n")
            if len(firstlines) > 5:
                firstlines = firstlines[:5] + ["(cut after 5 lines, increase errordebug for more output)"]
            return ("%s\n" % self.description +
                    "The expression passed to TeX was:\n"
                    "  %s\n" % self.texrunner.expr.replace("\n", "\n  ").rstrip() +
                    "After parsing the return message from TeX, the following was left:\n" +
                    reduce(lambda x, y: "%s  %s\n" % (x,y), firstlines, "").rstrip())
        else:
            return self.description


class TexResultWarning(TexResultError):
    """as above, but with different handling of the exception
    - when this exception is raised by a texmessage instance,
      the information just get reported and the execution continues"""
    pass


class _Itexmessage:
    """validates/invalidates TeX/LaTeX response"""

    def check(self, texrunner):
        """check a Tex/LaTeX response and respond appropriate
        - read the texrunners texmessageparsed attribute
        - if there is an problem found, raise an appropriate
          exception (TexResultError or TexResultWarning)
        - remove any valid and identified TeX/LaTeX response
          from the texrunners texmessageparsed attribute
          -> finally, there should be nothing left in there,
             otherwise it is interpreted as an error"""


class texmessage: pass


class _texmessagestart(texmessage):
    """validates TeX/LaTeX startup"""

    __implements__ = _Itexmessage

    startpattern = re.compile(r"This is [0-9a-zA-Z\s_]*TeX")

    def check(self, texrunner):
        m = self.startpattern.search(texrunner.texmessageparsed)
        if not m:
            raise TexResultError("TeX startup failed", texrunner)
        texrunner.texmessageparsed = texrunner.texmessageparsed[m.end():]
        try:
            texrunner.texmessageparsed = texrunner.texmessageparsed.split("%s.tex" % texrunner.texfilename, 1)[1]
        except (IndexError, ValueError):
            raise TexResultError("TeX running startup file failed", texrunner)
        try:
            texrunner.texmessageparsed = texrunner.texmessageparsed.split("*! Undefined control sequence.\n<*> \\raiseerror\n               %\n", 1)[1]
        except (IndexError, ValueError):
            raise TexResultError("TeX scrollmode check failed", texrunner)


class _texmessagenoaux(texmessage):
    """allows for LaTeXs no-aux-file warning"""

    __implements__ = _Itexmessage

    def check(self, texrunner):
        try:
            s1, s2 = texrunner.texmessageparsed.split("No file %s.aux." % texrunner.texfilename, 1)
            texrunner.texmessageparsed = s1 + s2
        except (IndexError, ValueError):
            try:
                s1, s2 = texrunner.texmessageparsed.split("No file %s%s%s.aux." % (os.curdir,
                                                                                   os.sep,
                                                                                    texrunner.texfilename), 1)
                texrunner.texmessageparsed = s1 + s2
            except (IndexError, ValueError):
                pass


class _texmessageinputmarker(texmessage):
    """validates the PyXInputMarker"""

    __implements__ = _Itexmessage

    def check(self, texrunner):
        try:
            s1, s2 = texrunner.texmessageparsed.split("PyXInputMarker:executeid=%s:" % texrunner.executeid, 1)
            texrunner.texmessageparsed = s1 + s2
        except (IndexError, ValueError):
            raise TexResultError("PyXInputMarker expected", texrunner)


class _texmessagepyxbox(texmessage):
    """validates the PyXBox output"""

    __implements__ = _Itexmessage

    pattern = re.compile(r"PyXBox:page=(?P<page>\d+),lt=-?\d*((\d\.?)|(\.?\d))\d*pt,rt=-?\d*((\d\.?)|(\.?\d))\d*pt,ht=-?\d*((\d\.?)|(\.?\d))\d*pt,dp=-?\d*((\d\.?)|(\.?\d))\d*pt:")

    def check(self, texrunner):
        m = self.pattern.search(texrunner.texmessageparsed)
        if m and m.group("page") == str(texrunner.page):
            texrunner.texmessageparsed = texrunner.texmessageparsed[:m.start()] + texrunner.texmessageparsed[m.end():]
        else:
            raise TexResultError("PyXBox expected", texrunner)


class _texmessagepyxpageout(texmessage):
    """validates the dvi shipout message (writing a page to the dvi file)"""

    __implements__ = _Itexmessage

    def check(self, texrunner):
        try:
            s1, s2 = texrunner.texmessageparsed.split("[80.121.88.%s]" % texrunner.page, 1)
            texrunner.texmessageparsed = s1 + s2
        except (IndexError, ValueError):
            raise TexResultError("PyXPageOutMarker expected", texrunner)


class _texmessagetexend(texmessage):
    """validates TeX/LaTeX finish"""

    __implements__ = _Itexmessage

    def check(self, texrunner):
        try:
            s1, s2 = texrunner.texmessageparsed.split("(%s.aux)" % texrunner.texfilename, 1)
            texrunner.texmessageparsed = s1 + s2
        except (IndexError, ValueError):
            try:
                s1, s2 = texrunner.texmessageparsed.split("(%s%s%s.aux)" % (os.curdir,
                                                                        os.sep,
                                                                        texrunner.texfilename), 1)
                texrunner.texmessageparsed = s1 + s2
            except (IndexError, ValueError):
                pass
        try:
            s1, s2 = texrunner.texmessageparsed.split("(see the transcript file for additional information)", 1)
            texrunner.texmessageparsed = s1 + s2
        except (IndexError, ValueError):
            pass
        dvipattern = re.compile(r"Output written on %s\.dvi \((?P<page>\d+) pages?, \d+ bytes\)\." % texrunner.texfilename)
        m = dvipattern.search(texrunner.texmessageparsed)
        if texrunner.page:
            if not m:
                raise TexResultError("TeX dvifile messages expected", texrunner)
            if m.group("page") != str(texrunner.page):
                raise TexResultError("wrong number of pages reported", texrunner)
            texrunner.texmessageparsed = texrunner.texmessageparsed[:m.start()] + texrunner.texmessageparsed[m.end():]
        else:
            try:
                s1, s2 = texrunner.texmessageparsed.split("No pages of output.", 1)
                texrunner.texmessageparsed = s1 + s2
            except (IndexError, ValueError):
                raise TexResultError("no dvifile expected")
        try:
            s1, s2 = texrunner.texmessageparsed.split("Transcript written on %s.log." % texrunner.texfilename, 1)
            texrunner.texmessageparsed = s1 + s2
        except (IndexError, ValueError):
            raise TexResultError("TeX logfile message expected")


class _texmessageemptylines(texmessage):
    """validates empty and "*-only" (TeX/LaTeX input marker in interactive mode) lines"""

    __implements__ = _Itexmessage

    pattern = re.compile(r"^\*?\n", re.M)

    def check(self, texrunner):
        m = self.pattern.search(texrunner.texmessageparsed)
        while m:
            texrunner.texmessageparsed = texrunner.texmessageparsed[:m.start()] + texrunner.texmessageparsed[m.end():]
            m = self.pattern.search(texrunner.texmessageparsed)


class _texmessageload(texmessage):
    """validates inclusion of arbitrary files
    - the matched pattern is "(<filename> <arbitrary other stuff>)", where
      <fielname> is a readable file and other stuff can be anything
    - "(" and ")" must be used consistent (otherwise this validator just does nothing)
    - this is not always wanted, but we just assume that file inclusion is fine"""

    __implements__ = _Itexmessage

    pattern = re.compile(r"\((?P<filename>[^()\s\n]+)[^()]*\)")

    def baselevels(self, s, maxlevel=1, brackets="()"):
        """strip parts of a string above a given bracket level
        - return a modified (some parts might be removed) version of the string s
          where all parts inside brackets with level higher than maxlevel are
          removed
        - if brackets do not match (number of left and right brackets is wrong
          or at some points there were more right brackets than left brackets)
          just return the unmodified string"""
        level = 0
        highestlevel = 0
        res = ""
        for c in s:
            if c == brackets[0]:
                level += 1
                if level > highestlevel:
                    highestlevel = level
            if level <= maxlevel:
                res += c
            if c == brackets[1]:
                level -= 1
        if level == 0 and highestlevel > 0:
            return res

    def check(self, texrunner):
        lowestbracketlevel = self.baselevels(texrunner.texmessageparsed)
        if lowestbracketlevel is not None:
            m = self.pattern.search(lowestbracketlevel)
            while m:
                if os.access(m.group("filename"), os.R_OK):
                    lowestbracketlevel = lowestbracketlevel[:m.start()] + lowestbracketlevel[m.end():]
                else:
                    break
                m = self.pattern.search(lowestbracketlevel)
            else:
                texrunner.texmessageparsed = lowestbracketlevel


class _texmessageloadfd(_texmessageload):
    """validates the inclusion of font description files (fd-files)
    - works like _texmessageload
    - filename must end with .fd and no further text is allowed"""

    pattern = re.compile(r"\((?P<filename>[^)]+.fd)\)")


class _texmessagegraphicsload(_texmessageload):
    """validates the inclusion of files as the graphics packages writes it
    - works like _texmessageload, but using "<" and ">" as delimiters
    - filename must end with .eps and no further text is allowed"""

    pattern = re.compile(r"<(?P<filename>[^>]+.eps)>")

    def baselevels(self, s, brackets="<>", **args):
        return _texmessageload.baselevels(self, s, brackets=brackets, **args)


#class _texmessagepdfmapload(_texmessageload):
#    """validates the inclusion of files as the graphics packages writes it
#    - works like _texmessageload, but using "{" and "}" as delimiters
#    - filename must end with .map and no further text is allowed"""
#
#    pattern = re.compile(r"{(?P<filename>[^}]+.map)}")
#
#    def baselevels(self, s, brackets="{}", **args):
#        return _texmessageload.baselevels(self, s, brackets=brackets, **args)


class _texmessageignore(_texmessageload):
    """validates any TeX/LaTeX response
    - this might be used, when the expression is ok, but no suitable texmessage
      parser is available
    - PLEASE: - consider writing suitable tex message parsers
              - share your ideas/problems/solutions with others (use the PyX mailing lists)"""

    __implements__ = _Itexmessage

    def check(self, texrunner):
        texrunner.texmessageparsed = ""


texmessage.start = _texmessagestart()
texmessage.noaux = _texmessagenoaux()
texmessage.inputmarker = _texmessageinputmarker()
texmessage.pyxbox = _texmessagepyxbox()
texmessage.pyxpageout = _texmessagepyxpageout()
texmessage.texend = _texmessagetexend()
texmessage.emptylines = _texmessageemptylines()
texmessage.load = _texmessageload()
texmessage.loadfd = _texmessageloadfd()
texmessage.graphicsload = _texmessagegraphicsload()
texmessage.ignore = _texmessageignore()


###############################################################################
# texsettings
# - texsettings are used to modify a TeX/LaTeX expression
#   to fit the users need
# - texsettings have an order attribute (id), because the order is usually
#   important (e.g. you can not change the fontsize in mathmode in LaTeX)
# - lower id's get applied later (are more outside -> mathmode has a higher
#   id than fontsize)
# - order attributes are used to exclude complementary settings (with the
#   same id)
# - texsettings might (in rare cases) depend on each other (e.g. parbox and
#   valign)
###############################################################################

class _Itexsetting:
    """tex setting
    - modifies a TeX/LaTeX expression"""

    id = 0
    """order attribute for TeX settings
    - higher id's will be applied first (most inside)"""

    exclusive = 0
    """marks exclusive effect of the setting
    - when set, settings with this id exclude each other
    - when unset, settings with this id do not exclude each other"""

    def modifyexpr(self, expr, texsettings, texrunner):
        """modifies the TeX/LaTeX expression
        - expr is the original expression
        - the return value is the modified expression
        - texsettings contains a list of all texsettings (in case a tex setting
          depends on another texsetting)
        - texrunner contains the texrunner in case the texsetting depends
          on it"""

    def __cmp__(self, other):
        """compare texsetting with other
        - other is a texsetting as well
        - performs an id comparison (NOTE: higher id's come first!!!)"""


# preamble settings for texsetting macros
_texsettingpreamble = ""

class _texsetting:

    exclusive = 1

    def __cmp__(self, other):
        return -cmp(self.id, other.id) # note the sign!!!


class halign(_texsetting):
    """horizontal alignment
    the left/right splitting is performed within the PyXBox routine"""

    __implements__ = _Itexsetting

    id = 1000

    def __init__(self, hratio):
        self.hratio = hratio

    def modifyexpr(self, expr, texsettings, texrunner):
        return r"\gdef\PyXHAlign{%.5f}%s" % (self.hratio, expr)

halign.left = halign(0)
halign.center = halign(0.5)
halign.right = halign(1)


_texsettingpreamble += "\\newbox\\PyXBoxVAlign%\n\\newdimen\PyXDimenVAlign%\n"

class valign(_texsetting):
    "vertical alignment"

    id = 7000


class _valigntop(valign):

    __implements__ = _Itexsetting

    def modifyexpr(self, expr, texsettings, texrunner):
        return r"\setbox\PyXBoxVAlign=\hbox{{%s}}\lower\ht\PyXBoxVAlign\box\PyXBoxVAlign" % expr


class _valignmiddle(valign):

    __implements__ = _Itexsetting

    def modifyexpr(self, expr, texsettings, texrunner):
        return r"\setbox\PyXBoxVAlign=\hbox{{%s}}\PyXDimenVAlign=0.5\ht\PyXBoxVAlign\advance\PyXDimenVAlign by -0.5\dp\PyXBoxVAlign\lower\PyXDimenVAlign\box\PyXBoxVAlign" % expr


class _valignbottom(valign):

    __implements__ = _Itexsetting

    def modifyexpr(self, expr, texsettings, texrunner):
        return r"\setbox\PyXBoxVAlign=\hbox{{%s}}\raise\dp\PyXBoxVAlign\box\PyXBoxVAlign" % expr


class _valignbaseline(valign):

    __implements__ = _Itexsetting

    def modifyexpr(self, expr, texsettings, texrunner):
        for texsetting in texsettings:
            if isinstance(texsetting, parbox):
                raise RuntimeError("valign.baseline: specify top/middle/bottom baseline for parbox")
        return expr


class _valignxxxbaseline(valign):

    def modifyexpr(self, expr, texsettings, texrunner):
        for texsetting in texsettings:
            if isinstance(texsetting, parbox):
                break
        else:
            raise RuntimeError(self.noparboxmessage)
        return expr


class _valigntopbaseline(_valignxxxbaseline):

    __implements__ = _Itexsetting

    noparboxmessage = "valign.topbaseline: no parbox defined"


class _valignmiddlebaseline(_valignxxxbaseline):

    __implements__ = _Itexsetting

    noparboxmessage = "valign.middlebaseline: no parbox defined"


class _valignbottombaseline(_valignxxxbaseline):

    __implements__ = _Itexsetting

    noparboxmessage = "valign.bottombaseline: no parbox defined"


valign.top = _valigntop()
valign.middle = _valignmiddle()
valign.center = valign.middle
valign.bottom = _valignbottom()
valign.baseline = _valignbaseline()
valign.topbaseline = _valigntopbaseline()
valign.middlebaseline = _valignmiddlebaseline()
valign.centerbaseline = valign.middlebaseline
valign.bottombaseline = _valignbottombaseline()


_texsettingpreamble += "\\newbox\\PyXBoxVBox%\n\\newdimen\PyXDimenVBox%\n"


class _parbox(_texsetting):
    "goes into the vertical mode"

    __implements__ = _Itexsetting

    id = 7100

    def __init__(self, width):
        self.width = width

    def modifyexpr(self, expr, texsettings, texrunner):
        boxkind = "vtop"
        for texsetting in texsettings:
            if isinstance(texsetting, valign):
                if (not isinstance(texsetting, _valigntop) and
                    not isinstance(texsetting, _valignmiddle) and
                    not isinstance(texsetting, _valignbottom) and
                    not isinstance(texsetting, _valigntopbaseline)):
                    if isinstance(texsetting, _valignmiddlebaseline):
                        boxkind = "vcenter"
                    elif isinstance(texsetting, _valignbottombaseline):
                        boxkind = "vbox"
                    else:
                        raise RuntimeError("parbox couldn'd identify the valign instance")
        if boxkind == "vcenter":
            return r"\linewidth%.5ftruept\setbox\PyXBoxVBox=\hbox{{\vtop{\hsize\linewidth{%s}}}}\PyXDimenVBox=0.5\dp\PyXBoxVBox\setbox\PyXBoxVBox=\hbox{{\vbox{\hsize\linewidth{%s}}}}\advance\PyXDimenVBox by -0.5\dp\PyXBoxVBox\lower\PyXDimenVBox\box\PyXBoxVBox" % (self.width, expr, expr)
        else:
            return r"\linewidth%.5ftruept\%s{\hsize\linewidth{%s}}" % (self.width * 72.27 / 72, boxkind, expr)


class parbox(_parbox):

    def __init__(self, width):
        _parbox.__init__(self, unit.topt(width))


class vshift(_texsetting):

    exclusive = 0

    id = 5000


class _vshiftchar(vshift):
    "vertical down shift by a fraction of a character height"

    def __init__(self, lowerratio, heightstr="0"):
        self.lowerratio = lowerratio
        self.heightstr = heightstr

    def modifyexpr(self, expr, texsettings, texrunner):
        return r"\setbox0\hbox{{%s}}\lower%.5f\ht0\hbox{{%s}}" % (self.heightstr, self.lowerratio, expr)


class _vshiftmathaxis(vshift):
    "vertical down shift by the height of the math axis"

    def modifyexpr(self, expr, texsettings, texrunner):
        return r"\setbox0\hbox{$\vcenter{\vrule width0pt}$}\lower\ht0\hbox{{%s}}" % expr


vshift.char = _vshiftchar
vshift.bottomzero = vshift.char(0)
vshift.middlezero = vshift.char(0.5)
vshift.centerzero = vshift.middlezero
vshift.topzero = vshift.char(1)
vshift.mathaxis = _vshiftmathaxis()


class _mathmode(_texsetting):
    "math mode"

    __implements__ = _Itexsetting

    id = 9000

    def modifyexpr(self, expr, texsettings, texrunner):
        return r"$\displaystyle{%s}$" % expr

mathmode = _mathmode()


defaultsizelist = ["normalsize", "large", "Large", "LARGE", "huge", "Huge", None, "tiny", "scriptsize", "footnotesize", "small"]

class size(_texsetting):
    "font size"

    __implements__ = _Itexsetting

    id = 3000

    def __init__(self, expr, sizelist=defaultsizelist):
        if helper.isinteger(expr):
            if expr >= 0 and expr < sizelist.index(None):
                self.size = sizelist[expr]
            elif expr < 0 and expr + len(sizelist) > sizelist.index(None):
                self.size = sizelist[expr]
            else:
                raise IndexError("index out of sizelist range")
        else:
            self.size = expr

    def modifyexpr(self, expr, texsettings, texrunner):
        return r"\%s{%s}" % (self.size, expr)

for s in defaultsizelist:
    if s is not None:
        size.__dict__[s] = size(s)


###############################################################################
# texrunner
###############################################################################


class _readpipe(threading.Thread):
    """threaded reader of TeX/LaTeX output
    - sets an event, when a specific string in the programs output is found
    - sets an event, when the terminal ends"""

    def __init__(self, pipe, expectqueue, gotevent, gotqueue, quitevent):
        """initialize the reader
        - pipe: file to be read from
        - expectqueue: keeps the next InputMarker to be wait for
        - gotevent: the "got InputMarker" event
        - gotqueue: a queue containing the lines recieved from TeX/LaTeX
        - quitevent: the "end of terminal" event"""
        threading.Thread.__init__(self)
        self.setDaemon(1) # don't care if the output might not be finished (nevertheless, it shouldn't happen)
        self.pipe = pipe
        self.expectqueue = expectqueue
        self.gotevent = gotevent
        self.gotqueue = gotqueue
        self.quitevent = quitevent
        self.expect = None
        self.start()

    def run(self):
        """thread routine"""
        read = self.pipe.readline() # read, what comes in
        try:
            self.expect = self.expectqueue.get_nowait() # read, what should be expected
        except Queue.Empty:
            pass
        while len(read):
            # universal EOL handling (convert everything into unix like EOLs)
            read.replace("\r", "")
            if not len(read) or read[-1] != "\n":
                read += "\n"
            self.gotqueue.put(read) # report, whats readed
            if self.expect is not None and read.find(self.expect) != -1:
                self.gotevent.set() # raise the got event, when the output was expected (XXX: within a single line)
            read = self.pipe.readline() # read again
            try:
                self.expect = self.expectqueue.get_nowait()
            except Queue.Empty:
                pass
        # EOF reached
        self.pipe.close()
        if self.expect is not None and self.expect.find("PyXInputMarker") != -1:
            raise RuntimeError("TeX/LaTeX finished unexpectedly")
        self.quitevent.set()



class _textbox(box._rect, base.PSCmd):
    """basically a box.rect, but it contains a text created by the texrunner
    - texrunner._text and texrunner.text return such an object
    - _textbox instances can be inserted into a canvas
    - the output is contained in a page of the dvifile available thru the texrunner"""

    def __init__(self, x, y, left, right, height, depth, texrunner, dvinumber, page, *styles):
        self.texttrafo = trafo._translate(x, y)
        box._rect.__init__(self, x - left, y - depth,
                                 left + right, depth + height,
                                 abscenter = (left, depth))
        self.texrunner = texrunner
        self.dvinumber = dvinumber
        self.page = page
        self.styles = styles

    def transform(self, *trafos):
        box._rect.transform(self, *trafos)
        for trafo in trafos:
            self.texttrafo = trafo * self.texttrafo

    def prolog(self):
        result = []
        for cmd in self.styles:
            result.extend(cmd.prolog())
        return result + self.texrunner.prolog(self.dvinumber, self.page)

    def write(self, file):
        canvas._gsave().write(file) # XXX: canvas?, constructor call needed?
        self.texttrafo.write(file)
        for style in self.styles:
            style.write(file)
        self.texrunner.write(file, self.dvinumber, self.page)
        canvas._grestore().write(file)



class textbox(_textbox):

    def __init__(self, x, y, left, right, height, depth, texrunner, dvinumber, page, *styles):
        _textbox.__init__(self, unit.topt(x), unit.topt(y), unit.topt(left), unit.topt(right),
                          unit.topt(height), unit.topt(depth), texrunner, dvinumber, page, *styles)


def _cleantmp(texrunner):
    """get rid of temporary files
    - function to be registered by atexit
    - files contained in usefiles are kept"""
    if texrunner.texruns: # cleanup while TeX is still running?
        texrunner.texruns = 0
        texrunner.texdone = 1
        texrunner.expectqueue.put_nowait(None)     # do not expect any output anymore
        texrunner.texinput.close()                 # close the input queue and
        texrunner.quitevent.wait(texrunner.waitfortex)  # wait for finish of the output
        if not texrunner.quitevent.isSet(): return # didn't got a quit from TeX -> we can't do much more
    for usefile in texrunner.usefiles:
        extpos = usefile.rfind(".")
        try:
            os.rename(texrunner.texfilename + usefile[extpos:], usefile)
        except OSError:
            pass
    for file in glob.glob("%s.*" % texrunner.texfilename):
        try:
            os.unlink(file)
        except OSError:
            pass


# texrunner state exceptions
class TexRunsError(Exception): pass
class TexDoneError(Exception): pass
class TexNotInPreambleModeError(Exception): pass


class texrunner:
    """TeX/LaTeX interface
    - runs TeX/LaTeX expressions instantly
    - checks TeX/LaTeX response
    - the instance variable texmessage stores the last TeX
      response as a string
    - the instance variable texmessageparsed stores a parsed
      version of texmessage; it should be empty after
      texmessage.check was called, otherwise a TexResultError
      is raised
    - the instance variable errordebug controls the verbose
      level of TexResultError"""

    def __init__(self, mode="tex",
                       lfs="10pt",
                       docclass="article",
                       docopt=None,
                       usefiles=None,
                       waitfortex=5,
                       texdebug=None,
                       dvidebug=0,
                       errordebug=1,
                       dvicopy=0,
                       pyxgraphics=1,
                       texmessagestart=texmessage.start,
                       texmessagedocclass=texmessage.load,
                       texmessagebegindoc=(texmessage.load, texmessage.noaux),
                       texmessageend=texmessage.texend,
                       texmessagedefaultpreamble=texmessage.load,
                       texmessagedefaultrun=texmessage.loadfd):
        mode = mode.lower()
        if mode != "tex" and mode != "latex":
            raise ValueError("mode \"TeX\" or \"LaTeX\" expected")
        self.mode = mode
        self.lfs = lfs
        self.docclass = docclass
        self.docopt = docopt
        self.usefiles = helper.ensurelist(usefiles)
        self.waitfortex = waitfortex
        if texdebug is not None:
            if texdebug[-4:] == ".tex":
                self.texdebug = open(texdebug, "w")
            else:
                self.texdebug = open("%s.tex" % texdebug, "w")
        else:
            self.texdebug = None
        self.dvidebug = dvidebug
        self.errordebug = errordebug
        self.dvicopy = dvicopy
        self.pyxgraphics = pyxgraphics
        texmessagestart = helper.ensuresequence(texmessagestart)
        helper.checkattr(texmessagestart, allowmulti=(texmessage,))
        self.texmessagestart = texmessagestart
        texmessagedocclass = helper.ensuresequence(texmessagedocclass)
        helper.checkattr(texmessagedocclass, allowmulti=(texmessage,))
        self.texmessagedocclass = texmessagedocclass
        texmessagebegindoc = helper.ensuresequence(texmessagebegindoc)
        helper.checkattr(texmessagebegindoc, allowmulti=(texmessage,))
        self.texmessagebegindoc = texmessagebegindoc
        texmessageend = helper.ensuresequence(texmessageend)
        helper.checkattr(texmessageend, allowmulti=(texmessage,))
        self.texmessageend = texmessageend
        texmessagedefaultpreamble = helper.ensuresequence(texmessagedefaultpreamble)
        helper.checkattr(texmessagedefaultpreamble, allowmulti=(texmessage,))
        self.texmessagedefaultpreamble = texmessagedefaultpreamble
        texmessagedefaultrun = helper.ensuresequence(texmessagedefaultrun)
        helper.checkattr(texmessagedefaultrun, allowmulti=(texmessage,))
        self.texmessagedefaultrun = texmessagedefaultrun

        self.texruns = 0
        self.texdone = 0
        self.preamblemode = 1
        self.executeid = 0
        self.page = 0
        self.dvinumber = 0
        self.dvifiles = []
        self.preambles = []
        savetempdir = tempfile.tempdir
        tempfile.tempdir = os.curdir
        self.texfilename = os.path.basename(tempfile.mktemp())
        tempfile.tempdir = savetempdir

    def execute(self, expr, *checks):
        """executes expr within TeX/LaTeX
        - if self.texruns is not yet set, TeX/LaTeX is initialized,
          self.texruns is set and self.preamblemode is set
        - the method must not be called, when self.texdone is already set
        - expr should be a string or None
        - when expr is None, TeX/LaTeX is stopped, self.texruns is unset and
          while self.texdone becomes set
        - when self.preamblemode is set, the expr is passed directly to TeX/LaTeX
        - when self.preamblemode is unset, the expr is passed to \ProcessPyXBox
        """
        if not self.texruns:
            if self.texdebug is not None:
                self.texdebug.write("%% PyX %s texdebug file\n" % version.version)
                self.texdebug.write("%% mode: %s\n" % self.mode)
                self.texdebug.write("%% date: %s\n" % time.asctime(time.localtime(time.time())))
            for usefile in self.usefiles:
                extpos = usefile.rfind(".")
                try:
                    os.rename(usefile, self.texfilename + usefile[extpos:])
                except OSError:
                    pass
            texfile = open("%s.tex" % self.texfilename, "w") # start with filename -> creates dvi file with that name
            texfile.write("\\relax\n")
            texfile.close()
            try:
                self.texinput, self.texoutput = os.popen4("%s %s" % (self.mode, self.texfilename), "t", 0)
            except ValueError:
                # XXX: workaround for MS Windows (bufsize = 0 makes trouble!?)
                self.texinput, self.texoutput = os.popen4("%s %s" % (self.mode, self.texfilename), "t")
            atexit.register(_cleantmp, self)
            self.expectqueue = Queue.Queue(1)  # allow for a single entry only -> keeps the next InputMarker to be wait for
            self.gotevent = threading.Event()  # keeps the got inputmarker event
            self.gotqueue = Queue.Queue(0)     # allow arbitrary number of entries
            self.quitevent = threading.Event() # keeps for end of terminal event
            self.readoutput = _readpipe(self.texoutput, self.expectqueue, self.gotevent, self.gotqueue, self.quitevent)
            self.texruns = 1
            oldpreamblemode = self.preamblemode
            self.preamblemode = 1
            self.execute("\\scrollmode\n\\raiseerror%\n" # switch to and check scrollmode
                         "\\def\\PyX{P\\kern-.3em\\lower.5ex\hbox{Y}\kern-.18em X}%\n" # just the PyX Logo
                         "\\gdef\\PyXHAlign{0}%\n" # global PyXHAlign (0.0-1.0) for the horizontal alignment, default to 0
                         "\\newbox\\PyXBox%\n" # PyXBox will contain the output
                         "\\newbox\\PyXBoxHAligned%\n" # PyXBox will contain the horizontal aligned output
                         "\\newdimen\\PyXDimenHAlignLT%\n" # PyXDimenHAlignLT/RT will contain the left/right extent
                         "\\newdimen\\PyXDimenHAlignRT%\n" +
                         _texsettingpreamble + # insert preambles for texsetting macros
                         "\\long\\def\\ProcessPyXBox#1#2{%\n" # the ProcessPyXBox definition (#1 is expr, #2 is page number)
                         "\\setbox\\PyXBox=\\hbox{{#1}}%\n" # push expression into PyXBox
                         "\\PyXDimenHAlignLT=\\PyXHAlign\\wd\\PyXBox%\n" # calculate the left/right extent
                         "\\PyXDimenHAlignRT=\\wd\\PyXBox%\n"
                         "\\advance\\PyXDimenHAlignRT by -\\PyXDimenHAlignLT%\n"
                         "\\gdef\\PyXHAlign{0}%\n" # reset the PyXHAlign to the default 0
                         "\\immediate\\write16{PyXBox:page=#2," # write page and extents of this box to stdout
                                                     "lt=\\the\\PyXDimenHAlignLT,"
                                                     "rt=\\the\\PyXDimenHAlignRT,"
                                                     "ht=\\the\\ht\\PyXBox,"
                                                     "dp=\\the\\dp\\PyXBox:}%\n"
                         "\\setbox\\PyXBoxHAligned=\\hbox{\\kern-\\PyXDimenHAlignLT\\box\\PyXBox}%\n" # align horizontally
                         "\\ht\\PyXBoxHAligned0pt%\n" # baseline alignment (hight to zero)
                         "{\\count0=80\\count1=121\\count2=88\\count3=#2\\shipout\\box\\PyXBoxHAligned}}%\n" # shipout PyXBox to Page 80.121.88.<page number>
                         "\\def\\PyXInput#1{\\immediate\\write16{PyXInputMarker:executeid=#1:}}", # write PyXInputMarker to stdout
                         *self.texmessagestart)
            os.remove("%s.tex" % self.texfilename)
            if self.mode == "tex":
                if len(self.lfs) > 4 and self.lfs[-4:] == ".lfs":
                    lfsname = self.lfs
                else:
                    lfsname = "%s.lfs" % self.lfs
                for fulllfsname in [lfsname,
                                    os.path.join(sys.prefix, "share", "pyx", lfsname),
                                    os.path.join(os.path.dirname(__file__), "lfs", lfsname)]:
                    try:
                        lfsdef = open(fulllfsname, "r").read()
                        break
                    except IOError:
                        pass
                else:
                    allfiles = (glob.glob("*.lfs") +
                                glob.glob(os.path.join(sys.prefix, "share", "pyx", "*.lfs")) +
                                glob.glob(os.path.join(os.path.dirname(__file__), "lfs", "*.lfs")))
                    lfsnames = [os.path.basename(x)[:-4] for x in allfiles]
                    lfsnames.sort()
                    raise IOError("file '%s' not found. Available latex font sizes: %s" % (lfsname, lfsnames))
                self.execute(lfsdef)
                self.execute("\\normalsize%\n")
                self.execute("\\newdimen\\linewidth%\n")
            elif self.mode == "latex":
                if self.pyxgraphics:
                    for pyxdef in ["pyx.def",
                                   os.path.join(sys.prefix, "share", "pyx", "pyx.def"),
                                   os.path.join(os.path.dirname(__file__), "..", "contrib", "pyx.def")]:
                        if os.path.isfile(pyxdef):
                            break
                    else:
                        IOError("could not find 'pyx.def'")
                    pyxdef = os.path.abspath(pyxdef).replace(os.sep, "/")
                    self.execute("\\makeatletter%\n"
                                 "\\let\\saveProcessOptions=\\ProcessOptions%\n"
                                 "\\def\\ProcessOptions{%\n"
                                 "\\def\\Gin@driver{" + pyxdef + "}%\n"
                                 "\\def\\c@lor@namefile{dvipsnam.def}%\n"
                                 "\\saveProcessOptions}%\n"
                                 "\\makeatother")
                if self.docopt is not None:
                    self.execute("\\documentclass[%s]{%s}" % (self.docopt, self.docclass), *self.texmessagedocclass)
                else:
                    self.execute("\\documentclass{%s}" % self.docclass, *self.texmessagedocclass)
            self.preamblemode = oldpreamblemode
        self.executeid += 1
        if expr is not None: # TeX/LaTeX should process expr
            self.expectqueue.put_nowait("PyXInputMarker:executeid=%i:" % self.executeid)
            if self.preamblemode:
                self.expr = ("%s%%\n" % expr +
                             "\\PyXInput{%i}%%\n" % self.executeid)
            else:
                self.page += 1
                self.expr = ("\\ProcessPyXBox{%s%%\n}{%i}%%\n" % (expr, self.page) +
                             "\\PyXInput{%i}%%\n" % self.executeid)
        else: # TeX/LaTeX should be finished
            self.expectqueue.put_nowait("Transcript written on %s.log" % self.texfilename)
            if self.mode == "latex":
                self.expr = "\\end{document}\n"
            else:
                self.expr = "\\end\n"
        if self.texdebug is not None:
            self.texdebug.write(self.expr)
        self.texinput.write(self.expr)
        self.gotevent.wait(self.waitfortex) # wait for the expected output
        gotevent = self.gotevent.isSet()
        self.gotevent.clear()
        if expr is None and gotevent:        # TeX/LaTeX should have finished
            self.texruns = 0
            self.texdone = 1
            self.texinput.close()                # close the input queue and
            self.quitevent.wait(self.waitfortex) # wait for finish of the output
            gotevent = self.quitevent.isSet()
        try:
            self.texmessage = ""
            while 1:
                self.texmessage += self.gotqueue.get_nowait()
        except Queue.Empty:
            pass
        self.texmessageparsed = self.texmessage
        if gotevent:
            if expr is not None:
                texmessage.inputmarker.check(self)
                if not self.preamblemode:
                    texmessage.pyxbox.check(self)
                    texmessage.pyxpageout.check(self)
            for check in checks:
                try:
                    check.check(self)
                except TexResultWarning:
                    traceback.print_exc()
            texmessage.emptylines.check(self)
            if len(self.texmessageparsed):
                raise TexResultError("unhandled TeX response (might be an error)", self)
        else:
            raise TexResultError("TeX didn't respond as expected within the timeout period (%i seconds)." % self.waitfortex, self)

    def getdvi(self):
        "finish TeX/LaTeX and read the dvifile"
        self.execute(None, *self.texmessageend)
        if self.dvicopy:
            os.system("dvicopy %s.dvi %s.dvicopy" % (self.texfilename, self.texfilename))
            dvifilename = "%s.dvicopy" % self.texfilename
        else:
            dvifilename = "%s.dvi" % self.texfilename
        self.dvifiles.append(DVIFile(dvifilename, debug=self.dvidebug))
        self.dvinumber += 1

    def prolog(self, dvinumber, page):
        "return the dvifile prolog"
        if not self.texdone:
            self.getdvi()
        return self.dvifiles[dvinumber].prolog(page)

    def write(self, file, dvinumber, page):
        "write a page from the dvifile"
        if not self.texdone:
            self.getdvi()
        return self.dvifiles[dvinumber].write(file, page)

    def reset(self, reinit=0):
        "resets the tex runner to its initial state (upto its record to old dvi file(s))"
        if self.texruns:
            if not self.texdone:
                self.getdvi()
        self.preamblemode = 1
        self.executeid = 0
        self.page = 0
        self.texdone = 0
        if reinit:
            for expr, args in self.preambles:
                self.execute(expr, *args)
        else:
            self.preambles = []

    def set(self, mode=None,
                  lfs=None,
                  docclass=None,
                  docopt=None,
                  usefiles=None,
                  waitfortex=None,
                  texdebug=None,
                  dvidebug=0,
                  errordebug=None,
                  dvicopy=None,
                  pyxgraphics=None,
                  texmessagestart=None,
                  texmessagedocclass=None,
                  texmessagebegindoc=None,
                  texmessageend=None,
                  texmessagedefaultpreamble=None,
                  texmessagedefaultrun=None):
        """provide a set command for TeX/LaTeX settings
        - TeX/LaTeX must not yet been started
        - especially needed for the defaultrunner, where no access to
          the constructor is available"""
        if self.texruns:
            raise TexRunsError
        if mode is not None:
            mode = mode.lower()
            if mode != "tex" and mode != "latex":
                raise ValueError("mode \"TeX\" or \"LaTeX\" expected")
            self.mode = mode
        if lfs is not None:
            self.lfs = lfs
        if docclass is not None:
            self.docclass = docclass
        if docopt is not None:
            self.docopt = docopt
        if self.usefiles is not None:
            self.usefiles = helper.ensurelist(usefiles)
        if waitfortex is not None:
            self.waitfortex = waitfortex
        if texdebug is not None:
            if texdebug[-4:] == ".tex":
                self.texdebug = open(texdebug, "w")
            else:
                self.texdebug = open("%s.tex" % texdebug, "w")
        if dvidebug is not None:
            self.dvidebug = dvidebug
        if errordebug is not None:
            self.errordebug = errordebug
        if dvicopy is not None:
            self.dvicopy = dvicopy
        if pyxgraphics is not None:
            self.pyxgraphics = pyxgraphics
        if errordebug is not None:
            self.errordebug = errordebug
        if texmessagestart is not None:
            texmessagestart = helper.ensuresequence(texmessagestart)
            helper.checkattr(texmessagestart, allowmulti=(texmessage,))
            self.texmessagestart = texmessagestart
        if texmessagedocclass is not None:
            texmessagedocclass = helper.ensuresequence(texmessagedocclass)
            helper.checkattr(texmessagedocclass, allowmulti=(texmessage,))
            self.texmessagedocclass = texmessagedocclass
        if texmessagebegindoc is not None:
            texmessagebegindoc = helper.ensuresequence(texmessagebegindoc)
            helper.checkattr(texmessagebegindoc, allowmulti=(texmessage,))
            self.texmessagebegindoc = texmessagebegindoc
        if texmessageend is not None:
            texmessageend = helper.ensuresequence(texmessageend)
            helper.checkattr(texmessageend, allowmulti=(texmessage,))
            self.texmessageend = texmessageend
        if texmessagedefaultpreamble is not None:
            texmessagedefaultpreamble = helper.ensuresequence(texmessagedefaultpreamble)
            helper.checkattr(texmessagedefaultpreamble, allowmulti=(texmessage,))
            self.texmessagedefaultpreamble = texmessagedefaultpreamble
        if texmessagedefaultrun is not None:
            texmessagedefaultrun = helper.ensuresequence(texmessagedefaultrun)
            helper.checkattr(texmessagedefaultrun, allowmulti=(texmessage,))
            self.texmessagedefaultrun = texmessagedefaultrun

    def bracketcheck(self, expr):
        """a helper method to check the usage of "{" and "}"
        - Michael Schindler claims that this is not necessary"""
        pass

#    def bracketcheck(self, expr):
#        """a helper method for consistant usage of "{" and "}"
#        - prevent to pass unbalanced expressions to TeX
#        - raises an appropriate ValueError"""
#        depth = 0
#        esc = 0
#        for c in expr:
#            if c == "{" and not esc:
#                depth = depth + 1
#            if c == "}" and not esc:
#                depth = depth - 1
#                if depth < 0:
#                    raise ValueError("unmatched '}'")
#            if c == "\\":
#                esc = (esc + 1) % 2
#            else:
#                esc = 0
#        if depth > 0:
#            raise ValueError("unmatched '{'")

    def preamble(self, expr, *args):
        r"""put something into the TeX/LaTeX preamble
        - in LaTeX, this is done before the \begin{document}
          (you might use \AtBeginDocument, when you're in need for)
        - it is not allowed to call preamble after calling the
          text method for the first time (for LaTeX this is needed
          due to \begin{document}; in TeX it is forced for compatibility
          (you should be able to switch from TeX to LaTeX, if you want,
          without breaking something
        - preamble expressions must not create any dvi output
        - args might contain texmessage instances
        - a bracketcheck is performed on the expression"""
        if self.texdone or not self.preamblemode:
            raise TexNotInPreambleModeError
        self.bracketcheck(expr)
        helper.checkattr(args, allowmulti=(texmessage,))
        args = helper.getattrs(args, texmessage, default=self.texmessagedefaultpreamble)
        self.execute(expr, *args)
        self.preambles.append((expr, args))

    PyXBoxPattern = re.compile(r"PyXBox:page=(?P<page>\d+),lt=(?P<lt>-?\d*((\d\.?)|(\.?\d))\d*)pt,rt=(?P<rt>-?\d*((\d\.?)|(\.?\d))\d*)pt,ht=(?P<ht>-?\d*((\d\.?)|(\.?\d))\d*)pt,dp=(?P<dp>-?\d*((\d\.?)|(\.?\d))\d*)pt:")

    def _text(self, x, y, expr, *args):
        """create text by passing expr to TeX/LaTeX
        - returns a textbox containing the result from running expr thru TeX/LaTeX
        - the box center is set to x, y
        - *args may contain style parameters, namely:
          - an halign instance
          - _texsetting instances
          - texmessage instances
          - trafo._trafo instances
          - base.PathStyle instances
        - a bracketcheck is performed on the expression"""
        if expr is None:
            raise ValueError("None expression is invalid")
        if self.texdone:
            if self.texdebug is not None:
                self.texdebug.write("%s\n" % reduce(lambda x, y: "%" + x, range(80), ""))
                self.texdebug.write("%% a new instance of %s is started\n" % self.mode)
            self.reset(reinit=1)
        if self.preamblemode:
            if self.mode == "latex":
                self.execute("\\begin{document}", *self.texmessagebegindoc)
            self.preamblemode = 0
        helper.checkattr(args, allowmulti=(_texsetting, texmessage, trafo._trafo, base.PathStyle))
                                           #XXX: should we distiguish between StrokeStyle and FillStyle?
        texsettings = helper.getattrs(args, _texsetting, default=[])
        exclusive = []
        for texsetting in texsettings:
            if texsetting.exclusive:
                if texsetting.id not in exclusive:
                    exclusive.append(texsetting.id)
                else:
                    raise RuntimeError("multiple occurance of exclusive texsetting with id=%i" % texsetting.id)
        texsettings.sort()
        for texsetting in texsettings:
            expr = texsetting.modifyexpr(expr, texsettings, self)
        self.bracketcheck(expr)
        self.execute(expr, *helper.getattrs(args, texmessage, default=self.texmessagedefaultrun))
        match = self.PyXBoxPattern.search(self.texmessage)
        if not match or int(match.group("page")) != self.page:
            raise TexResultError("box extents not found", self)
        left, right, height, depth = map(lambda x: float(x) * 72.0 / 72.27, match.group("lt", "rt", "ht", "dp"))
        box = _textbox(x, y, left, right, height, depth, self, self.dvinumber, self.page,
                       *helper.getattrs(args, base.PathStyle, default=[]))
        for t in helper.getattrs(args, trafo._trafo, default=()):
            box.reltransform(t)
        return box

    def text(self, x, y, expr, *args):
        return self._text(unit.topt(x), unit.topt(y), expr, *args)


# the module provides an default texrunner and methods for direct access
defaulttexrunner = texrunner()
reset = defaulttexrunner.reset
set = defaulttexrunner.set
preamble = defaulttexrunner.preamble
text = defaulttexrunner.text
_text = defaulttexrunner._text

