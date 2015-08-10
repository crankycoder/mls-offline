var self = require("sdk/self");
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");

var {Cc, Ci, Cu, Cr, Cm, components} = require("chrome");

var page = pageMod.PageMod({
    include: "*",
    contentScriptWhen: "start",
    contentScriptFile: [data.url("geo-script.js"),
    data.url("customWifi.js")],
    contentScriptOptions: {
        showOptions: true
    },
    onAttach: function(worker) {

                  worker.port.on("check_chrome_bits", function(addonMessage) {
                      console.log("Addon received message: ["+addonMessage+"]");

                      function showLoadedModules() {
                          console.log("Loaded some chrome components: " + Cc);
                          console.log("Loaded some chrome components: " + Ci);
                          console.log("Loaded some chrome components: " + Cu);
                          console.log("Loaded some chrome components: " + Cr);
                          console.log("Loaded some chrome components: " + Cm);
                          console.log("Loaded some chrome components: " + components);
                      }

                      showLoadedModules();
                  });
              }
});



function doWifiScan() {
    // TODO: implement the nsIWifiListener interface, register
    // against the WifiScanner and then initiate a scan to
    // grab BSSIDs.  Note that some scans (the majority
    // apparently) will yield empty BSSID lists.  The gecko
    // cached location code does something reasonably smartish
    // here.

    var count = 0;

    function test() {
    }

    test.prototype =
    {
        onChange: function (accessPoints)
        {
            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

            console.log("Start access point list....");
            var macList = "";
            for (var i=0; i < accessPoints.length; i++) {
                var a = accessPoints[i];
                console.log("Got MAC: ["+a.mac+"]");
                macList += " " + a.mac;
            }
            console.log("End access point list....");
            alert("Got mac addresses : ["+macList+"]");
        },

        onError: function (value) {
                     alert("error: " +value);
                 },

        QueryInterface: function(iid) {
                            netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');
                            if (iid.equals(Components.interfaces.nsIWifiListener) ||
                                    iid.equals(Components.interfaces.nsISupports)) {
                                return this;
                            }
                            throw Components.results.NS_ERROR_NO_INTERFACE;
                        },
    }

    netscape.security.PrivilegeManager.enablePrivilege('UniversalXPConnect');

    var listener = new test();
    var wifi_service = Components.classes["@mozilla.org/wifi/monitor;1"].getService(Components.interfaces.nsIWifiMonitor);

    wifi_service.startWatching(listener);
    console.log("wifi monitor is hooked!");

}
