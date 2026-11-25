// Function | Add button to NinjaOne device page
function addTriggerButton(deviceType) {
    chrome.storage.sync.get(['triggerModule'], function (result) {
        if (result.triggerModule) {
            console.debug('Trigger Button removed');
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
                if (document.getElementById('requestButtonContainer')) {
                    var requestButtonContainer = document.getElementById('requestButtonContainer');
                    requestButtonContainer.remove();
                }
                chrome.storage.sync.get(["buttonText"]).then((result) => {
                    $(navSelector).append(
                        `<a class="css-1q01osz" id="requestButtonContainer"><div height="100%" class="css-ul214x"><div class="StyledText css-1ulgvh2">` + result.buttonText + ` <sup>Trigger</div></div></a>`
                    );
                    console.debug(`Inserted button with id ${deviceId}`);
                });
                waitForElm('#requestButtonContainer').then(() => {
                    document.getElementById('requestButtonContainer').addEventListener('click', function () {
                        console.debug('Click event listener added to Trigger button');
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
