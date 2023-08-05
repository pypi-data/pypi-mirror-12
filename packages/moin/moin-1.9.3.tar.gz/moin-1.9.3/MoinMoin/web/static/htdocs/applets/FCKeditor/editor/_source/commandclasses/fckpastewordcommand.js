﻿/*
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2010 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * FCKPasteWordCommand Class: represents the "Paste from Word" command.
 */

var FCKPasteWordCommand = function()
{
	this.Name = 'PasteWord' ;
}

FCKPasteWordCommand.prototype.Execute = function()
{
	FCK.PasteFromWord() ;
}

FCKPasteWordCommand.prototype.GetState = function()
{
	if ( FCK.EditMode != FCK_EDITMODE_WYSIWYG || FCKConfig.ForcePasteAsPlainText )
		return FCK_TRISTATE_DISABLED ;
	else
		return FCK.GetNamedCommandState( 'Paste' ) ;
}
