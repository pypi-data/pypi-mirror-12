#!/usr/bin/env python
#
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
# 3/19/2004 version 0.0.1a
# mmckerns@caltech.edu
# (C) 2004 All Rights Reserved
#
# <LicenseText>
#
# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
#
import os

def getSHELL():
    '''getSHELL(); Return the name of the current shell'''
    return os.path.basename(env('SHELL',1))

def getHOME():
    '''getHOME(); Return the path to the user\'s home directory'''
    try:
        return os.path.expandvars('$HOME')
    except:
        homedir = None
        directory = os.curdir
        while homedir:
            homedir = where(getUSER(),directory)
            directory = os.path.join(os.pardir,directory)
        return homedir

def getROOT():
    '''getROOT(); Return the rootdir path for the current drive'''
    return os.path.splitdrive(os.getcwd())[0]+os.sep

def getUSER():
    '''getUSER(); Return the login name of the current user'''
    try:
        return os.getlogin()
    except:
        return os.path.expandvars('$USER')

def getSEP(type=''):
    '''getSEP([type]); Return the seperator specified by type'''
    if type in ['path','pathsep']: return os.pathsep
    elif type in ['ext','extsep']: return os.extsep
    elif type in ['line','linesep']: return os.linesep
    elif type in ['alt','altsep']: return os.altsep
    elif type not in ['','sep']:
        if not type.endswith('sep'): type += 'sep'
        print("Error: 'os.%s' not found" % type)
        raise TypeError
    return os.sep
    

def stripDups(path,pathsep=None):
    '''stripDups(path[,pathsep]) --> path with duplicates removed'''
    if not pathsep: pathsep = os.pathsep
    pathlist = path.split(pathsep) 
    shortlist = []
    for item in pathlist:
        if item not in shortlist:
            shortlist.append(item)
    return pathsep.join(shortlist)

def env(var,firstval=0,pathDups=1):
    '''env(var[,firstval,pathDups]) --> dictionary of environment variable:value
    optionally can be set to return the first value string (be careful here!)
    partial names using patterns are acceptable'''
    #better than os.path.expandvars ?
    import fnmatch
    vals = {}
    for key,value in list(os.environ.items()):
        if fnmatch.fnmatch(key,var):
            vals[key] = value
    if not pathDups:
        for key,value in list(vals.items()):
            if fnmatch.fnmatch(key,'*PATH'):
                vals[key] = stripDups(value)
    if firstval:
        if len(vals) == 0: return
        return list(vals.values())[0]
    return vals

def whereis(prog,listall=0): #Unix specific
    '''which(prog[,listall]) --> path to file'''
    whcom = 'whereis '
    stin,stout = os.popen4(whcom+prog)
    stin.close()
    pathstr = stout.read()
    stout.close()
    paths = pathstr.strip().split(":")[1]
    pathlist = paths.strip().split()
    if not pathlist:
        if not listall: pathlist = ''
        return pathlist
    if not listall: return pathlist[0]
    return pathlist
    
def which(prog,allowlink=1,allowerr=0,listall=0): #Unix specific
    '''which(prog[,allowlink,allowerr,listall]) --> path to executable'''
    import os
    if os.name == "nt": raise NotImplementedError("method 'which' is not yet implemented in Windows platform")
    whcom = 'which '
    if listall: whcom += '-a '
    stin,stout = os.popen4(whcom+prog)
    stin.close()
    pathstr = stout.read()
    stout.close()
    errind = 'no '+prog+' in'
    if (errind in pathstr) and (not allowerr):
        return None
    pathstr = stripDups(pathstr.strip(),os.linesep)
    paths = pathstr.split(os.linesep)
    for i in range(len(paths)):
        if not allowlink and os.path.islink(paths[i]):
            paths[i] = os.path.realpath(paths[i])
    if not listall: return paths[0]
    return paths
    
def find(items,root=None,recurse=1,type=None):
    '''find(items[,root,recurse,type]) --> path to file, directory, or link'''
    if not root: root = os.curdir
    #create a list by splitting patterns at ';'
    try:
        from sys import platform
        if platform[:3] == 'win': raise NotImplementedError
        pathlist = []
        search_list = items.split(';')
        for item in search_list:
            command = 'find %s -name %r' % (root, item)
            if type in ['l','d','f','s','b','c']:
                command += ' -type '+type
            if not recurse:
                command += ' -maxdepth 1'
            print(command)
            stin,stout = os.popen4(command)
            stin.close()
            pathstr = stout.readlines()
            stout.close()
            errind = ['find:','Usage:']
            if errind[1] in pathstr:
                print("Error: incorrect usage '%s'" % command)
                return
            for path in pathstr:
                if errind[0] not in path:
                    path = path.strip()
                    pathlist.append(os.path.abspath(path))
    except:
        folders = 0;files = 0;links = 0
        if type in ['f']: files = 1
        elif type in ['l']: links = 1
        elif type in ['d']: folders = 1
        else: folders = 1;files = 1;links = 1
        pathlist = walk(root,items,recurse,folders,files,links)
    return pathlist

