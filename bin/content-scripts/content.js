// Set global variables
var path = window.location.hash.substr(1);
var idString = path.match(/\d{1,6}/);
var id = parseInt(idString);

// Function | Wait for element
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        };
        console.debug('Button found!');
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            };
        });
        observer.observe(document.body, {
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

// Function | Add button to NinjaOne device page
function addButton() {
    console.debug('Button removed');
    path = window.location.hash.substr(1);
    idString = path.match(/\d{1,6}/)
    id = parseInt(idString)
    console.debug('ID updated');
    waitForElm('#device-tab-header > div > header > nav').then(() => {
        if (document.getElementById('requestButtonContainer')) {
            var nav = document.querySelector('#device-tab-header > div > header > nav');
            var navChildren = nav.children.length
            console.debug(navChildren.length);
            $("#device-tab-header > div > header > nav > a:nth-child(" + navChildren + ")").remove();
            chrome.storage.sync.get(["button_text"]).then((result) => {
                $("#device-tab-header > div > header > nav").append(
                    `<a class="css-10b66mg e1x3vm0l0" id="requestButtonContainer"><div height="100%" class="css-1qjsmj2 eu2udwo7"><div class="css-11r2ks8 e1x3vm0l2">` + result.button_text + ` <sup>Trigger</div></div></a>`
                );
                console.debug(`Inserted button with id ${id}`);
            });
            waitForElm('#requestButtonContainer').then(() => {
                document.getElementById('requestButtonContainer').addEventListener('click', function () {
                    console.debug('Click event listener added');
                    sendRequest();
                });
            });
        } else {
            chrome.storage.sync.get(["button_text"]).then((result) => {
                $("#device-tab-header > div > header > nav").append(
                    `<a class="css-10b66mg e1x3vm0l0" id="requestButtonContainer"><div height="100%" class="css-1qjsmj2 eu2udwo7"><div class="css-11r2ks8 e1x3vm0l2">` + result.button_text + ` <sup>Trigger</div></div></a>`
                );
                console.debug(`Inserted button with id ${id}`);
            });
            waitForElm('#requestButtonContainer').then(() => {
                document.getElementById('requestButtonContainer').addEventListener('click', function () {
                    console.debug('Click event listener added');
                    sendRequest();
                });
            });
        };
    });
};

//Run on page load
if (window.location.hash.includes("deviceDashboard")) {
    setTimeout(addButton, 500)
    chrome.storage.sync.get(["key"]).then((result) => {
        console.debug("Value currently is " + result.key);
    });
};

// Run on hash change
window.addEventListener('hashchange', () => {
    console.debug(`Hash changed!`);
    if (window.location.hash.includes("deviceDashboard")) {
        setTimeout(addButton, 500)
    };
});