// Wait for element
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        };
        console.debug('Element "' + selector + '" found!');
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            };
        });
        observer.observe(document, {
            childList: true,
            subtree: true
        });
    });
};

// Add listener to children
function addThemeEventListeners(parentSelector) {
    var parent = document.querySelector(parentSelector);
    var children = parent.querySelectorAll('#css-menu-item');
    for (var i = 0; i < children.length; i++) {
        children[i].addEventListener('click', function () { setTheme(i); });
    }
};

// Send HTTP request
function sendRequest() {
    chrome.storage.sync.get(["warningText", "confirmationText"]).then((result) => {
        var confirm_request = confirm(result.warningText + ` ${id}?`);
        if (confirm_request) {
            chrome.storage.sync.get(["webhookUrl", "debug"]).then((result) => {
                chrome.runtime.sendMessage({
                    id: id,
                    webhookUrl: result.webhookUrl,
                    debug: result.debug
                }, (response) => {
                    alert(response.body.message)
                });
            });
        }
    });
};

function displayCheckmark(theme) {
    light = document.getElementById('light-theme-checkmark')
    dark = document.getElementById('dark-theme-checkmark')
    browser = document.getElementById('follow-browser-checkmark')
    switch (theme) {
        case 0:
            light.style.display = "flex";
            dark.style.display = "none";
            browser.style.display = "none";
            break;
        case 1:
            light.style.display = "none";
            dark.style.display = "flex";
            browser.style.display = "none";
            break;
        case 2:
            light.style.display = "none";
            dark.style.display = "none";
            browser.style.display = "flex";
            break;
    }
}

// Set theme
function setTheme(num) {
    chrome.storage.sync.get(['themeModule'], function (result) {
        if (result.themeModule) {
            var head = document.getElementsByTagName('head')[0];
            var triggerThemeLink = document.createElement('link');
            triggerThemeLink.rel = 'stylesheet';
            triggerThemeLink.classList.add("trigger_stylesheet");

            // Remove any existing link elements with the same rel attribute and class
            var triggerLinks = document.querySelectorAll("link[rel='stylesheet'].trigger_stylesheet");
            for (var i = 0; i < triggerLinks.length; i++) {
                head.removeChild(triggerLinks[i]);
            }

            if (num === 1) {
                triggerThemeLink.href = chrome.runtime.getURL("resources/NinjaOneDarkTheme.css");
                chrome.storage.sync.set({ 'theme': 1 });
            } else if (num === 2) {
                triggerThemeLink.href = chrome.runtime.getURL("resources/NinjaOneAutoTheme.css");
                chrome.storage.sync.set({ 'theme': 2 });
            } else {
                chrome.storage.sync.set({ 'theme': 0 });
            }
            head.appendChild(triggerThemeLink);
        };
    })
};

// Load theme settings
function loadTheme() {
    chrome.storage.sync.get(['themeModule'], function (result) {
        if (result.themeModule) {
            chrome.storage.sync.get('theme', function (data) {
                var theme = data.theme;
                setTheme(theme);
            });
        }
    });
};