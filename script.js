document.addEventListener("DOMContentLoaded", function () {
    const cleanButton = document.getElementById("cleanButton");

    cleanButton.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];
            clearCookiesForTab(currentTab.id, currentTab.url);
        });
    });

    function clearCookiesForTab(tabId, tabUrl) {
        chrome.cookies.getAll({ url: tabUrl }, function (cookies) {
            for (const cookie of cookies) {
                chrome.cookies.remove({
                    url: getUrlFromCookie(cookie),
                    name: cookie.name,
                });
            }
            alert("Cookies have been cleared. The page will now be reloaded.");
            chrome.tabs.reload(tabId);
        });
    }

    function getUrlFromCookie(cookie) {
        return "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain + cookie.path;
    }
});
