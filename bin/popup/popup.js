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
};

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
  const body = document.querySelector(".wrapper");
  body.style.border = "10px solid #d53948"
};

// Function | Hide debug
function hide_debug() {
  const body = document.querySelector(".wrapper");
  body.style.border = ""
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
reloadfields()

// Enable debug mode after clicking on the logo 5 times
var counter = 0;

document.querySelector('.logo').addEventListener('click', function () {
  counter++;
  if (counter === 10) {
    debugLoad = chrome.storage.sync.get(["debug"]).then((result) => {
      if (!result.debug) {
        show_debug()
      } else {
        hide_debug()
      }
      chrome.storage.sync.set({ "debug": !result.debug });
      counter = 0;
    })
  }
});

// Save data when clicking on save button
document.querySelector('.save_button').addEventListener('click', function () {
  chrome.storage.sync.set({
    button_text: document.getElementById("button_text").value,
    warning_text: document.getElementById("warning_text").value,
    webhook_url: document.getElementById("webhook_url").value
  }).then(() => {
    console.debug("Saved settings");
    show_notification("Saved settings", "#337ab7")
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
      console.debug('Settings saved');
      console.debug(settings)
    });
    reloadfields();
  };
  reader.readAsText(file);
  console.debug("Imported and saved settings");
  show_notification("Imported and saved settings", "#337ab7");
  setTimeout(hide_notification, 1500);
});

// Export data to JSON
document.getElementById('export_button').addEventListener('click', function () {
  exportSettings();
  show_notification('Exported settings to settings.json');
  setTimeout(hide_notification, 1500);
});