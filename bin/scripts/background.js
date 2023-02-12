chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == "install") {
        const defaultSettings = {
            theme_module: true,
            trigger_module: true,
            theme: 0,
            button_text: 'Button',
            warning_text: 'Send HTTP request for',
            webhook_url: 'https://example.com/api/webhook',
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

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        fetch(request.webhook_url, {
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
        });
    });