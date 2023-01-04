chrome.storage.sync.get(["debug"]).then((result) => {
  if(result.debug) {
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
function show_notification() {
  const button = document.querySelector(".notification");
  button.style.display = "block"
  // Hide notification
  var strCmd = "document.querySelector('.notification').style.display = 'none'";
  var hideTimer = setTimeout(strCmd, 2000);
};

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

// Load and set value of all settings fields
reloadfields()

// Enable debug mode after clicking on the logo 5 times
var counter = 0;

document.querySelector('.logo').addEventListener('click', function() {
  counter++;
  if (counter === 10) {
    debugLoad = chrome.storage.sync.get(["debug"]).then((result) => {
      if(!result.debug) {
        show_debug()
      } else {
        hide_debug()
      }
      chrome.storage.sync.set({"debug": !result.debug});
      counter = 0;
    })
  }
});

// Save data when clicking on save button
document.querySelector('.save_button').addEventListener('click', function() {
  chrome.storage.sync.set({
      button_text: document.getElementById("button_text").value,
      warning_text: document.getElementById("warning_text").value,
      webhook_url: document.getElementById("webhook_url").value
  }).then(() => {
      console.debug("Saved settings");
  });
  show_notification();
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
  show_notification();
});
