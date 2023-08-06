from pyx import *

# Set properties of the defaulttexrunner, e.g. switch to LaTeX.
text.set(mode="latex")

c = canvas.canvas()
# The canvas, by default, uses the defaulttexrunner from the text module.
# This can be changed by the canvas method settexrunner.
c.text(0, 0, r"This is \LaTeX.")

# If you want to use another texrunner temporarily, you can just insert
# a text box manually
plaintex = text.texrunner() # plain TeX instance
c.insert(plaintex.text(0, -1, r"This is plain \TeX."))

c.writeEPSfile("texrunner")
c.writePDFfile("texrunner")
