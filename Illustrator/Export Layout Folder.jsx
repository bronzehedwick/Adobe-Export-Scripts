// Export Layout Folder - Adobe Illustrator Script
// Description: Runs Export Layout on the contents of a folder
// Requirements: Adobe Illustrator CS4 or greater
// Version: 1.0-beta1
// ===============================================================================
// Installation:
// 1. Place script in
//        Mac: '~/Applications/Adobe Illustrator CS#/Presets/Scripts/'
//        Win: 'C:\Program Files\Adobe\Adobe Illustrator CS#\Presets\en_US\Scripts\'
// 2. Restart Illustrator
// 3. Choose File > Scripts > Export Layout Folder
// ===============================================================================
/*

    This script runs the Export Layout script on all ai and eps files in a folder.
    Export Layout must be installed (as above) for this script to function.

*/

/*_______________________________
  Enables double-click launching from
  the Mac Finder or Windows Explorer
_______________________________*/
#target illustrator

/*________________

      Detect OS
_________________*/
var os;
if ( $.os.search(/windows/i) !== -1 ) {
  os = "Windows"
}
else {
  os = "Macintosh"
}

/*_______________

    Set path to script
_______________*/
if ( os === "Windows" ) {
  var scriptsPath = app.path + "/Presets/en_US/Scripts/Export%20Layout.jsx";
}
else {
  var scriptsPath = app.path + "/Presets.localized/en_US/Scripts/Export%20Layout.jsx";
}

var scriptFile = File(scriptsPath);
var script;
var docRef;

/*__________________________

  Load the Export Layout script
__________________________*/
function executeScript() {
  scriptFile.open('r');
  script = scriptFile.read();
  scriptFile.close();

  eval(script);
}

/*_________________________

    Traverse files in selected folder
_________________________*/
function traverseFiles() {
  for ( var i = 0; i < fileList.length; i++ ) {
    openFile(fileList[i]);
  }
}

/*__________________________

  Open the file and process it
__________________________*/
function openFile(filename) {
  docRef = app.open(filename);
  executeScript();
  docRef.close(SaveOptions.DONOTSAVECHANGES);
}

/*_____________________________

  Check if Export Layout is installed,
    then run functions
______________________________*/
if ( scriptFile.exists === true ) {
  var inputFolder = Folder.selectDialog( "Please select top level folder to process");

  var fileList = inputFolder.getFiles("*.eps");
  traverseFiles();

  var fileList = inputFolder.getFiles("*.ai");
  traverseFiles();
}
else {
  alert("Export Layout is not installed!\n\nPlease copy Export Layout.jsx into\n\n" + scriptsPath + "\n\nand run this script again", "Script not installed");
}

