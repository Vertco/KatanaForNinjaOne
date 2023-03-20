![Large_promo_tile](https://user-images.githubusercontent.com/47614276/221411640-0e8a1443-e33f-434a-8a81-b97ca8402d5c.png)
<p align="center">
  <a href="https://www.paypal.com/donate/?hosted_button_id=PLM7Q4RRJK48N" target="_blank">
    <img src="https://img.shields.io/badge/Donate-PayPal-green.svg"/>
  </a>
</p>

---

# Katana for NinjaOne
This repository houses the Katana for NinjaOne Chromium extension.

The Katana extension adds dark theme support to NinjaOne aswell as adding a button to devices that sends the current device to a selected endpoint.
From there you can integrate it into any program you want.
In the [Guides section](https://github.com/Vertco/KatanaForNinjaOne/edit/main/README.md#guides) we'll show you how to run an action in Microsoft Power Automate for example.

The extension is available in the [Microsoft Edge Add-on store](https://microsoftedge.microsoft.com/addons/detail/trigger-for-ninjaone/elakkmlooholefhpllcioobeepoombdn), [Google Chrome webstore](https://chrome.google.com/webstore/detail/trigger-for-ninjaone/jlkhefmehegjclbdmipbedombllgmgpd) and in the [Firefox add-on store](https://addons.mozilla.org/en-US/firefox/addon/katana-for-ninjaone/).

To test the latest verions before it's released to the stores you will need to install the extension manually using a zip of the bin folder.<br>
After downloading the bin folder, you'll need to move the respective Firefox of Chromium manifest file into the bin folder.<br>
Follow the link for your browser for an article on how to sideload a extension:<br>
[Microsoft edge](https://learn.microsoft.com/en-us/microsoft-edge/extensions-chromium/getting-started/extension-sideloading)<br>
[Google Chrome](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)<br>
[Firefox](https://firefox-source-docs.mozilla.org/devtools-user/about_colon_debugging/index.html#extensions)

---
# Guides
Below are some guides to help you get started with the extension.

## Settings file
Katana for NinjaOne has an option to import settings. This will make it easier to roll out the extension to multiple users.
The settings are stored in a .json file with the content formatted as shown below:
```
{
  "buttonText": "Button",
  "debug": false,
  "theme": 2,
  "themeModule": true,
  "triggerModule": true,
  "warningText": "Sent request for",
  "webhookUrl": "https://example.com/api/webhook/123abcABC"
}
```
[Download](https://raw.githubusercontent.com/Vertco/KatanaForNinjaOne/main/settings.json)

The theme option is as follows:<br>
0: Light theme<br>
1: Dark theme<br>
2: Follow browser<br>

## Integrate with Microsoft Power Automate
When working in the Microsoft ecosystem, you'll have access to Power Automate. This is a application where you can make "flows" to automate workflows.
We'll be using this functionality and this extension together with [Dataverse for NinjaOne](https://github.com/Vertco/DataverseForNinjaOne) to send an email to a shared mailbox in this example, but the posibilities are endless.

### Prerequisites
1. A [Power Automate Premium license](https://powerautomate.microsoft.com/pricing/) for the `Request - When an HTTP request is received` trigger and NinjaOne custom connector.
2. Setup [Dataverse for NinjaOne](https://github.com/Vertco/DataverseForNinjaOne#client-app-setup) in your Microsoft environment.

### Flow setup
1. Navigate to [Power Automate](https://make.powerautomate.com/) andclick on `create`.
2. Click on `Instant cloud flow`, give you flow a name and select the `Request - When an HTTP request is received` trigger.
3. Click on `Create`.<br>
![Screenshot 2022-12-26 131713](https://user-images.githubusercontent.com/47614276/209548156-9ddd0a3c-c6d4-40ba-9471-66e7fdc851db.png)
4. Add the following JSON schema to the trigger:
```
{
    "type": "object",
    "properties": {
        "id": {
            "type": "integer"
        },
        "debug": {
            "type": "boolean"
        }
    }
}
```
5. Add a `NinjaOne - List devices (detailed)` step with as df: `id=@{triggerBody()?['id']}`.
![Screenshot 2022-12-26 133104](https://user-images.githubusercontent.com/47614276/209549453-9c940586-006c-4c04-965e-81170cab22a8.png)
6. Add a `Office 365 Outlook - Send an email (V2)` step and add the wanted info to the step.<br>
Note that adding any data from the previous `NinjaOne - List devices (detailed)` step will automatically wrap the step in a `Apply to each` step for the `Body`.<br>
![Screenshot 2022-12-26 133429](https://user-images.githubusercontent.com/47614276/209549980-d0cd4f02-8204-4bc0-8bfd-b9863b1b8fbf.png)
7. Save the flow. This will then show you the `HTTP POST URL` field in the `Request - When an HTTP request is received` trigger.<br>
Set this URL as the Webhook URL field in the extension.

Now, whenever you click on the Trigger button in NinjaOne, you will receive an email with that devices' details.
This in itself is obviously not the most useful functionality, but by changing the flow you can make the button do anything, for example:
- Print labels for devices
- Store device details in a 3rd party Inventory management system
- Create a device specific ticket in a 3rd party ticketing system
