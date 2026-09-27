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
