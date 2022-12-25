![Large_promotional_tile](https://user-images.githubusercontent.com/47614276/209482608-55a4c24e-88a6-4f10-979c-bd6a42500c89.png)
<p align="center">
  <a href="https://www.paypal.com/donate/?hosted_button_id=PLM7Q4RRJK48N" target="_blank">
    <img src="https://img.shields.io/badge/Donate-PayPal-green.svg"/>
  </a>
</p>

---

# Trigger for NinjaOne
This repository houses the Trigger for NinjaOne Chromium extension.

With this extension you can add a button to the [NinjaOne](https://www.ninjaone.com/) UI that sends the current device to a selected endpoint.
From there you can integrate it into any program you want.
Below we'll show you how to run an action in Microsoft Power Automate for example.

The extension will be available in the Microsoft Edge Add-on store and Google Chrome webstore, but for now will need to be installed manually using a zip of the bin folder.<br>
Follow the link for your browser of choice on detailed steps how to do this:<br>
[Microsoft Edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading)<br>
[Google Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)

---
# Guides
Below are some guides to help you get started with the extension.

## Settings file
Trigger for NinjaOne has an option to import settings. This will make it easier to roll out the extension to multiple users.
The settings are stored in a .json file with the content formatted as shown below:
```
{
    "button_text":"Button",
    "confirmation_text":"Sent request for",
    "webhook_url":"https://example.com/api/webhook/123abcABC"
}
```
[Download](https://raw.githubusercontent.com/Vertco/TriggerForNinjaOne/main/settings.json)
