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