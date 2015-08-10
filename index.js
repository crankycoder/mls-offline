var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
      include: "*",
      contentScriptWhen: "start",
      contentScriptFile: [data.url("geo-script.js"),
                          data.url("customWifi.js")],
      contentScriptOptions: {
          showOptions: true
      }
});
