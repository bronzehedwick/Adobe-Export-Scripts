// Export Layer Coordinates - Adobe Photoshop Script
// Description: Export x and y coordinates to comma seperated .txt file
// Requirements: Adobe Photoshop CS5 (have not tested on CS4)
// Version: 1.0-beta1.1, 8/31/2011
// Author: Chris DeLuca
// Company: Playmatics
// ===============================================================================
// Installation:
// 1. Place script in
//        Mac: '~/Applications/Adobe Photoshop CS#/Presets/Scripts/'
//        Win: 'C:\Program Files\Adobe\Adobe Photoshop CS#\Presets\Scripts\'
// 2. Restart Photoshop
// 3. Choose File > Scripts > Export Layer Coordinates Photoshop
// ===============================================================================

// Enables double-click launching from the Mac Finder or Windows Explorer
#target photoshop

// Bring application forward
app.bringToFront();

// Set active Document variable and decode name for output
var docRef = app.activeDocument;
var docName = decodeURI(activeDocument.name);

// Define pixels as unit of measurement
var defaultRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;

// Define variable for the number of layers in the active document
var layerNum = app.activeDocument.artLayers.length;

// Define variable for the active layer in the active document
var layerRef = app.activeDocument.activeLayer;

// Define varibles for x and y of layers
var x = layerRef.bounds[0].value;
var y = layerRef.bounds[1].value;
var coords = "";

// Loop to iterate through all layers
function recurseLayers(currLayers) {
  for ( var i = 0; i < currLayers.layers.length; i++ ) {
    layerRef = currLayers.layers[i];
    x = layerRef.bounds[0].value;
    y = layerRef.bounds[1].value;
    coords += layerRef.name + "," + x + "," + y + "\n";

    //test if it's a layer set
    if ( isLayerSet(currLayers.layers[i]) ) {
      recurseLayers(currLayers.layers[i]);
    }
  }
}

//a test for a layer set
function isLayerSet(layer) {
  try {
    if ( layer.layers.length > 0 ) {
      return true;
    }
  }

  catch(err) {
    return false;
  }
}

// Ask the user for the folder to export to
var FPath = Folder.selectDialog("Save exported coordinates to");

// Detect line feed type
if ( $.os.search(/windows/i) !== -1 ) {
  fileLineFeed = "Windows";
}
else {
  fileLineFeed = "Macintosh";
}

// Export to txt file
function writeFile(info) {
  try {
    var f = new File(FPath + "/" + docName + ".txt");
    f.remove();
    f.open('a');
    f.lineFeed = fileLineFeed;
    f.write(info);
    f.close();
  }
  catch(e){}
}

// Run the functions
recurseLayers(docRef);
preferences.rulerUnits = defaultRulerUnits; // Set preferences back to user 's defaults
writeFile(coords);

// Show results
if ( FPath == null ) {
  alert("Export aborted", "Canceled");
}
else {
  alert("Exported " + layerNum + " layer's coordinates to " + FPath + "/" + docName + ".txt " + "using " + fileLineFeed + " line feeds.", "Success!");
}

