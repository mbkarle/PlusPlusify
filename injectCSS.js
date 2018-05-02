//inject css
chrome.storage.sync.get("Schedule", function(response){
    if(response.Schedule){
        var sched = chrome.runtime.getURL('styles/plusplusSchedule.css');
        $('head').append(
            $('<link>')
                .attr("rel", "stylesheet")
                .attr("type", "text/css")
                .attr("href", sched)
                );
    }
});

chrome.storage.sync.get("UI", function(response){
    if(response.UI){
        var main = chrome.runtime.getURL('styles/plusplusMain.css');
        $('head').append(
            $('<link>')
                .attr("rel", "stylesheet")
                .attr("type", "text/css")
                .attr("href", main)
        )
    }
});
