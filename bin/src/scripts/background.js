// Set defaults on install
chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        const defaultSettings = {
            themeModule: true,
            triggerModule: true,
            theme: 0,
            buttonText: 'Button',
            warningText: 'Send HTTP request for',
            webhookUrl: 'https://example.com/api/webhook',
            debug: false
        };

        chrome.storage.sync.get(Object.keys(defaultSettings), function (result) {
            let settingsUpdated = false;
            for (const setting in defaultSettings) {
                if (typeof result[setting] === 'undefined') {
                    result[setting] = defaultSettings[setting];
                    settingsUpdated = true;
                }
            }
            if (settingsUpdated) {
                chrome.storage.sync.set(result, function () {
                    console.log('Default settings have been set.');
                });

            }
        });
    }
});

// Send HTTP request
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        fetch(request.webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "id": request.id,
                "debug": request.debug
            })
        }).then(response => {
            console.debug(`Called webhook with id ${request.id}`);
            console.debug(response.status);
            return Promise.all([response.status, response.json()]);
        }).then(([status, body]) => {
            sendResponse({ status: status.toString(), body });
        });
        return true;
    });