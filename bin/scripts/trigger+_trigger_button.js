// Function | Add button to NinjaOne device page
function addTriggerButton(deviceType) {
    chrome.storage.sync.get(['triggerModule'], function (result) {
        if (result.triggerModule) {
            console.debug('Trigger+ Button removed');
            path = window.location.hash.substr(1);
            idString = path.match(/\d{1,6}/)
            id = parseInt(idString)
            console.debug('ID updated');
            let navSelector;
            switch (deviceType) {
                case "deviceDashboard":
                    navSelector = "#device-tab-header > div > header > nav";
                    break;
                case "nmsDashboard":
                    navSelector = "#nms-tab-header > div > header > nav";
                    break;
                case "cloudMonitorDashboard":
                    navSelector = "#cloud-monitor-tab-header > div > header > nav";
                    break;
                case "vmGuestDashboard":
                    navSelector = "#vm-guest-tab-header > header > nav";
                    break;
                case "vmDashboard":
                    navSelector = "#vm-host-tab-header > header > nav";
                    break;
                default:
                    navSelector = "#device-tab-header > div > header > nav";
            }

            waitForElm(navSelector).then(() => {
                var nav = document.querySelector(navSelector);
                var navChildren = nav.children.length
                console.debug(navChildren.length);
                $(`${navSelector} > a:nth-child(${navChildren})`).remove();
                chrome.storage.sync.get(["buttonText"]).then((result) => {
                    $(navSelector).append(
                        `<a class="css-10b66mg e1x3vm0l0" id="requestButtonContainer"><div height="100%" class="css-1qjsmj2 eu2udwo7"><div class="css-11r2ks8 e1x3vm0l2">` + result.buttonText + ` <sup>Trigger</div></div></a>`
                    );
                    console.debug(`Inserted button with id ${deviceId}`);
                });
                waitForElm('#requestButtonContainer').then(() => {
                    document.getElementById('requestButtonContainer').addEventListener('click', function () {
                        console.debug('Click event listener added to Trigger+ button');
                        sendRequest();
                    });
                });
            });
        };
    });
};

//Run on page load
if (deviceDashboards.some(text => window.location.hash.includes(text))) {
    setTimeout(addTriggerButton(deviceDashboards.find(text => window.location.hash.includes(text))), 500)
    chrome.storage.sync.get(["key"]).then((result) => {
        console.debug("Value currently is " + result.key);
    });
};

// Run on hash change
window.addEventListener('hashchange', () => {
    console.debug(`Hash changed!`);
    if (deviceDashboards.some(text => window.location.hash.includes(text))) {
        setTimeout(addTriggerButton(deviceDashboards.find(text => window.location.hash.includes(text))), 500)
    };
});
