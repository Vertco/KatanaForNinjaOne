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

// Function | Load and set value of all settings fields
function reloadfields() {
  chrome.storage.sync.get(["button_text", "webhook_url", "warning_text"]).then((result) => {
    for (var [key, value] of Object.entries(result)) {
      if (value != undefined) {
        document.getElementById(key).value = value;
      }
    }
  });
  chrome.storage.sync.get(["theme_module", "trigger_module"]).then((result) => {
    theme_module_enabled = result.theme_module;
    trigger_module_enabled = result.trigger_module;
  });
};

// Load and set value of all settings fields
reloadfields()

// Function | Show notification
function show_notification(message, color) {
  // Get the element to display the notification
  const notificationElement = document.querySelector('.notification');

  // Update the content of the element
  notificationElement.innerHTML = message;

  // Show the notification
  notificationElement.style.display = 'block';
  notificationElement.style.backgroundColor = color;
}

// Function | Hide notification
function hide_notification() {
  // Get the element to hide
  const notificationElement = document.querySelector('.notification');

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

// Save data when clicking on save button
document.getElementById('save_button').addEventListener('click', function () {
  chrome.storage.sync.set({
    button_text: document.getElementById("button_text").value,
    warning_text: document.getElementById("warning_text").value,
    webhook_url: document.getElementById("webhook_url").value
  }).then(() => {
    console.debug("Saved settings");
    show_notification(chrome.i18n.getMessage("NOT_saved"), "#337ab7")
    setTimeout(hide_notification, 1500);
  });
});

// Import data from JSON
var fileInput = document.getElementById('import_button');
fileInput.addEventListener('change', () => {
  var file = fileInput.files[0];
  var reader = new FileReader();
  reader.onload = function () {
    var settings = JSON.parse(this.result);
    chrome.storage.sync.set(settings, () => {
      console.debug("Settings saved");
      console.debug(settings)
    });
    reloadfields();
  };
  reader.readAsText(file);
  console.debug("Imported and saved settings");
  show_notification(chrome.i18n.getMessage("NOT_importSaved"), "#337ab7");
  setTimeout(hide_notification, 1500);
});

// Export data to JSON
document.getElementById("export_button").addEventListener('click', function () {
  exportSettings();
  show_notification(chrome.i18n.getMessage("NOT_export"));
  setTimeout(hide_notification, 1500);
});