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
  const moduleNames = ["theme_module", "trigger_module"];

  chrome.storage.sync.get(moduleNames, (result) => {
    for (const moduleName of moduleNames) {
      const moduleValue = result[moduleName];

      switch (moduleValue) {
        case undefined:
          document.getElementById(moduleName).innerHTML = 'Disabled';
          document.getElementById(moduleName).style.color = '#d53948';
          break;
        case true:
          document.getElementById(moduleName).innerHTML = 'Enabled';
          document.getElementById(moduleName).style.color = '#26a644';
          break;
        case false:
          document.getElementById(moduleName).innerHTML = 'Disabled';
          document.getElementById(moduleName).style.color = '#d53948';
          break;
      }
    }
  });
};

/*
function loadModuleStatus() {
  chrome.storage.sync.get(["theme_module", "trigger_module"]).then((result) => {
      for (var [key, value] of Object.entries(result)) {
        const keyElement = document.getElementById(key);
        if (value != undefined) {
          keyElement.innerHTML = "Disabled"
        } else {
          keyElement.innerHTML = value
        }
      }
  });
};
*/

// Function | Show notification
function show_notification(message, color) {
  // Get the element to display the notification
  const notificationElement = document.getElementById('notification');

  // Update the content of the element
  notificationElement.innerHTML = message;

  // Show the notification
  notificationElement.style.display = 'block';
  notificationElement.style.backgroundColor = color;
}

// Function | Hide notification
function hide_notification() {
  // Get the element to hide
  const notificationElement = document.getElementById('notification');

  // Hide the element
  notificationElement.style.display = 'none';
}

// Function | Show debug
function show_debug() {
  console.debug('Show debug');
  document.body.style.backgroundColor = "#e74856";
};

// Function | Hide debug
function hide_debug() {
  console.debug('Hide debug');
  document.body.style.backgroundColor = "inherit";
};

// Function | Export settings
function exportSettings() {
  chrome.storage.sync.get(null, (settings) => {
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(settings, null, 2));
    var a = document.createElement('a');
    a.href = 'data:' + data;
    a.download = 'settings.json';
    a.innerHTML = 'download JSON';
    a.click();
  });
}

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