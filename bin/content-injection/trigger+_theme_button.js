// Set variables
const themeButton = document.createElement("div");
themeButton.innerHTML = '<div aria-haspopup="true" aria-controls="menu--3" aria-label="Actions" id="menu-button--menu" type="button" data-reach-menu-button=""><span aria-hidden="true"><button type="button" class="css-1x6qs7x e1in0zpt0"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" class="svg-inline--fa fa-user fa-w-14 fa-fw  css-jsh9fm eu2udwo6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 1 1 0 16Z" fill="currentColor"/></svg></button></span></div>';
themeButton.id = "theme_button";
themeButton.classList.add("dropdown-target", "es5ttc71", "css-1p0oaxl", "e16bvwle2");

var darkThemeURL = chrome.runtime.getURL("resources/NinjaOneDarkTheme.css");
console.debug(darkThemeURL)
var link = document.createElement("link");
link.setAttribute("rel", "stylesheet");
link.setAttribute("href", darkThemeURL);

// Load theme settings on page load
loadDarkTheme();


// Add dark theme button
waitForElm('#application-topbar > div').then((element) => {
    element.prepend(themeButton);
    themeButton.addEventListener('click', function () {
        chrome.storage.sync.get('darkMode', function (data) {
            var darkMode = data.darkMode;
            if (darkMode) {
                darkMode = false;
                disableDarkTheme();
            } else {
                darkMode = true;
                enableDarkTheme();
            }
            chrome.storage.sync.set({ 'darkMode': darkMode });
        });

    });
});