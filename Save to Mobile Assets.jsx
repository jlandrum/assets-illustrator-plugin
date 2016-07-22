/**
* Remixer 1: @herkulano (http://www.herkulano.com)
* Remixer 2: @hotappsfactory (http://www.hotappsfactory.com)
* Thanks to: Niels Bosma (niels.bosma@motorola.com)
*/

var folder;
var document;
var prefs = app.preferences;

if (documents.length == 0) {
	alert("You must be working within an active document.");
} else {
	showDialog();
}

function showDialog() {
	document = app.activeDocument;

	/* Create window */
	windowResource = "palette {  \
	    orientation: 'column', \
	    alignChildren: ['fill', 'top'],  \
	    preferredSize:[300, 130], \
	    text: 'Artboards to Assets V1.0b by James Landrum',  \
	    active: true, \
	    type: 'dialog', \
	    margins:15, \
	    \
	    activePanelsTitle: StaticText { \
	    	text: 'Panels to Include' \
	    }\
	    activePanels: ListBox { \
	    	preferredSize:[300, 80], \
	    	enabled: true, \
            properties: { multiselect: true} \
	    } \
	    res: Checkbox { text:'Include Restricted in Compile', value: false } \
	    androidTitle: StaticText { \
	    	text: '[Export Targets for Android]' \
	    }\
	    targetGroup: Group{ \
	    	orientation: 'column', \
	    	alignChildren: 'left', \
	    	spacing: 2, \
		cd0: Checkbox { text:'SVG', value: "+prefs.getBooleanPreference("stmaCD0")+" }, \
	        cd1: Checkbox { text:'Low DPI (ldpi) (0.75x)', value: "+prefs.getBooleanPreference("stmaCD1")+" }, \
	        cd2: Checkbox { text:'Medium DPI (mdpi) (1x)', value: "+prefs.getBooleanPreference("stmaCD2")+" }, \
	        cd3: Checkbox { text:'TV DPI (tvdpi) (1.33x)', value: "+prefs.getBooleanPreference("stmaCD3")+" }, \
	        cd4: Checkbox { text:'High DPI (hdpi) (1.5x)', value: "+prefs.getBooleanPreference("stmaCD4")+" }, \
	        cd5: Checkbox { text:'Extra High DPI (xhdpi) (2x)', value: "+prefs.getBooleanPreference("stmaCD5")+" }, \
	        cd6: Checkbox { text:'Extra Extra High DPI (xxhdpi) (3x)', value: "+prefs.getBooleanPreference("stmaCD6")+" }, \
	        cd7: Checkbox { text:'4K DPI (xxxhdpi) (4x)', value: "+prefs.getBooleanPreference("stmaCD7")+" } \
	    }\
	    iOSTitle: StaticText { \
	    	text: '[Export Targets for iOS]' \
	    }\
	    targetGroupiOS: Group{ \
	    	orientation: 'column', \
	    	alignChildren: 'left', \
	    	spacing: 2, \
	        cd1: Checkbox { text:'Standard DPI (1x)', value: "+prefs.getBooleanPreference("stmiCD1")+" }, \
	        cd2: Checkbox { text:'Retina DPI (2x)', value: "+prefs.getBooleanPreference("stmiCD2")+" } \
	        cd3: Checkbox { text:'Retina (iPhone 6+)', value: "+prefs.getBooleanPreference("stmiCD3")+" } \
	        iosMod: Group{\
	        	margins: 5, \
	        	cd3s: RadioButton { text: '2.68x', value: "+!prefs.getBooleanPreference("stmiCD3T")+" } \
	        	cd3l: RadioButton { text: '3.00x', value: "+prefs.getBooleanPreference("stmiCD3T")+" } \
	        }\
	    }\
	    specialTitle: StaticText { \
	    	text: '[Special Exports]' \
	    }\
	    targetGroupSpecial: Group{ \
	    	orientation: 'column', \
	    	alignChildren: 'left', \
	    	spacing: 2, \
	        cd1: Checkbox { text:'Android: NoDPI (1.00x)', value: "+prefs.getBooleanPreference("stmmNoDpi")+" }, \
	    }\
	    bottomGroup: Group{ \
	        cancelButton: Button { text: 'Cancel', properties:{name:'cancel'}, size: [120,24], alignment:['right', 'center'] }, \
	        applyButton: Button { text: 'Generate', properties:{name:'ok'}, size: [120,24], alignment:['right', 'center'] }, \
	    }\
	}"
	 
	win = new Window(windowResource);

	win.bottomGroup.cancelButton.onClick = function() {
	  return win.close();
	};

	win.bottomGroup.applyButton.onClick = function() {
		folder = Folder.selectDialog();
		if (document && folder) {
			win.enabled = false;
			var documentName = document.name.replace(".ai","");
			if (win.targetGroup.cd0.value) saveToRes(100, "drawable","",true,"SVG");
			if (win.targetGroup.cd1.value) saveToRes(75,  "drawable-ldpi", "", true,"PNG");		
			if (win.targetGroup.cd2.value) saveToRes(100, "drawable-mdpi", "",true,"PNG");		
			if (win.targetGroup.cd3.value) saveToRes(133, "drawable-tvdpi", "", true,"PNG");		
			if (win.targetGroup.cd4.value) saveToRes(150, "drawable-hdpi", "", true,"PNG");		
			if (win.targetGroup.cd5.value) saveToRes(200, "drawable-xhdpi", "", true,"PNG");		
			if (win.targetGroup.cd6.value) saveToRes(300, "drawable-xxhdpi", "", true,"PNG");		
			if (win.targetGroup.cd7.value) saveToRes(400, "drawable-xxxdpi", "", true,"PNG");
			if (win.targetGroupiOS.cd1.value) saveToRes(100, "iOS",  "", false, "PNG");		
			if (win.targetGroupiOS.cd2.value) saveToRes(200, "iOS", "@2x", false, "PNG");			
			if (win.targetGroupiOS.cd3.value) saveToRes(win.targetGroupiOS.iosMod.cd3l.value?300:268, "iOS", "@3x", false, "PNG");			
			if (win.targetGroupSpecial.cd1.value) saveToRes(100, "drawable-nodpi", "", true, "PNG");			

			prefs.setBooleanPreference("stmaCD0",win.targetGroup.cd0.value);
			prefs.setBooleanPreference("stmaCD1",win.targetGroup.cd1.value);				
			prefs.setBooleanPreference("stmaCD2",win.targetGroup.cd2.value);				
			prefs.setBooleanPreference("stmaCD3",win.targetGroup.cd3.value);				
			prefs.setBooleanPreference("stmaCD4",win.targetGroup.cd4.value);				
			prefs.setBooleanPreference("stmaCD5",win.targetGroup.cd5.value);				
			prefs.setBooleanPreference("stmaCD6",win.targetGroup.cd6.value);				
			prefs.setBooleanPreference("stmaCD7",win.targetGroup.cd7.value);				
			prefs.setBooleanPreference("stmiCD1",win.targetGroupiOS.cd1.value);				
			prefs.setBooleanPreference("stmiCD2",win.targetGroupiOS.cd2.value);				
			prefs.setBooleanPreference("stmiCD3",win.targetGroupiOS.cd3.value);				
			prefs.setBooleanPreference("stmiCD3T",win.targetGroupiOS.iosMod.cd3l.value);

			prefs.setBooleanPreference("stmmNoDpi",win.targetGroupSpecial.cd1.value);

			alert("Assets successfully generated.");
			return win.close();
		}		
		folder = null;
	};

	// Add panels to list.
	for (i = document.artboards.length - 1; i >= 0; i--) {		
		document.artboards.setActiveArtboardIndex(i);
		ab = document.artboards[i];
		if (ab.name.indexOf("*") > -1) { 
			var listItem = win.activePanels.add("item",ab.name.replace("*","")+" (Restricted)");
		} else {
			var listItem = win.activePanels.add("item",ab.name);
		}
	}

	win.show();
}

