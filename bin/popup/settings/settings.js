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

// Function | Load debug settings
chrome.storage.sync.get(["debug"]).then((result) => {
  if (result.debug) {
    show_debug()
  } else {
    hide_debug()
  }
});

// Save data when clicking on save button
document.getElementById('save_button').addEventListener('click', function () {
  chrome.storage.sync.set({
    themeModule: document.getElementById("themeModule").checked,
    triggerModule: document.getElementById("triggerModule").checked,
    buttonText: document.getElementById("buttonText").value,
    warningText: document.getElementById("warningText").value,
    webhookUrl: document.getElementById("webhookUrl").value
  }).then(() => {
    loadSettings();
    console.debug("Saved settings");
    show_notification(chrome.i18n.getMessage("NOT_saved"), "#337ab7", "#fff")
    setTimeout(hide_notification, 1500);
  });
});

// Function | Load and set value of all settings fields
function loadSettings() {
  // set module checkboxes
  chrome.storage.sync.get(moduleNames, (result) => {
    for (const moduleName of moduleNames) {
      const moduleValue = result[moduleName];
      switch (moduleValue) {
        case undefined:
          document.getElementById(moduleName).checked = false;
          break;
        case true:
          document.getElementById(moduleName).checked = true;
          break;
        case false:
          document.getElementById(moduleName).checked = false;
          break;
      }
    }
  });
  chrome.storage.sync.get(["buttonText", "webhookUrl", "warningText"]).then((result) => {
    for (var [key, value] of Object.entries(result)) {
      if (value != undefined) {
        document.getElementById(key).value = value;
      }
    }
  });
  chrome.storage.sync.get(['triggerModule'], function (result) {
    const triggerSettings = document.getElementById('triggerSettings');
    if (result.triggerModule === true) {
      triggerSettings.style.display = 'block';
    } else {
      triggerSettings.style.display = 'none';
    }
  });
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

// Function | Load defaults
function loadDefaults() {
  chrome.storage.sync.clear(function () {
    const defaultSettings = {
      themeModule: true,
      triggerModule: true,
      theme: 0,
      buttonText: 'Button',
      warningText: 'Send HTTP request for',
      webhookUrl: 'https://example.com/api/webhook',
      debug: false
    };
    chrome.storage.sync.get(Object.keys(defaultSettings), function (result) {
      let settingsUpdated = false;
      for (const setting in defaultSettings) {
        if (typeof result[setting] === 'undefined') {
          result[setting] = defaultSettings[setting];
          settingsUpdated = true;
        }
      }
      if (settingsUpdated) {
        chrome.storage.sync.set(result, function () {
          loadSettings()
        });

      }
    });
  });
};

// Load and set value of all settings fields
loadSettings()

// Import data from JSON
document.getElementById('import_button').addEventListener('change', () => {
  var file = fileInput.files[0];
  var reader = new FileReader();
  reader.onload = function () {
    var settings = JSON.parse(this.result);
    chrome.storage.sync.set(settings, () => {
      console.debug("Settings saved");
      console.debug(settings)
    });
    loadSettings();
  };
  reader.readAsText(file);
  console.debug("Imported and saved settings");
  show_notification(chrome.i18n.getMessage("NOT_importSaved"), "#337ab7", "#fff");
  setTimeout(hide_notification, 1500);
});

// Export data to JSON
document.getElementById("export_button").addEventListener('click', function () {
  exportSettings();
  show_notification(chrome.i18n.getMessage("NOT_export"), "#337ab7", "#fff");
  setTimeout(hide_notification, 1500);
});

// Load extension defaults
document.getElementById('defaults_button').addEventListener('click', function () {
  chrome.storage.sync.clear(function () {
    loadDefaults();
    loadSettings();
    show_notification(chrome.i18n.getMessage("NOT_defaults"), '#fac905', '#3b3b3b');
    setTimeout(hide_notification, 1500);
  })
});

// Toggle triggerSettings on checkbox toggle
document.getElementById('triggerModule').addEventListener('click', function () {
  const triggerSettings = document.getElementById('triggerSettings');
  var triggerChecked = document.getElementById("triggerModule").checked;
  if (triggerChecked == true) {
    triggerSettings.style.display = 'block';
  } else {
    triggerSettings.style.display = 'none';
  }
});

// Hide notification when clicked on
document.getElementById('notification').addEventListener('click', function () {
  hide_notification()
});