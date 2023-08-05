<?php
/*
 * @(#)AnyWikiDraw.php  
 *
 * Copyright (c) 2007-2008 by the original authors of AnyWikiDraw
 * and all its contributors.
 * All rights reserved.
 *
 * The copyright of this software is owned by the authors and  
 * contributors of the AnyWikiDraw project ("the copyright holders").
 * You may not use, copy or modify this software, except in  
 * accordance with the license agreement you entered into with  
 * the copyright holders. For details see accompanying license terms. 
 */

/**
 * --------
 * WARNING: This is an extension for MediaWiki 1.7 through 1.10 only.
 * Do not use it with other versions of MediaWiki without extensive testing!
 * --------
 *
 * With the AnyWikiDraw extension it is possible to define new tags of the form
 *
 * {{#drawing:image.svg|width|height}}
 *
 * - The tag needs to be put into two curly braces.
 * - The name of the tag is #drawing:
 * - The parameter image.svg specifies the name of the image file. 
 * - If you specify an image file that does not yet exist in your Wiki, the image 
 *   is created the first time you save a drawing.
 * - The parameter width specifies the width of the image.
 * - The parameter height specifies the height of the image.
 *
 * The enable drawing for the image HappyWiki.svg, which has a width of 400 and
 * a height of 300 pixels, insert the following tag into a page:
 *
 * {{#drawing:HappyDrawing.svg|300|200}}
 *
 * To activate the extension, include it from your LocalSettings.php
 * with: include("extensions/AnyWikiDraw/AnyWikiDraw.php"); 
 *
 * @author Werner Randelshofer
 * @version $Id: AnyWikiDraw.php 127 2009-07-05 12:04:33Z rawcoder $
 */


# AnyWikiDraw Version
global $wgAnywikidrawVersion;
$wgAnyWikiDrawVersion = '0.13.2';

# Define a setup function
$wgExtensionFunctions[] = 'wfAnyWikiDrawParserFunction_Setup';

# Add a hook to initialise the magic word
$wgHooks['LanguageGetMagic'][]       = 'wfAnyWikiDrawParserFunction_Magic';

# Define a special page
$wgAutoloadClasses['AnyWikiDraw'] = dirname(__FILE__) . '/AnyWikiDraw_body.php';
$wgSpecialPages['AnyWikiDraw'] = 'AnyWikiDraw';
$wgHooks['LoadAllMessages'][] = 'wfAnyWikiDrawLoadMessages';


function wfAnyWikiDrawParserFunction_Setup() {
	global $wgParser;
	# Set a function hook associating the "drawing" magic word with our function
	$wgParser->setFunctionHook( 'drawing', 'wfAnyWikiDrawParserFunction_Render' );
}

function wfAnyWikiDrawParserFunction_Magic( &$magicWords, $langCode ) {
	# Add the magic word
	# The first array element is case sensitive, in this case it is not case sensitive
	# All remaining elements are synonyms for our parser function
	$magicWords['drawing'] = array( 0, 'drawing' );
	# unless we return true, other parser functions extensions won't get loaded.
	return true;
}

