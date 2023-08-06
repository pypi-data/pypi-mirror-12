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

import copy, warnings, time
try:
    import zlib
    haszlib = 1
except:
    haszlib = 0

import unit, style, type1font, version

try:
    enumerate([])
except NameError:
    # fallback implementation for Python 2.2 and below
    def enumerate(list):
        return zip(xrange(len(list)), list)


class PDFregistry:

    def __init__(self):
        self.types = {}
        # we need to keep the original order of the resources (for PDFcontentlength)
        self.resources = []

    def add(self, resource):
        """ register resource, merging it with an already registered resource of the same type and id"""
        resources = self.types.setdefault(resource.type, {})
        if resources.has_key(resource.id):
            resources[resource.id].merge(resource)
        else:
            self.resources.append(resource)
            resources[resource.id] = resource

    def getrefno(self, resource):
        return self.types[resource.type][resource.id].refno

    def mergeregistry(self, registry):
        for resource in registry.resources:
            self.add(resource)

    def write(self, file, writer, catalog):
        # first we set all refnos
        refno = 1

        # we recursively inserted the resources such that the topmost resources in
        # the dependency tree of the resources come last. Hence, we need to 
        # reverse the resources list before writing the output
        self.resources.reverse()
        for resource in self.resources:
            resource.refno = refno
            refno += 1

        # second, all objects are written, keeping the positions in the output file
        fileposes = []
        for resource in self.resources:
            fileposes.append(file.tell())
            file.write("%i 0 obj\n" % resource.refno)
            resource.outputPDF(file, writer, self)
            file.write("endobj\n")

        # xref
        xrefpos = file.tell()
        file.write("xref\n"
                   "0 %d\n"
                   "0000000000 65535 f \n" % refno)

        for filepos in fileposes:
            file.write("%010i 00000 n \n" % filepos)

        # trailer
        file.write("trailer\n"
                   "<<\n"
                   "/Size %i\n" % refno)
        file.write("/Root %i 0 R\n" % self.getrefno(catalog))
        file.write("/Info %i 0 R\n" % self.getrefno(catalog.PDFinfo))
        file.write(">>\n"
                   "startxref\n"
                   "%i\n" % xrefpos)
        file.write("%%EOF\n")


class PDFobject:

    def __init__(self, type, _id=None):
        self.type = type
        if _id is None:
            self.id = id(self)
        else:
            self.id = _id
        self.refno = None

    def merge(self, other):
        pass

    def outputPDF(self, file, writer, registry):
        raise NotImplementedError("outputPDF method has to be provided by PDFobject subclass")


class PDFcatalog(PDFobject):

    def __init__(self, document, registry):
        PDFobject.__init__(self, "catalog")
        self.PDFpages = PDFpages(document, registry)
        registry.add(self.PDFpages)
        self.PDFinfo = PDFinfo()
        registry.add(self.PDFinfo)

    def outputPDF(self, file, writer, registry):
        file.write("<<\n"
                   "/Type /Catalog\n"
                   "/Pages %i 0 R\n" % registry.getrefno(self.PDFpages))
        if writer.fullscreen:
            file.write("/PageMode /FullScreen\n")
        file.write(">>\n")


class PDFinfo(PDFobject):

    def __init__(self):
        PDFobject.__init__(self, "info")

    def outputPDF(self, file, writer, registry):
        if time.timezone < 0:
            # divmod on positive numbers, otherwise the minutes have a different sign from the hours
            timezone = "-%02i'%02i'" % divmod(-time.timezone/60, 60)
        elif time.timezone > 0:
            timezone = "+%02i'%02i'" % divmod(time.timezone/60, 60)
        else:
            timezone = "Z00'00'"

        def pdfstring(s):
            r = ""
            for c in s:
                if 32 <= ord(c) <= 127 and c not in "()[]<>\\":
                    r += c
                else:
                    r += "\\%03o" % ord(c)
            return r

        file.write("<<\n")
        if writer.title:
            file.write("/Title (%s)\n" % pdfstring(writer.title))
        if writer.author:
            file.write("/Author (%s)\n" % pdfstring(writer.author))
        if writer.subject:
            file.write("/Subject (%s)\n" % pdfstring(writer.subject))
        if writer.keywords:
            file.write("/Keywords (%s)\n" % pdfstring(writer.keywords))
        file.write("/Creator (PyX %s)\n" % version.version)
        file.write("/CreationDate (D:%s%s)\n" % (time.strftime("%Y%m%d%H%M"), timezone))
        file.write(">>\n")


