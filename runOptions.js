var pages = ["Schedule", "UI"];

let page = document.getElementsByTagName("BODY")[0];
for(var i = 0; i < pages.length; i++){
    var div = document.createElement("DIV");
    var val = pages[i];
    createBox(div, val, pages.length - 1 - i); 
}
addListeners();

//not really sure how to improve since storage set doesn't take string key
function createBox(div, val, remaining){
   chrome.storage.sync.get(val, function(response){ 
        var checked = (response[val])?"checked": "";
        var divHTML = "<input type='checkbox' id='" + val + "' name='active' value='" + val + "' " + checked + "><label for='" + val + "' >" + val + "</label>";
        div.innerHTML = divHTML;
        page.appendChild(div);
        if(remaining == 0){
            addListeners();
        }
   })
}

//not sure how to loop this since set appears to not take string keys
function addListeners(){
    $("#Schedule").on('change', function(){
        var item = this.checked;
        chrome.storage.sync.set({Schedule:item}, function(){
            console.log("Schedule is " + item);
        });
    });
    $("#UI").on('change', function(){
        chrome.storage.sync.set({UI:this.checked}, function(){
            console.log("UI changed");
        });
    });
}

/* deprecated function
function createBox(div, val, checked){
    chrome.storage.sync.get("Schedule", function(response){ 
        var checked = (response.Schedule)?"checked":"";
                $("#"+val).on('change', function(){
            var item = this.checked;
            chrome.storage.sync.set({Schedule: item}, function(){
                console.log(val + " is " + item);
            })
        });
    });
}
*/
