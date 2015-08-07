var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
pageMod.PageMod({
      include: "*",
      contentScriptWhen: "start",
      contentScriptFile: data.url("geo-script.js"),
      contentScriptOptions: {
          showOptions: true
      }
});