class PDFpages(PDFobject):

    def __init__(self, document, registry):
        PDFobject.__init__(self, "pages")
        self.PDFpagelist = []
        for pageno, page in enumerate(document.pages):
            page = PDFpage(page, pageno, self, registry)
            self.PDFpagelist.append(page)
        for i in range(len(self.PDFpagelist), 0, -1):
            registry.add(self.PDFpagelist[i-1])

    def outputPDF(self, file, writer, registry):
        file.write("<<\n"
                   "/Type /Pages\n"
                   "/Kids [%s]\n"
                   "/Count %i\n"
                   ">>\n" % (" ".join(["%i 0 R" % registry.getrefno(page)
                                       for page in self.PDFpagelist]),
                             len(self.PDFpagelist)))


class PDFpage(PDFobject):

    def __init__(self, page, pageno, PDFpages, registry):
        PDFobject.__init__(self, "page", pageno)
        self.PDFpages = PDFpages
        self.page = page

        # every page uses its own registry in order to find out which
        # resources are used within the page. However, the
        # pageregistry is also merged in the global registry
        self.pageregistry = PDFregistry()

        self.bbox = page.bbox()
        self.pagetrafo = page.pagetrafo(self.bbox)
        if self.pagetrafo:
            self.transformedbbox = self.bbox.transformed(self.pagetrafo)
        else:
            self.transformedbbox = self.bbox
        self.PDFcontent = PDFcontent(page.canvas, self.pagetrafo, self.pageregistry)
        self.pageregistry.add(self.PDFcontent)
        self.page.canvas.registerPDF(self.pageregistry)
        registry.mergeregistry(self.pageregistry)

    def outputPDF(self, file, writer, registry):
        file.write("<<\n"
                   "/Type /Page\n"
                   "/Parent %i 0 R\n" % registry.getrefno(self.PDFpages))
        paperformat = self.page.paperformat
        if paperformat:
            file.write("/MediaBox [0 0 %f %f]\n" % (unit.topt(paperformat.width), unit.topt(paperformat.height)))
        else:
            file.write("/MediaBox [%f %f %f %f]\n" % self.transformedbbox.highrestuple_pt())
        if self.transformedbbox and writer.writebbox:
            file.write("/CropBox [%f %f %f %f]\n" % self.transformedbbox.highrestuple_pt())
        procset = []
        if self.pageregistry.types.has_key("font"):
            procset.append("/Text")
        if self.pageregistry.types.has_key("image"):
            if [image for image in self.pageregistry.types["image"].values()
                if image.colorspace == "/DeviceGray"]:
                procset.append("/ImageB")
            if [image for image in self.pageregistry.types["image"].values()
                if image.colorspace is not None and image.colorspace != "/DeviceGray"]:
                procset.append("/ImageC")
            if [image for image in self.pageregistry.types["image"].values()
                if image.palettedata is not None]:
                procset.append("/ImageI")
        file.write("/Resources <<\n"
                   "/ProcSet [ /PDF %s ]\n" % " ".join(procset))
        if self.pageregistry.types.has_key("font"):
            file.write("/Font <<\n%s\n>>\n" % "\n".join(["/%s %i 0 R" % (font.name, registry.getrefno(font))
                                                      for font in self.pageregistry.types["font"].values()]))
        if self.pageregistry.types.has_key("image"):
            file.write("/XObject <<\n%s\n>>\n" % "\n".join(["/%s %i 0 R" % (image.name, registry.getrefno(image))
                                                         for image in self.pageregistry.types["image"].values()]))
        if self.pageregistry.types.has_key("pattern"):
            file.write("/Pattern <<\n%s\n>>\n" % "\n".join(["/%s %i 0 R" % (pattern.name, registry.getrefno(pattern))
                                                         for pattern in self.pageregistry.types["pattern"].values()]))
        file.write(">>\n")
        file.write("/Contents %i 0 R\n"
                   ">>\n" % registry.getrefno(self.PDFcontent))


