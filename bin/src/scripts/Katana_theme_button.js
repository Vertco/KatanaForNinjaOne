// Load theme on pageload
loadTheme()

// Add theme switcher
chrome.storage.sync.get(['themeModule'], function (result) {
    if (result.themeModule) {
        waitForElm('#application-topbar > div').then((element) => {
            element.prepend(themeSwitcher);

            var themeButton = document.getElementById("theme-button");
            var themePopup = document.getElementById("theme-menu");
            var showThemeMenu = false;

            themeButton.addEventListener('click', function () {
                if (showThemeMenu) {
                    themePopup.style.display = "none";
                    showThemeMenu = false;
                } else {
                    themePopup.style.display = "block";
                    showThemeMenu = true;
                }
            });

            var lightThemeButton = document.getElementById("light-theme-button");
            lightThemeButton.addEventListener('click', function () {
                setTheme(0);
                lightThemeSelected();
            });

            var darkThemeButton = document.getElementById("dark-theme-button");
            darkThemeButton.addEventListener('click', function () {
                setTheme(1);
                darkThemeSelected();
            });

            var autoThemeButton = document.getElementById("auto-theme-button");
            autoThemeButton.addEventListener('click', function () {
                setTheme(2);
                followBrowserSelected();
            });

            // Close menu on hash change or outside click
            window.addEventListener('click', function (event) {
                if (event.target !== themeButton && !themeButton.contains(event.target)) {
                    themePopup.style.display = "none";
                    showThemeMenu = false;
                }
            });

            window.addEventListener('hashchange', function () {
                themePopup.style.display = "none";
                showThemeMenu = false;
            });
        });
    }
});

// Show the checkmark when the option is selected, and make sure the other checkmarks don't show
function lightThemeSelected() {
    document.getElementById('light-theme-checkmark').style.display = "block",
    document.getElementById('follow-browser-checkmark').style.display = "none",
    document.getElementById('dark-theme-checkmark').style.display = "none";
}

function darkThemeSelected() {
    document.getElementById('dark-theme-checkmark').style.display = "block",
    document.getElementById('follow-browser-checkmark').style.display = "none",
    document.getElementById('light-theme-checkmark').style.display = "none";
}

function followBrowserSelected() {
    document.getElementById('follow-browser-checkmark').style.display = "block",
    document.getElementById('dark-theme-checkmark').style.display = "none",
    document.getElementById('light-theme-checkmark').style.display = "none";
}