// Theme switcher
var themeModule_enabled = true;
var triggerModule_enabled = true;
var showThemeMenu = false;
const themeSwitcher = document.createElement("div");
themeSwitcher.innerHTML = `<div id="theme-button" aria-expanded="false" aria-haspopup="true" aria-label="menu-button--menu"> <button type="button"
        class="button-theme"><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user"
            class="svg-inline--fa fa-user fa-w-14 fa-fw css-jsh9fm eu2udwo7" role="img"
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm0-2V4a8 8 0 1 1 0 16Z"
                fill="currentColor" />
        </svg></button></div>
<div id="theme-menu" role="menu" aria-labelledby="menu-button--menu" tabindex="-1" class="css-theme_button"
    style="display: none;">
    <div class="css-5m14zq eu2udwo8">
        <div data-test-id="styled-text-div" color="[object Object]" class="css-41l7xm ej570i0"><span>Display theme</span></div>
    </div>
    <div id="light-theme-button" role="menuitem" data-test-id="menu-item" class="css-menu-item css-741z8f e1fxg5eo0">
        <div width="100%" cursor="pointer" class="css-tgqcg4 eu2udwo8">
            <div class="css-14ma53w eu2udwo7">
                <div class="css-14ma53w eu2udwo7"> <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M11.996 19.01a.75.75 0 0 1 .743.649l.007.102v1.5a.75.75 0 0 1-1.493.101l-.007-.101v-1.5a.75.75 0 0 1 .75-.75Zm6.022-2.072 1.06 1.06a.75.75 0 1 1-1.06 1.061l-1.06-1.06a.75.75 0 0 1 1.06-1.061Zm-10.983 0a.75.75 0 0 1 0 1.06L5.974 19.06a.75.75 0 0 1-1.06-1.06l1.06-1.061a.75.75 0 0 1 1.06 0ZM12 6.475a5.525 5.525 0 1 1 0 11.05 5.525 5.525 0 0 1 0-11.05Zm0 1.5a4.025 4.025 0 1 0 0 8.05 4.025 4.025 0 0 0 0-8.05Zm9.25 3.293a.75.75 0 0 1 .102 1.493l-.102.007h-1.5a.75.75 0 0 1-.102-1.493l.102-.007h1.5Zm-17-.029a.75.75 0 0 1 .102 1.494l-.102.006h-1.5a.75.75 0 0 1-.102-1.493l.102-.007h1.5Zm1.64-6.37.084.072 1.06 1.06a.75.75 0 0 1-.976 1.134l-.084-.073-1.06-1.06a.75.75 0 0 1 .976-1.134Zm13.188.072a.75.75 0 0 1 .073.977l-.073.084-1.06 1.06a.75.75 0 0 1-1.133-.976l.072-.084 1.06-1.061a.75.75 0 0 1 1.061 0ZM12 1.99a.75.75 0 0 1 .743.648l.007.102v1.5a.75.75 0 0 1-1.493.101l-.007-.102v-1.5a.75.75 0 0 1 .75-.75Z"
                            fill="currentcolor" />
                    </svg> </div>
                <div class="css-12tdu0e eu2udwo8">
                    <div data-test-id="styled-text-div" class="css-dhnfg6 ej570i0"><span>Light theme</span></div>
                </div>
            </div>
            <div class="css-14ma53w eu2udwo7 css-theme_checkmark"> <svg id="light-theme-checkmark" style="display:none"
                    width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z"
                        fill="currentcolor" />
                </svg> </div>
        </div>
    </div>
    <div id="dark-theme-button" role="menuitem" data-test-id="menu-item" class="css-menu-item css-741z8f e1fxg5eo0">
        <div width="100%" cursor="pointer" class="css-tgqcg4 eu2udwo8">
            <div class="css-14ma53w eu2udwo7">
                <div class="css-14ma53w eu2udwo7"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.026 17.001c-2.762 4.784-8.879 6.423-13.663 3.661a9.964 9.964 0 0 1-3.234-2.983.75.75 0 0 1 .365-1.131c3.767-1.348 5.785-2.911 6.956-5.146 1.232-2.353 1.551-4.93.689-8.464a.75.75 0 0 1 .769-.926 9.961 9.961 0 0 1 4.457 1.327C21.149 6.1 22.788 12.217 20.025 17Zm-8.248-4.903c-1.25 2.388-3.31 4.099-6.817 5.499a8.492 8.492 0 0 0 2.152 1.766 8.501 8.501 0 1 0 8.502-14.725 8.485 8.485 0 0 0-2.792-1.016c.647 3.384.23 6.044-1.045 8.476Z"
                            fill="currentcolor" />
                    </svg> </div>
                <div class="css-12tdu0e eu2udwo8">
                    <div data-test-id="styled-text-div" class="css-dhnfg6 ej570i0"><span>Dark theme</span> </div>
                </div>
            </div>
            <div class="css-14ma53w eu2udwo7 css-theme_checkmark"> <svg id="dark-theme-checkmark" style="display:none"
                    width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z"
                        fill="currentcolor" style="display:block" />
                </svg> </div>
        </div>
    </div>
    <div id="auto-theme-button" role="menuitem" data-test-id="menu-item" class="css-menu-item css-741z8f e1fxg5eo0">
        <div width="100%" cursor="pointer" class="css-tgqcg4 eu2udwo8">
            <div class="css-14ma53w eu2udwo7">
                <div class="css-14ma53w eu2udwo7"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m17.751 3 .185.005a3.25 3.25 0 0 1 3.06 3.06l.005.185v5.772a6.468 6.468 0 0 0-1.5-.709L19.5 8H4.501L4.5 17.75a1.75 1.75 0 0 0 1.606 1.744l.144.006h5.064c.172.534.412 1.037.708 1.5H6.25a3.25 3.25 0 0 1-3.245-3.066L3 17.75V6.25a3.25 3.25 0 0 1 3.066-3.245L6.25 3h11.501Zm0 1.5h-11.5a1.75 1.75 0 0 0-1.75 1.75v.25h15v-.25a1.75 1.75 0 0 0-1.75-1.75Zm-7.501 5a.75.75 0 0 1 .743.648l.007.102v7a.75.75 0 0 1-.648.743L10.25 18h-3.5a.75.75 0 0 1-.743-.648L6 17.25v-7a.75.75 0 0 1 .648-.743L6.75 9.5h3.5ZM9.5 11h-2v5.5h2V11Zm8.5-.75a.75.75 0 0 0-.75-.75h-4.496l-.101.007A.75.75 0 0 0 12.754 11h4.496l.102-.007A.75.75 0 0 0 18 10.25Zm-3.72 3.725a2 2 0 0 1-1.442 2.497l-.584.144a5.729 5.729 0 0 0 .006 1.807l.54.13a2 2 0 0 1 1.45 2.51l-.187.632c.44.386.94.699 1.484.921l.494-.518a2 2 0 0 1 2.899 0l.498.525a5.28 5.28 0 0 0 1.483-.913l-.198-.686a2 2 0 0 1 1.442-2.496l.583-.144a5.729 5.729 0 0 0-.006-1.808l-.54-.13a2 2 0 0 1-1.45-2.51l.187-.63a5.28 5.28 0 0 0-1.484-.923l-.493.519a2 2 0 0 1-2.9 0l-.498-.525c-.544.22-1.044.53-1.483.912l.198.686ZM17.5 19c-.8 0-1.45-.672-1.45-1.5 0-.829.65-1.5 1.45-1.5.8 0 1.45.671 1.45 1.5 0 .828-.65 1.5-1.45 1.5Z"
                            fill="currentcolor" />
                    </svg></div>
                <div class="css-12tdu0e eu2udwo8">
                    <div data-test-id="styled-text-div" class="css-dhnfg6 ej570i0"><span>Follow browser</span> </div>
                </div>
            </div>
            <div class="css-14ma53w eu2udwo7 css-theme_checkmark"> <svg id="follow-browser-checkmark"
                    style="display:none" width="24" height="24" fill="none" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m8.5 16.586-3.793-3.793a1 1 0 0 0-1.414 1.414l4.5 4.5a1 1 0 0 0 1.414 0l11-11a1 1 0 0 0-1.414-1.414L8.5 16.586Z"
                        fill="currentcolor" style="float:right" />
                </svg> </div>
        </div>
    </div>
</div>`;
themeSwitcher.id = "theme_switcher";
themeSwitcher.classList.add("button-theme-div");

// Katana button
var path = window.location.hash.substr(1);
var idString = path.match(/\d{1,6}/);
var deviceId = parseInt(idString);
var deviceDashboards = ["deviceDashboard", "nmsDashboard", "cloudMonitorDashboard", "vmGuestDashboard", "vmDashboard"];