class PDFcontent(PDFobject):

    def __init__(self, canvas, pagetrafo, registry):
        PDFobject.__init__(self, "content")
        self.canvas = canvas
        self.pagetrafo = pagetrafo
        self.contentlength = PDFcontentlength((self.type, self.id))
        registry.add(self.contentlength)

    def outputPDF(self, file, writer, registry):
        file.write("<<\n"
                   "/Length %i 0 R\n" % registry.getrefno(self.contentlength))
        if writer.compress:
            file.write("/Filter /FlateDecode\n")
        file.write(">>\n"
                   "stream\n")
        beginstreampos = file.tell()

        if writer.compress:
            stream = compressedstream(file, writer.compresslevel)
        else:
            stream = file

        # XXX this should maybe be handled by the page since removing
        # this code would allow us to (nearly, since we also need to
        # set more info in the content dict) reuse PDFcontent for
        # patterns
        acontext = context()
        # apply a possible global transformation
        if self.pagetrafo:
            self.pagetrafo.outputPDF(stream, writer, acontext)
        style.linewidth.normal.outputPDF(stream, writer, acontext)

        self.canvas.outputPDF(stream, writer, acontext)
        if writer.compress:
            stream.flush()

        self.contentlength.contentlength = file.tell() - beginstreampos
        if writer.compress:
            file.write("\n")
        file.write("endstream\n")


class PDFcontentlength(PDFobject):

    def __init__(self, contentid):
        PDFobject.__init__(self, "_contentlength", contentid)
        self.contentlength = None

    def outputPDF(self, file, writer, registry):
        # initially we do not know about the content length
        # -> it has to be written into the instance later on
        file.write("%d\n" % self.contentlength)


class PDFfont(PDFobject):

    def __init__(self, font, chars, registry):
        PDFobject.__init__(self, "font", font.name)

        self.fontdescriptor = PDFfontdescriptor(font, chars, registry)
        registry.add(self.fontdescriptor)

        if font.encoding:
            self.encoding = PDFencoding(font.encoding)
            registry.add(self.encoding)
        else:
            self.encoding = None

        self.name = font.name
        self.basefontname = font.basefontname
        self.metric = font.metric

    def outputPDF(self, file, writer, registry):
        file.write("<<\n"
                   "/Type /Font\n"
                   "/Subtype /Type1\n")
        file.write("/Name /%s\n" % self.name)
        file.write("/BaseFont /%s\n" % self.basefontname)
        if self.fontdescriptor.fontfile is not None and self.fontdescriptor.fontfile.usedchars is not None:
            usedchars = self.fontdescriptor.fontfile.usedchars
            firstchar = min(usedchars.keys())
            lastchar = max(usedchars.keys())
            file.write("/FirstChar %d\n" % firstchar)
            file.write("/LastChar %d\n" % lastchar)
            file.write("/Widths\n"
                       "[")
            for i in range(firstchar, lastchar+1):
                if i and not (i % 8):
                    file.write("\n")
                else:
                    file.write(" ")
                if usedchars.has_key(i):
                    file.write("%f" % self.metric.getwidth_ds(i))
                else:
                    file.write("0")
            file.write(" ]\n")
        else:
            file.write("/FirstChar 0\n"
                       "/LastChar 255\n"
                       "/Widths\n"
                       "[")
            for i in range(256):
                if i and not (i % 8):
                    file.write("\n")
                else:
                    file.write(" ")
                try:
                    width = self.metric.getwidth_ds(i)
                except (IndexError, AttributeError):
                    width = 0
                file.write("%f" % width)
            file.write(" ]\n")
        file.write("/FontDescriptor %d 0 R\n" % registry.getrefno(self.fontdescriptor))
        if self.encoding:
            file.write("/Encoding %d 0 R\n" % registry.getrefno(self.encoding))
        file.write(">>\n")


