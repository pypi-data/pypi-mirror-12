#!/usr/bin/env python
# -*- coding: ISO-8859-1 -*-
#
#
# Copyright (C) 2005 J�rg Lehmann <joergl@users.sourceforge.net>
# Copyright (C) 2005 Andr� Wobst <wobsta@users.sourceforge.net>
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
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA

import copy, time, math
import style, version, type1font, unit

try:
    enumerate([])
except NameError:
    # fallback implementation for Python 2.2 and below
    def enumerate(list):
        return zip(xrange(len(list)), list)


class PSregistry:

    def __init__(self):
        # in order to keep a consistent order of the registered resources we
        # not only store them in a hash but also keep an ordered list (up to a
        # possible merging of resources, in which case the first instance is
        # kept)
        self.resourceshash = {}
        self.resourceslist = []

    def add(self, resource):
        rkey = (resource.type, resource.id)
        if self.resourceshash.has_key(rkey):
           self.resourceshash[rkey].merge(resource)
        else:
           self.resourceshash[rkey] = resource
           self.resourceslist.append(resource)

    def outputPS(self, file, writer):
        """ write all PostScript code of the prolog resources """
        for resource in self.resourceslist:
            resource.outputPS(file, writer, self)

#
# Abstract base class
#

class PSresource:

    """ a PostScript resource """

    def __init__(self, type, id):
        # Every PSresource has to have a type and a unique id.
        # Resources with the same type and id will be merged
        # when they are registered in the PSregistry
        self.type = type
        self.id = id

    def merge(self, other):
        """ merge self with other, which has to be a resource of the same type and with
        the same id"""
        pass

    def outputPS(self, file, writer, registry):
        raise NotImplementedError("outputPS not implemented for %s" % repr(self))

#
# Different variants of prolog items
#

class PSdefinition(PSresource):

    """ PostScript function definition included in the prolog """

    def __init__(self, id, body):
        self.type = "definition"
        self.id = id
        self.body = body

    def outputPS(self, file, writer, registry):
        file.write("%%%%BeginRessource: %s\n" % self.id)
        file.write("%(body)s /%(id)s exch def\n" % self.__dict__)
        file.write("%%EndRessource\n")


class PSfont:

    def __init__(self, font, chars, registry):
        if font.filename:
            registry.add(PSfontfile(font.basefontname,
                                    font.filename,
                                    font.encoding,
                                    chars))
        if font.encoding:
            registry.add(_ReEncodeFont)
            registry.add(PSfontencoding(font.encoding))
            registry.add(PSfontreencoding(font.name,
                                          font.basefontname,
                                          font.encoding.name))


class PSfontfile(PSresource):

    """ PostScript font definition included in the prolog """

    def __init__(self, name, filename, encoding, chars):
        """ include type 1 font defined by the following parameters

        - name:        name of the PostScript font
        - filename:    name (without path) of file containing the font definition
        - encfilename: name (without path) of file containing used encoding of font
                       or None (if no encoding file used)
        - chars:       character list to fill usedchars

        """

        # Note that here we only need the encoding for selecting the used glyphs!

        self.type = "fontfile"
        self.id = self.name = name
        self.filename = filename
        if encoding is None:
            self.encodingfilename = None
        else:
            self.encodingfilename = encoding.filename
        self.usedchars = {}
        for char in chars:
            self.usedchars[char] = 1

    def merge(self, other):
        if self.encodingfilename == other.encodingfilename:
            self.usedchars.update(other.usedchars)
        else:
            self.usedchars = None # stripping of font not possible

    def outputPS(self, file, writer, registry):
        fontfile = type1font.fontfile(self.name, self.filename, self.usedchars, self.encodingfilename)
        fontfile.outputPS(file, writer, registry)


class PSfontencoding(PSresource):

    """ PostScript font encoding vector included in the prolog """

    def __init__(self, encoding):
        """ include font encoding vector specified by encoding """

        self.type = "fontencoding"
        self.id = encoding.name
        self.encoding = encoding

    def outputPS(self, file, writer, registry):
        encodingfile = type1font.encodingfile(self.encoding.name, self.encoding.filename)
        encodingfile.outputPS(file, writer, registry)


class PSfontreencoding(PSresource):

    """ PostScript font re-encoding directive included in the prolog """

    def __init__(self, fontname, basefontname, encodingname):
        """ include font re-encoding directive specified by

        - fontname:     PostScript FontName of the new reencoded font
        - basefontname: PostScript FontName of the original font
        - encname:      name of the encoding
        - font:         a reference to the font instance (temporarily added for pdf support)

        Before being able to reencode a font, you have to include the
        encoding via a fontencoding prolog item with name=encname

        """

        self.type = "fontreencoding"
        self.id = self.fontname = fontname
        self.basefontname = basefontname
        self.encodingname = encodingname

    def outputPS(self, file, writer, registry):
        file.write("%%%%BeginProcSet: %s\n" % self.fontname)
        file.write("/%s /%s %s ReEncodeFont\n" % (self.basefontname, self.fontname, self.encodingname))
        file.write("%%EndProcSet\n")


