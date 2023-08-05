## $Id: interfaces.py 7819 2012-03-08 22:28:46Z henrik $
##
## Copyright (C) 2011 Uli Fouquet & Henrik Bettermann
## This program is free software; you can redistribute it and/or modify
## it under the terms of the GNU General Public License as published by
## the Free Software Foundation; either version 2 of the License, or
## (at your option) any later version.
##
## This program is distributed in the hope that it will be useful,
## but WITHOUT ANY WARRANTY; without even the implied warranty of
## MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
## GNU General Public License for more details.
##
## You should have received a copy of the GNU General Public License
## along with this program; if not, write to the Free Software
## Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
##
"""Interfaces for waeup.kofa.image
"""
from hurry.file.interfaces import IFile, IFileRetrieval, IHurryFile

class IImageFile(IFile):
    """Image file field.
    """

class IKofaImageFile(IHurryFile):
    """Image file.
    """

class IImageFileRetrieval(IFileRetrieval):
    """A file retrieval for images.
    """
