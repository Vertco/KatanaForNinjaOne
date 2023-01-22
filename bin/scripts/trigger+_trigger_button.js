// Function | Add button to NinjaOne device page
function addTriggerButton() {
    console.debug('Trigger+ Button removed');
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
                    console.debug('Click event listener added to Trigger+ button');
                    sendRequest();
                });
            });
        } else {
            chrome.storage.sync.get(["button_text"]).then((result) => {
                $("#device-tab-header > div > header > nav").append(
                    `<a class="css-10b66mg e1x3vm0l0" id="requestButtonContainer"><div height="100%" class="css-1qjsmj2 eu2udwo7"><div class="css-11r2ks8 e1x3vm0l2">` + result.button_text + ` <sup>Trigger+</div></div></a>`
                );
                console.debug(`Inserted Trigger+ button with id ${id}`);
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
    setTimeout(addTriggerButton, 500)
    chrome.storage.sync.get(["key"]).then((result) => {
        console.debug("Value currently is " + result.key);
    });
};

// Run on hash change
window.addEventListener('hashchange', () => {
    console.debug(`Hash changed!`);
    if (window.location.hash.includes("deviceDashboard")) {
        setTimeout(addTriggerButton, 500)
    };
});