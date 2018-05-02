//background script
var pages = ["Schedule"];
chrome.runtime.onInstalled.addListener(function(){
    console.log("installed");
    chrome.storage.sync.set({Schedule: true}, function(){
        console.log("Schedule is active");
    });
    chrome.storage.sync.set({UI: true}, function(){
        console.log("UI is active");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined,function(){
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'hac40.eschoolplus.powerschool.com'},
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

