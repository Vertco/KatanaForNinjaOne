// Load theme on pageload
loadTheme()

// Add theme switcher
chrome.storage.sync.get(['themeModule'], function (result) {
    if (result.themeModule) {
        waitForElm('#application-topbar > div').then((element) => {
            element.prepend(themeSwitcher);
            var themeButton = document.getElementById("theme-button");
            themeButton.addEventListener('click', function () {
                var themePopup = document.getElementById("theme-menu");
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
            });
            var darkThemeButton = document.getElementById("dark-theme-button");
            darkThemeButton.addEventListener('click', function () {
                setTheme(1);
            });
            var autoThemeButton = document.getElementById("auto-theme-button");
            autoThemeButton.addEventListener('click', function () {
                setTheme(2);
            });
        });

        // Close menu on hash change
        window.addEventListener('hashchange', () => {
            var themePopup = document.getElementById("theme-menu");
            if (showThemeMenu) {
                themePopup.style.display = "none";
                showThemeMenu = false;
            }
        });
    }
});