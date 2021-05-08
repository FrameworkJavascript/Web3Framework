/*
	Framework.js r2 | (c) 2014 - 2019 Plasnerd | http://framework.js.org/LICENSE.md
*/

if(!window.zeroPage) {
	zeroFrame = new ZeroFrame();
	zeroPage = new ZeroPage(zeroFrame);
}

var body = document.getElementsByTagName("BODY")[0];

/*Show features only for ZeroNet or only for clearnet*/

if (document.location.href.indexOf("wrapper_nonce") > 0) zeronet();
else clearnet();

/*if (document.location.href.indexOf("wrapper_nonce") < 0) clearnet();*/
/*else clearnet();*/

// Returns the page location type
// 0 (falsey) = Local file, direct from disk (file://path/to/file.html)
// 1 (truthy) = Virtually remote file, from local server (http://localhost)
// 2 (truthy) = Remote file from remote server (http://example.com)

// function locationType(){
//     if( window.location.protocol == 'file:' ){ return 0; }
//     if( !window.location.host.replace( /localhost|127\.0\.0\.1/i, '' ) ){ return 2; // }
//    return 1;
// }

// function locationType(0) {
// localfile();
// clearnet();
// }

// function locationType(1) {
// localhost();
// clearnet();
// }

// function locationType(2) {
// www();
// clearnet();
// }

function clearnet() {
body.innerHTML = '<style>zeronet{display:none}</style>' + body.innerHTML;
}

function zeronet() {
body.innerHTML = '<style>clearnet{display:none}</style>' + body.innerHTML;
}

/*ZeroNet: Get hash links working (for endnotes, etc.)*/
/* To do: work only on ZeroNet */
var elements = document.querySelectorAll('a[href^="#"]');
for (var i = 0; i < elements.length; i++) {
    var hash = elements[i].hash;
    elements[i].href = window.location.pathname + hash;
}

/*ZeroNet: Clones FrameworkJS and opens your own project*/
function clone() {
    return zeroPage.getSiteInfo().then(function(siteInfo){zeroPage.cmd("siteClone", [siteInfo.address])});
}
/* For implementing custom clone functions for ZeroNet: open and edit page-custom.js */


/* WIP - Tell user if a specific ZeroNet plugin is missing
if((await zeroPage.cmd("serverInfo")).plugins.indexOf("NoPlugin") === -1) { body.insertAdjacentHTML("afterbegin", "<element></element>")}; WIP */


/*Detect ZeroNet theme and apply the style according to it*/
zeroFrame.cmd("serverInfo", {}, (server_info) => {
    // Print server_info to the console
    console.log("Server info:", server_info)

    // Retrieve the document body
    const body = document.body
	
    // Check user_settings exists
    if (!server_info.user_settings) {
        // Exit this function if it doesn't
        return
    }

    // Depending on user theme settings, set the theme
    switch(server_info.user_settings.theme) {
    case "light":
        body.innerHTML += ''
        break
    case "dark":
        body.innerHTML += '<link rel="stylesheet" type="text/css" href="css/dark-common.css"><link rel="stylesheet" type="text/css" href="css/dark-custom.css">'
        break
    default:
        console.log("Theming not supported. Please upgrade your ZeroNet version.")
    }
})