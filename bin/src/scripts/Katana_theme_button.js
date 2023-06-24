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
                    chrome.storage.sync.get('theme', function (data) {
                        var theme = data.theme;
                        displayCheckmark(theme);
                    });
                }
            });

            var lightThemeButton = document.getElementById("light-theme-button");
            lightThemeButton.addEventListener('click', function () {
                setTheme(0);
                displayCheckmark(0)
                themePopup.style.display = "none";
                showThemeMenu = false;
            });

            var darkThemeButton = document.getElementById("dark-theme-button");
            darkThemeButton.addEventListener('click', function () {
                setTheme(1);
                displayCheckmark(1)
                themePopup.style.display = "none";
                showThemeMenu = false;
            });

            var autoThemeButton = document.getElementById("auto-theme-button");
            autoThemeButton.addEventListener('click', function () {
                setTheme(2);
                displayCheckmark(2)
                themePopup.style.display = "none";
                showThemeMenu = false;
            });

            // Close menu on hash change or outside click
            window.addEventListener('click', function (event) {
                if (event.target !== themeButton && !themeButton.contains(event.target)) {
                    themePopup.style.display = "none";
                    showThemeMenu = false;
                }
            });

            themePopup.addEventListener('click', function (event) {
                event.stopPropagation();
            });

            window.addEventListener('hashchange', function () {
                themePopup.style.display = "none";
                showThemeMenu = false;
            });
        });
    }
});