class PDFfontdescriptor(PDFobject):

    def __init__(self, font, chars, registry):
        PDFobject.__init__(self, "fontdescriptor", font.basefontname)

        if font.filename is None:
            self.fontfile = None
        else:
            self.fontfile = PDFfontfile(font.basefontname, font.filename, font.encoding, chars)
            registry.add(self.fontfile)

        self.name = font.basefontname
        self.fontinfo = font.metric.fontinfo()

    def outputPDF(self, file, writer, registry):
        file.write("<<\n"
                   "/Type /FontDescriptor\n"
                   "/FontName /%s\n" % self.name)
        if self.fontfile is None:
            file.write("/Flags 32\n")
        else:
            file.write("/Flags %d\n" % self.fontfile.getflags())
        file.write("/FontBBox [%d %d %d %d]\n" % self.fontinfo.fontbbox)
        file.write("/ItalicAngle %d\n" % self.fontinfo.italicangle)
        file.write("/Ascent %d\n" % self.fontinfo.ascent)
        file.write("/Descent %d\n" % self.fontinfo.descent)
        file.write("/CapHeight %d\n" % self.fontinfo.capheight)
        file.write("/StemV %d\n" % self.fontinfo.vstem)
        if self.fontfile is not None:
            file.write("/FontFile %d 0 R\n" % registry.getrefno(self.fontfile))
        file.write(">>\n")


class PDFfontfile(PDFobject):

    def __init__(self, name, filename, encoding, chars):
        PDFobject.__init__(self, "fontfile", filename)
        self.name = name
        self.filename = filename
        if encoding is None:
            self.encodingfilename = None
        else:
            self.encodingfilename = encoding.filename
        self.usedchars = {}
        for char in chars:
            self.usedchars[char] = 1

        # for flags-caching
        self.fontfile = None
        self.flags = None

    def merge(self, other):
        self.fontfile = None # remove fontfile cache when adding further stuff after writing
        if self.encodingfilename != other.encodingfilename:
            self.usedchars = None # stripping of font not possible
        else:
            self.usedchars.update(other.usedchars)

    def mkfontfile(self):
        if self.fontfile is None:
            self.fontfile = type1font.fontfile(self.name,
                                               self.filename,
                                               self.usedchars,
                                               self.encodingfilename)

    def getflags(self):
        if not self.flags:
            self.mkfontfile()
            self.flags = self.fontfile.getflags()
        return self.flags

    def outputPDF(self, file, writer, registry):
        self.mkfontfile()
        self.fontfile.outputPDF(file, writer, registry)


class PDFencoding(PDFobject):

    def __init__(self, encoding):
        PDFobject.__init__(self, "encoding", encoding.name)
        self.encoding = encoding

    def outputPDF(self, file, writer, registry):
        encodingfile = type1font.encodingfile(self.encoding.name, self.encoding.filename)
        encodingfile.outputPDF(file, writer, registry)


class PDFwriter:

    def __init__(self, document, filename,
                       title=None, author=None, subject=None, keywords=None,
                       fullscreen=0, writebbox=0, compress=1, compresslevel=6):
        if not filename.endswith(".pdf"):
            filename = filename + ".pdf"
        try:
            file = open(filename, "wb")
        except IOError:
            raise IOError("cannot open output file")

        self.title = title
        self.author = author
        self.subject = subject
        self.keywords = keywords
        self.fullscreen = fullscreen
        self.writebbox = writebbox
        if compress and not haszlib:
            compress = 0
            warnings.warn("compression disabled due to missing zlib module")
        self.compress = compress
        self.compresslevel = compresslevel

        file.write("%%PDF-1.4\n%%%s%s%s%s\n" % (chr(195), chr(182), chr(195), chr(169)))

        # the PDFcatalog class automatically builds up the pdfobjects from a document
        registry = PDFregistry()
        catalog = PDFcatalog(document, registry)
        registry.add(catalog)
        registry.write(file, self, catalog)
        file.close()


class compressedstream:

    def __init__(self, file, compresslevel):
        self.file = file
        self.compressobj = zlib.compressobj(compresslevel)

    def write(self, string):
        self.file.write(self.compressobj.compress(string))

    def flush(self):
        self.file.write(self.compressobj.flush())


class context:

    def __init__(self):
        self.linewidth_pt = None
        # XXX there are both stroke and fill color spaces
        self.colorspace = None
        self.strokeattr = 1
        self.fillattr = 1
        self.font = None
        self.textregion = 0

    def __call__(self, **kwargs):
        newcontext = copy.copy(self)
        for key, value in kwargs.items():
            setattr(newcontext, key, value)
        return newcontext