/**
* Scale and export file suffixed by densitySuffix, in a specific folder named folderName
*/
function saveToRes(scaleTo, folderName, append, lowerCase, type) {
	var i, ab, file, options;
		
	var myFolder = new Folder(folder.absoluteURI + "/" + folderName);
	if(!myFolder.exists) myFolder.create();
	
	// Ensure only printable layers will be used
	for (i = 0; i < document.layers.length; i++) {
		document.layers[i].locked = !document.layers[i].printable;
	}

    var items = [];
    if (win.activePanels.selection.length > 0) {
        items = String(win.activePanels.selection).split(',');
    }
    
	for (i = document.artboards.length - 1; i >= 0; i--) {
		document.artboards.setActiveArtboardIndex(i);
		ab = document.artboards[i];
		document.selectObjectsOnActiveArtboard();
		
        if (items.length > 0 && indexOf(items,ab.name) == -1) {
            continue;    
        }
		if (ab.name.indexOf("*") > -1 && !win.res.value) { 
			continue;
		}

		var fileName = ab.name.replace("*","");
		
		if(lowerCase){
			var fileNameLowerCase = "";			
			for (var j = 0; j < fileName.length; j++) {
				var c = fileName.charAt(j).toLowerCase();
				if (c == '-') c = "_";
				fileNameLowerCase += c
			}
			fileName = fileNameLowerCase;
		}
	        
		if (type == "PNG") {
			file = new File(myFolder.fsName + "/" + fileName + append + ".png");
		
			options = new ExportOptionsPNG24();
			options.antiAliasing = true;
			options.transparency = true;
			options.artBoardClipping = true;
			options.verticalScale = scaleTo;
			options.horizontalScale = scaleTo;
		
             
			document.exportFile(file, ExportType.PNG24, options);
		} else if (type = "SVG") {
			file = new File(myFolder.fsName + "/" + fileName + append + ".svg");
		
			var doc = document;
			var preset = new DocumentPreset();
			var leftOff = ab.artboardRect[0];
			var topOff = ab.artboardRect[1];
            
			preset.width = Math.abs(ab.artboardRect[2] - ab.artboardRect[0]);
			preset.height = Math.abs(ab.artboardRect[1] - ab.artboardRect[3]);
			preset.colorMode = document.documentColorSpace;
			preset.units = document.rulerUnits;
			var copyDoc = app.documents.addDocument(document.documentColorSpace, preset);
 
			copyDoc.activate();

			leftOff -= copyDoc.artboards[0].artboardRect[0];
			topOff -= copyDoc.artboards[0].artboardRect[1];

			doc.activate();

			for (var j = 0; j < selection.length; j++) {
				var item = selection[j].duplicate(copyDoc.layers[0], ElementPlacement.INSIDE);
				item.left += leftOff;
				item.top += topOff;
			}
			
			options = new ExportOptionsSVG();
			copyDoc.exportFile(file, ExportType.SVG, options);
			copyDoc.close(SaveOptions.DONOTSAVECHANGES);
		}
	}
}

function indexOf(array, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == value) return i;
    }
    return -1;
}

function isUpperCase(myString) { 
      return (myString == myString.toUpperCase()); 
} 

