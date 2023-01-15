// Function | Wait for element
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

// Function | Send http request
function sendRequest() {
    chrome.storage.sync.get(["warning_text", "confirmation_text"]).then((result) => {
        var confirm_request = confirm(result.warning_text + ` ${id}?`);
        if (confirm_request) {
            chrome.storage.sync.get(["webhook_url", "debug"]).then((result) => {
                console.debug("Value currently is " + result.webhook_url)
                const xhr = new XMLHttpRequest();
                xhr.open('POST', result.webhook_url);
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.onload = function () {
                    console.debug(`Called webhook with id ${id}`);
                    window.alert(`Request sent succesfully for ${id}.`)
                };
                xhr.send(JSON.stringify({
                    "id": id,
                    "debug": result.debug
                }));;
            });
        };
    });
};

// Function | Enable dark theme
function enableDarkTheme() {
    document.head.appendChild(link);
}

// Function | Disable dark theme
function disableDarkTheme() {
    if (link) {
        document.head.removeChild(link);
    };
}

// Function | Load theme settings
function loadDarkTheme() {
    chrome.storage.sync.get('darkMode', function (data) {
        var darkMode = data.darkMode;
        if (darkMode) {
            document.head.appendChild(link);
        } else {
            if (link) {
                document.head.removeChild(link);
            };
        };
    });
};
