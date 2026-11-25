// Trigger button
var triggerModule_enabled = true;
var path = window.location.hash.substr(1);
var idString = path.match(/\d{1,6}/);
var deviceId = parseInt(idString);
var deviceDashboards = ["deviceDashboard", "nmsDashboard", "cloudMonitorDashboard", "vmGuestDashboard", "vmDashboard"];