def walk(root,patterns='*',recurse=1,folders=0,files=1,links=1):
    '''walk(root[,patterns,recurse,folders,files,links]) --> list
       Walk the directory tree and return list matching the requested pattern'''
    print("walking...")
    import fnmatch
    #create a list by splitting patterns at ';'
    pattern_list = patterns.split(';')
    #collect arguments into a bunch
    class Bunch:
        def __init__(self, **kwds):
            self.__dict__.update(kwds)
    arg = Bunch(recurse=recurse,pattern_list=pattern_list,
                folders=folders, files=files, links=links, results=[])
    def visit(arg,dirname,items):
        #append to arg.results all relevant items
        for name in items:
            fullname = os.path.normpath(os.path.join(dirname,name))
            if(arg.files and os.path.isfile(fullname) and \
                         not os.path.islink(fullname)) or \
              (arg.folders and os.path.isdir(fullname) and \
                           not os.path.islink(fullname)) or \
              (arg.links and os.path.islink(fullname)):
                for pattern in arg.pattern_list:
                    if fnmatch.fnmatch(name,pattern):
                        arg.results.append(fullname)
                        break
        #block recursion if disallowed
        if not arg.recurse:
            items[:] = []
    os.path.walk(root,visit,arg)
    return arg.results


def where(filename,search_path,pathsep=None):
    '''where(filename,search_path[,pathsep]) --> full_path
    Given a search path, find the matching name'''
    if not pathsep: pathsep = os.pathsep
    import string
    for path in string.split(search_path, pathsep):
        candidate = os.path.join(path,filename)
        if os.path.exists(candidate):
            return os.path.abspath(candidate)
    return None

def mkdir(dirpath,root=None,mode=0o775):
    '''mkdir(dirpath[,root,mode]) --> absolute path of new dir
    Make a new directory (and necessary parents) in root dir'''
    if not root: root = os.curdir
    newdir = os.path.join(root,dirpath)
    absdir = os.path.abspath(newdir)
    import errno
    try:
        os.makedirs(absdir,mode)
        return absdir
    except OSError as err:
        if (err.errno != errno.EEXIST) or (not os.path.isdir(absdir)):
            raise

def shellsub(command):
    '''shellsub(command) --> command formatted for remote shell invocation'''
    import re
    command = re.compile('\'').sub('\\\'',command) 
    command = re.compile('\"').sub('\\\"',command)
    command = re.compile('\$').sub('\\\$',command)
    command = re.compile('\(').sub('\\\(',command)
    command = re.compile('\)').sub('\\\)',command)
    #command = re.compile('\{').sub('\\\{',command)
    #command = re.compile('\}').sub('\\\}',command)
    #command = re.compile('\[').sub('\\\[',command)
    #command = re.compile('\]').sub('\\\]',command)
    #command = re.compile('\~').sub('\\\~',command)
    #command = re.compile('\!').sub('\\\!',command)
    #command = re.compile('\&').sub('\\\&',command)
    #command = re.compile('\|').sub('\\\|',command)
    #command = re.compile('\*').sub('\\\*',command)
    #command = re.compile('\%').sub('\\\%',command)
    #command = re.compile('\#').sub('\\\#',command)
    #command = re.compile('\@').sub('\\\@',command)
    #command = re.compile('\:').sub('\\\:',command)
    #command = re.compile('\;').sub('\\\;',command)
    #command = re.compile('\,').sub('\\\,',command)
    #command = re.compile('\.').sub('\\\.',command)
    #command = re.compile('\?').sub('\\\?',command)
    #command = re.compile('\>').sub('\\\>',command)
    #command = re.compile('\<').sub('\\\<',command)
    #command = re.compile('\/').sub('\\\/',command)
    #command = re.compile('\\\\').sub('\\\\\\\\',command) 
    return command

def test():
    '''test(); script to test all functions'''
    print('testing getSHELL...')
    print(getSHELL())

    print('testing getHOME...')
    print(getHOME())

    print('testing getROOT...')
    print(getROOT())

    print('testing mkdir...')
    newdir = 'xxxtest/testxxx'
    print(mkdir(newdir))
    print('cleaning up...')
    os.removedirs(newdir)

    print('testing walk...')
    print(walk('/usr/local','*',recurse=0,folders=1,files=0))
    homedir = walk('/home',getUSER(),0,1)[0]
    print(homedir)
    print(walk(homedir,'.bashrc',recurse=0))

    print('testing where...')
    bashrc = where('.bashrc',homedir)
    print(bashrc)

    print('testing stripDups...')
    print(stripDups(os.path.expandvars('$PATH')))

    print('testing env...')
    print(env('TEST'))
    print(env('HOME',1))
    print(env('TOOLS*'))
    print(env('*PATH*',pathDups=False))

    print('testing getUSER...')
    print(getUSER())

    print('testing which...')
    print(which('python'))
    print(which('python',allowlink=False))
    print(which('python',listall=True))

    print('testing find...')
    print(find('python','/usr/local',type='l'))
    print(find('*py;*txt'))

    print('testing getSEP...')
    print(getSEP())
    print(getSEP('ext'))
#   print getSEP('foo')

    print('testing shellsub...')
    command = '${HOME}/bin/which foo("bar")'
    print(command)
    print(shellsub(command))

    return


if __name__=='__main__':
    import sys
    try:
        func = sys.argv[1]
    except: func = None
    if func:
        try:
            exec('print %s' % func)
        except:
            print("Error: incorrect syntax '%s'" % func)
            exec('print %s.__doc__' % func.split('(')[0])
    else: test()


# version
__id__ = "$Id: shutils.py 179 2006-10-21 17:21:16Z linjiao $"

# End of file 
