Adobe-Export-Scripts
====================
###
License: [MIT][1]  
Blame: Chris DeLuca & Sean Orelli
###

Photoshop and Illustrator scripts. These scripts have been tested with Illustrator CS4/5 and Photoshop CS5.

There are two Illustrator scripts:
* Export PNGs from groups
* Export layout coordinates

![Illustrator script code screenshot](http://hypnotictoast.com/images/illustraitor_scripts_screenshot.png)

The PNG export differs from other export scripts I have found in that it exports groups only, instead of all elements. This way you can group all the PNGs you want exported. The script will only use the top level group (so it won't export nested groups) and trims the PNG with as little white space as possible.

The export layout script is possibly more interesting. It exports the coordinates of all elements on the stage in valid JSON format. This can be interpreted by other code to lay out the contents of a screen, forming a working pipeline between the art department and programming. Ultimately, this is one piece in an automated process using a build server.

The Photoshop script is very young, and needs an overhaul to compete with the Illustrator scripts.

Installation
--------------------
1.  Copy script to
    * *Mac:* '~/Applications/Adobe Illustrator CS#/Presets/en\_US/Scripts/'
    * *Win:* 'C:\Program Files\Adobe\Adobe Illustrator CS#\Presets\en\_US\Scripts\'
2.  Restart Illustrator or Photoshop
3.  Choose `File > Scripts > [Name of Script]`

[1]:http://www.opensource.org/licenses/MIT
