pyRegistry

pyRegistry is a Python 2.X module which provides a object-oriented
interface to the Windows system registry.  The module is written in
C++ to compile under Visual C++ 6 or 7.

Just copy pyRegistry.dll to a directory in your Python
path. pyRegistry.dll is the only file you need. See doc.html for
documentation of use.

changelog:

2004-12-21 v1.0.5
Built for Python 2.4. Also now you can iterate on a pyregistry object. Doing
so iterates through subkeys.

2004-08-18 v1.0.4
Now fix the code to rename getSubKeys() to getKeyNames(). Add a deprecation
warning for getSubKeys() since I'd like to get rid of that. 

2004-08-11 v1.0.3
Updated documentation to clarify createKey() and fix getSubKeys() in Synopsis.

2002-08-09 v1.0.1
I fixed a bug reported by Tim Lewis where calling reg.getValue('name')
where the named value was a zero-length REG_SZ would cause an access
violation and crash the program. This was just a dumb logic bug on my
part. Thanks Tim.

Copyright (C) 2000-2010 Jens B. Jorgensen <jbj1@ultraemail.net>

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
