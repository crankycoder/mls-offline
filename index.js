var self = require('sdk/self');
var data = require("sdk/self").data;
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
var pageMod = require("sdk/page-mod");

var button = buttons.ActionButton({
    id: "mozilla-link",
    label: "Visit Mozilla",
    icon: {
        "16": "./icon-16.png",
        "32": "./icon-32.png",
        "64": "./icon-64.png"
    },
    onClick: handleClick
});


var pageMod = require("sdk/page-mod");
pageMod.PageMod({
      include: "*",
      contentScriptWhen: "start",
      contentScriptFile: data.url("geo-script.js"),
      contentScriptOptions: {
          showOptions: true
      }
});


function handleClick(state) {
    var worker = tabs.activeTab.attach({
        contentScriptFile: self.data.url("my-script.js")
    });

    /*
     * TODO: we want to toggle the 'enabled' state of this addon and
     * save it persistently.
     *
     * TODO: we want to clobber
     * navigator.geolocation.getCurrentPosition
     */
    worker.port.emit("drawBorder", "red");
}

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;