_ReEncodeFont = PSdefinition("ReEncodeFont", """{
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


class epswriter:

    def __init__(self, document, filename):
        if len(document.pages) != 1:
            raise ValueError("EPS file can be construced out of a single page document only")
        page = document.pages[0]
        canvas = page.canvas

        if not filename.endswith(".eps"):
            filename = filename + ".eps"
        try:
            file = open(filename, "w")
        except IOError:
            raise IOError("cannot open output file")

        bbox = page.bbox()
        pagetrafo = page.pagetrafo(bbox)

        # if a page transformation is necessary, we have to adjust the bounding box
        # accordingly
        if pagetrafo is not None:
            bbox.transform(pagetrafo)

        file.write("%!PS-Adobe-3.0 EPSF-3.0\n")
        if bbox:
            file.write("%%%%BoundingBox: %d %d %d %d\n" % bbox.lowrestuple_pt())
            file.write("%%%%HiResBoundingBox: %g %g %g %g\n" % bbox.highrestuple_pt())
        file.write("%%%%Creator: PyX %s\n" % version.version)
        file.write("%%%%Title: %s\n" % filename)
        file.write("%%%%CreationDate: %s\n" %
                   time.asctime(time.localtime(time.time())))
        file.write("%%EndComments\n")

        file.write("%%BeginProlog\n")
        registry = PSregistry()
        canvas.registerPS(registry)
        registry.outputPS(file, self)
        file.write("%%EndProlog\n")

        acontext = context()
        # apply a possible page transformation
        if pagetrafo:
            pagetrafo.outputPS(file, self, acontext)

        style.linewidth.normal.outputPS(file, self, acontext)

        # here comes the canvas content
        canvas.outputPS(file, self, acontext)

        file.write("showpage\n")
        file.write("%%Trailer\n")
        file.write("%%EOF\n")


class pswriter:

    def __init__(self, document, filename):
        if not filename.endswith(".ps"):
            filename = filename + ".ps"
        try:
            file = open(filename, "w")
        except IOError:
            raise IOError("cannot open output file")

        # calculated bounding boxes of separate pages and the bounding box of the whole document
        documentbbox = None
        for page in document.pages:
            canvas = page.canvas
            page._bbox = page.bbox()
            page._pagetrafo = page.pagetrafo(page._bbox)
            # if a page transformation is necessary, we have to adjust the bounding box
            # accordingly
            if page._pagetrafo:
                page._transformedbbox = page._bbox.transformed(page._pagetrafo)
            else:
                page._transformedbbox = page._bbox
            if page._transformedbbox:
                if documentbbox:
                    documentbbox += page._transformedbbox
                else:
                    documentbbox = page._transformedbbox.enlarge(0) # make a copy

        file.write("%!PS-Adobe-3.0\n")
        if documentbbox:
            file.write("%%%%BoundingBox: %d %d %d %d\n" % documentbbox.lowrestuple_pt())
            file.write("%%%%HiResBoundingBox: %g %g %g %g\n" % documentbbox.highrestuple_pt())
        file.write("%%%%Creator: PyX %s\n" % version.version)
        file.write("%%%%Title: %s\n" % filename)
        file.write("%%%%CreationDate: %s\n" %
                   time.asctime(time.localtime(time.time())))

        # required paper formats
        paperformats = {}
        for page in document.pages:
            paperformats[page.paperformat] = page.paperformat

        first = 1
        for paperformat in paperformats.values():
            if first:
                file.write("%%DocumentMedia: ")
                first = 0
            else:
                file.write("%%+ ")
            file.write("%s %d %d 75 white ()\n" % (paperformat.name,
                                                   unit.topt(paperformat.width),
                                                   unit.topt(paperformat.height)))

        # file.write(%%DocumentNeededResources: ") # register not downloaded fonts here

        file.write("%%%%Pages: %d\n" % len(document.pages))
        file.write("%%PageOrder: Ascend\n")
        file.write("%%EndComments\n")

        # document defaults section
        #file.write("%%BeginDefaults\n")
        #file.write("%%EndDefaults\n")

        # document prolog section
        file.write("%%BeginProlog\n")
        registry = PSregistry()
        for page in document.pages:
            page.canvas.registerPS(registry)
        registry.outputPS(file, self)
        file.write("%%EndProlog\n")

        # document setup section
        #file.write("%%BeginSetup\n")
        #file.write("%%EndSetup\n")

        # pages section
        for nr, page in enumerate(document.pages):
            file.write("%%%%Page: %s %d\n" % (page.pagename is None and str(nr+1) or page.pagename, nr+1))
            file.write("%%%%PageMedia: %s\n" % page.paperformat.name)
            file.write("%%%%PageOrientation: %s\n" % (page.rotated and "Landscape" or "Portrait"))
            if page._transformedbbox:
                file.write("%%%%PageBoundingBox: %d %d %d %d\n" % page._transformedbbox.lowrestuple_pt())

            # page setup section
            file.write("%%BeginPageSetup\n")
            file.write("/pgsave save def\n")
            
            acontext = context()
            # apply a possible page transformation
            if page._pagetrafo is not None:
                page._pagetrafo.outputPS(file, self, acontext)

            style.linewidth.normal.outputPS(file, self, acontext)
            file.write("%%EndPageSetup\n")
            
            # here comes the actual content
            page.canvas.outputPS(file, self, acontext)
            file.write("pgsave restore\n")
            file.write("showpage\n")
            file.write("%%PageTrailer\n")

        file.write("%%Trailer\n")
        file.write("%%EOF\n")

class context:

    def __init__(self):
        self.linewidth_pt = None
        self.colorspace = None
        self.font = None

    def __call__(self, **kwargs):
        newcontext = copy.copy(self)
        for key, value in kwargs.items():
            setattr(newcontext, key, value)
        return newcontext
