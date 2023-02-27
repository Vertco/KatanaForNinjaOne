// Variables
const moduleNames = ["themeModule", "triggerModule"];
const defaultSettings = {
    themeModule: true,
    triggerModule: true,
    theme: 0,
    buttonText: 'Button',
    warningText: 'Send HTTP request for',
    webhookUrl: 'https://example.com/api/webhook',
    debug: false
}
var settings = {}


// Startup functions
function loadSettings(callback) {
    chrome.storage.sync.get(null, function (items) {
        var allKeys = Object.keys(items);
        var settings = {};
        for (var i = 0; i < allKeys.length; i++) {
            settings[allKeys[i]] = items[allKeys[i]];
        }
        callback(settings);
    });
}

// Function | Show notification
function show_notification(message, color, textColor) {
    // Get the element to display the notification
    const notificationElement = document.getElementById('notification');

    // Update the content of the element
    notificationElement.innerHTML = message;

    // Show the notification
    notificationElement.style.display = 'block';
    notificationElement.style.backgroundColor = color;
    notificationElement.style.color = textColor;
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