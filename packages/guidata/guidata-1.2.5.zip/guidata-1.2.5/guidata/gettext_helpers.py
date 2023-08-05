# -*- coding: utf-8 -*-
#
# Copyright © 2009-2010 CEA
# Pierre Raybaut
# Licensed under the terms of the CECILL License
# (see guidata/__init__.py for details)

import sys
import os
import os.path as osp
from subprocess import call

# Find pygettext.py source on a windows install
pygettext=osp.join( sys.prefix, "Tools", "i18n", "pygettext.py" )
msgfmt=osp.join( sys.prefix, "Tools", "i18n", "msgfmt.py" )


def get_files( modname ):
    files = []
    for dirname, _dirnames, filenames in os.walk(modname):
        files += [ osp.join(dirname, f)
                   for f in filenames if f.endswith(".py")  or f.endswith(".pyw") ]
    for dirname, _dirnames, filenames in os.walk("tests"):
        files += [ osp.join(dirname, f)
                   for f in filenames if f.endswith(".py") or f.endswith(".pyw") ]
    return files

def get_lang( modname ):
    localedir = osp.join( modname, "locale")
    for _dirname, dirnames, _filenames in os.walk(localedir):
        break # we just want the list of first level directories
    return dirnames

def do_rescan( modname ):
    files = get_files( modname )
    localedir = osp.join(modname, "locale")
    potfile = modname+".pot"
    call( ["python", pygettext,
              ##"-D",   # Extract docstrings
                    "-o", potfile,   # Nom du fichier pot
                    "-p", localedir, # dest
                  ] + files
            )
    for lang in get_lang( modname ):
        pofilepath = osp.join( localedir, lang, "LC_MESSAGES", modname + ".po" )
        potfilepath = osp.join( localedir, potfile )
        print "Updating...", pofilepath
        if not osp.exists( osp.join( localedir, lang, "LC_MESSAGES" ) ):
            os.mkdir( osp.join( localedir, lang, "LC_MESSAGES" ) )
        if not osp.exists( pofilepath ):
            outf = file( pofilepath, "w" )
            outf.write( "# -*- coding: utf-8 -*-\n" )
            data = file( potfilepath ).read()
            data = data.replace( "charset=CHARSET", "charset=utf-8" )
            data = data.replace( "Content-Transfer-Encoding: ENCODING",
                                 "Content-Transfer-Encoding: utf-8" )
            outf.write(data)
        else:
            print "merge..."
            call([ "msgmerge", "-o", pofilepath, pofilepath, potfilepath] )


def do_compile( modname ):
#    files = get_files( modname )
    localedir = osp.join(modname, "locale")
    for lang in get_lang( modname ):
        pofilepath = osp.join( localedir, lang, "LC_MESSAGES", modname + ".po" )
        call( ["python", msgfmt, pofilepath] )
    

def main( modname ):
    if len(sys.argv)<2:
        cmd = "help"
    else:
        cmd = sys.argv[1]
#    lang = get_lang( modname )
    if cmd=="help":
        print "Available commands:"
        print "   help : this message"
        print "   help_gettext : pygettext --help"
        print "   help_msgfmt : msgfmt --help"
        print "   scan : rescan .py files and updates existing .po files"
        print "   compile : recompile .po files"
        print
        print "Pour fonctionner ce programme doit être lancé depuis"
        print "la racine du module"
        print "Traductions disponibles:"
        for i in get_lang(modname):
            print i
        
    elif cmd=="help_gettext":
        call(["python", pygettext, "--help"] )
    elif cmd=="help_msgfmt":
        call(["python", msgfmt, "--help"] )
    elif cmd=="scan":
        print "Updating pot files"
        do_rescan( modname )
    elif cmd=="compile":
        print "Builtin .mo files"
        do_compile( modname )