function wfAnyWikiDrawParserFunction_Render( &$parser, $name = null, $width = null, $height = null ) {
	global $wgUser, $wgLang, $wgTitle, $wgRightsText, $wgOut, $wgArticlePath, $wgScriptPath, $wgEnableUploads;
	$skin = $wgUser->getSkin();
	wfAnyWikiDrawLoadMessages();

	// Don't cache pages with drawings on it
	$parser->disableCache();
	
	# Validate parameters
	$error = '';
	if ($name == null || strlen($name) == 0) {
		$error .= '<br>Please specify a name for your drawing.';
	}
	if ($width != null && 
			(! is_numeric($width) || $width < 1 || $width > 2000)) {
		$error .= '<br>Please specify the width as a number between 1 and 2000 or leave it away.';
	}
	if ($height != null && 
			(! is_numeric($height) || $height < 1 || $height > 2000)) {
		$error .= '<br>Please specify the height as a number between 1 and 2000 or leave it away.';
	}
	if (strlen($error) > 0) {
		$error = '<b>Sorry.</b>'.$error.'<br>'.
				'Usage: <code>{{#drawing:<i>image.svg</i>|<i>width</i>||<i>height</i>}}</code><br>'.
				'Example: <code>{{#drawing:HappyDrawing.svg|400|300}}</code><br>';
		return array($error, 'isHTML'=>true, 'noparse'=>true);
	}

	# The parser function itself
	# The input parameters are wikitext with templates expanded
	# The output should be wikitext too, but in this case, it is HTML
	#return array("param1 is $param1 and param2 is $param2", 'isHTML');
	
	# Generate the image HTML as if viewed by a web request
	$image = Image::newFromName($name);
	
	
	$isProtected = $parser->getTitle()->isProtected();
	
	if ($width == null && $image->getWidth() != -1) {
			$width = $image->getWidth();
	}
	if ($height == null && $image->getHeight() != -1) {
		$height = $image->getHeight();
	}
		
	// render a header
	$output = '<table><tr><td>';
	if ($wgEnableUploads && ! $isProtected &&
			key_exists('drawingtitle', $_POST) && 
			$_POST['drawingtitle'] == $name) {
		
		// edit the drawing using the applet
        global $wgUsePathInfo;
        if ($wgUsePathInfo) {
            $downloadURL = str_replace('$1', 'Special:AnyWikiDraw?image='.htmlspecialchars($image->getName()), $wgArticlePath);
        } else {
            $downloadURL = str_replace('$1', 'Special:AnyWikiDraw&image='.htmlspecialchars($image->getName()), $wgArticlePath);
        }
        $uploadURL = str_replace('$1', 'Special:AnyWikiDraw', $wgArticlePath);
		$output .= 
				'<a name="anywikidraw" id="anywikidraw">'.
				'<applet codebase="/" archive="'.$wgScriptPath.'/extensions/AnyWikiDraw/AnyWikiDrawForMediaWiki.jar"'. 
				' code="org.anywikidraw.mediawiki.MediaWikiDrawingApplet.class"'.
				' width="'.htmlspecialchars(min(max($width+4, 600), 800)).'" '.
                ' height="'.htmlspecialchars(min(max($height+140, 480), 600)).'">'.

           // The following parameters are used to tell AnyWikiDraw how to communicate with MediaWiki:

				'<param name="DrawingName" value="'.htmlspecialchars($name).'">'.
				'<param name="DrawingWidth" value="'.htmlspecialchars($width).'">'.
				'<param name="DrawingHeight" value="'.htmlspecialchars($height).'">'.
				(($image->getURL() !== '') ? '<param name="DrawingURL" value="'.$downloadURL.'">' : '').
				'<param name="PageURL" value="'.htmlspecialchars($wgTitle->getLocalURL()).'">'.
				'<param name="UploadURL" value="'.$uploadURL.'">'.

           // The following parameters are used to configure the drawing applet: 

                '<param name="Locale" value="'.$wgUser->getOption('language','en').'"/>'.
           
           // The following parameters are used to configure Sun's Java Plug-In: 

                '<param name="codebase_lookup" value="false"/>'.
                '<param name="classloader_cache" value="false"/>'.
                '<param name="java_arguments" value="-Djnlp.packEnabled=true"/>'.
                '<param name="image" value="lib/Splash.gif"/>'.
                '<param name="boxborder" value="false"/>'.
                '<param name="centerimage" value="true"/>'.

				'</applet>'.
				'</a>';
			
		$output .= '<div style="'.
					'background-color: #C9CDD6; border: 1px solid #ccc; padding: 5px 10px 5px 10px; text-align: left; '.
					'font-size: 12px; line-height: 16px; '.
					'">'.
					wfMsg(($image->getURL() == '') ? 'anywikidraw_license_terms_new_work' : 'anywikidraw_license_terms_derived_work',
					'<a href='.wfMsgForContent('copyrightpage').'>'.wfMsg('copyrightpage').'</a>', '<a href="./Image:'.$name.'">Image:'.$name.'</a>').
					'</div>';
	} else {
		// Retrieve the page object of the image to determine, whether the user may edit it
		$filtered = preg_replace ( "/[^".Title::legalChars()."]|:/", '-', $name );
		$nt = Title::newFromText( $filtered );
		if(! is_null( $nt ) ) {
			$nt =& Title::makeTitle( NS_IMAGE, $nt->getDBkey() );
		}

        // Determine if the user has permission to edit the image
		$userCanEdit = $wgEnableUploads && 
                    !$isProtected && 
                    (is_null($nt) || $nt->userCanEdit()) &&
                    ($image->getURL() == null || $wgUser->isAllowed( 'reupload' ));

        // Determine if the user may edit images using the specified 
        // filename extension.
        if ($userCanEdit) {
            $extension = array_pop(explode( '.', $filtered ));
            global $wgFileExtensions;
            $userCanEdit = in_array($extension, $wgFileExtensions);
        }
		
		// If the user can edit the image, display an edit link.
        // We do not display the edit link, if the user is already
        // editing a drawing.
		if ($userCanEdit && ! key_exists('drawingtitle', $_POST)) {
			$formId = 'Form'.rand();
            global $wgUsePathInfo;
            if ($wgUsePathInfo) {
                $action = $wgTitle->getLocalURL().'#anywikidraw';
            } else {
                //$action = str_replace('?','#anywikidraw?',$wgTitle->getLocalURL());
                $action = $wgTitle->getLocalURL();
            }
			$output .= '<form name="'.$formId.'" method="post" action="'.$action.'">'.
					'<input type="hidden" name="drawingtitle" value="'.htmlspecialchars($name).'">'.
					'<p align="right">'.
					'[<a href="javascript:document.'.$formId.'.submit();">'.wfMsg('edit').'</a>]'.
					'<noscript><input type="submit" name="submit" value="'.wfMsg('edit').'"></input></noscript>'.
					'</p>'
					;
		}
		// render the drawing
		$image->width = $width; // FIXME This is an ugly hack to get a view URL
		$viewURL = $image->getViewURL();
		
		if ($image->getURL() == '') {
			// the drawing does not exist yet, render an empty rectangle
			$output .= '<div style="border:1px solid #000;text-align:center;'.
				(($width != null) ? 'width:'.$width.'px;' : '').
				(($height != null) ? 'height:'.$height.'px;' : '').'"'.
				'>'.htmlspecialchars($name).'</div>';
		} else if (substr($name,-4) == '.svg' && $viewURL == null) {
			// SVG images need an object tag
			$output .= '<object '.
				'type="image/svg+xml" '.
				'data="'.(($viewURL != null) ? $viewURL : $image->getURL()).'" '.
				(($width != null) ? 'width="'.$width.'" ' : '').
				(($height != null) ? 'height="'.$height.'" ' : '').
				'></object>';
		} else {
			// All other image types need an img tag
			// Render the image map, if it exists
			$thumbnail = $image->getThumbnail($width);
			$isImageMap = $thumbnail != null && file_exists($thumbnail->path.'.map');
			$mapId = 'Map'.rand();
			if ($isImageMap) {
				$output .= '<map name="'.$mapId.'">'.
					file_get_contents($thumbnail->path.'.map').
					'</map>';
			}
			// Render the image
			if (! $isImageMap) {
				$output .= '<a href="./Image:'.$name.'">';
			}
            // Note: We append the timestamp of the image to the
            //       view URL as a query string. This way, we ensure,
            //       that the browser always displays the last edited version
            //       of the image
			$output .= '<img '.
				'src="'.(($viewURL != null) ? $viewURL : $image->getURL()).
                    '?version='.$image->nextHistoryLine()->img_timestamp.'" '.
				(($width != null) ? 'width="'.$width.'" ' : '').
				(($height != null) ? 'height="'.$height.'" ' : '').
				'alt="Image:'.$name.'" '.
				'title="Image:'.$name.'" '.
				(($isImageMap) ? 'usemap="#'.$mapId.'" ' : '').
				'></img>';
			if (! $isImageMap) {
				$output .= '</a>';
			}
		}
		// If the user can edit the image, display an edit link.
        // We do not display the edit link, if the user is already
        // editing a drawing.
		if ($userCanEdit && ! key_exists('drawingtitle', $_POST)) {
			$output .= '</form>';
		}
	}
	
	// render a footer
	$output .= '</tr></td></table>';
	
	return array($output, 'isHTML'=>true, 'noparse'=>true);
}

function wfAnyWikiDrawLoadMessages() {
		global $wgAnyWikiDrawMessagesLoaded;
		global $wgMessageCache;
		if ( $wgAnyWikiDrawMessagesLoaded ) return;
		$wgAnyWikiDrawMessagesLoaded = true;

		require( dirname( __FILE__ ) . '/AnyWikiDraw.i18n.php' );
		foreach ( $messages as $lang => $msgs ) {
				$wgMessageCache->addMessages( $msgs, $lang );
		}
}
?>