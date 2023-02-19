// Function | Localize HTML Page
function localizeHtmlPage() {
  //Localize by replacing __MSG_***__ meta tags
  var objects = document.getElementsByTagName('html');
  for (var j = 0; j < objects.length; j++) {
    var obj = objects[j];

    var valStrH = obj.innerHTML.toString();
    var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
      return v1 ? chrome.i18n.getMessage(v1) : "";
    });

    if (valNewH != valStrH) {
      obj.innerHTML = valNewH;
    }
  }
}

// This will replace all the __MSG_***__ tags in all HTML pages, and perform the translation
localizeHtmlPage();

chrome.storage.sync.get(["debug"]).then((result) => {
  if (result.debug) {
    show_debug()
  } else {
    hide_debug()
  }
});

// Function | Load and set value of all settings fields
function loadModuleStatus() {
  chrome.storage.sync.get(moduleNames, (result) => {
    for (const moduleName of moduleNames) {
      const moduleValue = result[moduleName];

      switch (moduleValue) {
        case undefined:
          document.getElementById(moduleName).innerHTML = chrome.i18n.getMessage('disabled');
          document.getElementById(moduleName).style.color = '#d53948';
          break;
        case true:
          document.getElementById(moduleName).innerHTML = chrome.i18n.getMessage('enabled');
          document.getElementById(moduleName).style.color = '#26a644';
          break;
        case false:
          document.getElementById(moduleName).innerHTML = chrome.i18n.getMessage('disabled');
          document.getElementById(moduleName).style.color = '#d53948';
          break;
      }
    }
  });
};

// Load and set value of all settings fields
loadModuleStatus()


// Enable debug mode after clicking on the logo 5 times
var counter = 0;

document.getElementById('logo').addEventListener('click', function () {
  counter++;
  if (counter === 10) {
    debugLoad = chrome.storage.sync.get(["debug"]).then((result) => {
      if (!result.debug) {
        show_debug();
      } else {
        hide_debug();
      }
      chrome.storage.sync.set({ "debug": !result.debug });
      counter = 0;
    })
  }
});