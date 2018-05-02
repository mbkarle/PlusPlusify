//adjusts ui
chrome.storage.sync.get("UI",function(val){if(val.UI){
let header = document.getElementsByClassName("sg-main-header")[0];

var url = window.location.href.split("/");
var curr_page = url[url.length - 2];
var accountContainer = document.getElementsByClassName("sg-banner-menu-container")[0];
var account = accountContainer.cloneNode(true);
var replacement = customElement("HEADER");
var nav = customElement("NAV");

var menu_options = document.getElementsByClassName("sg-hac-menu-option");
var submenu_options = document.getElementsByClassName("sg-hac-submenu-options");
for(var i = submenu_options.length - 1; i >=0; i--){
    if(submenu_options[i].style.display == "none"){
        submenu_options[i].remove();
    }
}

submenu_options = document.getElementsByClassName("sg-hac-submenu-option");

var logo = customElement("a");
logo.href = window.location.href;
logo.innerHTML = "<div style='font-size:40px;color:white;position:relative;left:2%;'>eSchoolPlusPlusified</div>"
nav.appendChild(logo);

account.style.position = "absolute";
account.style.top = "0";
account.style.right = "2%";
nav.appendChild(account);

var ul = customElement("ul");
ul.classList.add("menu");
for(var i = 0; i < menu_options.length;i++){
    var name = menu_options[i].getElementsByTagName("span")[0].innerHTML;
    var href = "/HAC4_001/" + name.split(" ").join("");
    var li = customElement("li");
    li.innerHTML = "<a href='"+href+"'>"+name+"</a>";
    ul.appendChild(li);
}
nav.appendChild(ul);
replacement.appendChild(nav);
var hr = customElement("hr");
hr.style.width = "80%";
replacement.appendChild(hr);

if(submenu_options.length > 1){
    var subNav = customElement("nav");
    subNav.style.height = "50px";
    var subUL = customElement("ul");
    subUL.style.top = "-10%";
    subUL.classList.add("menu");
    for(var i = 0; i < submenu_options.length; i++){
        var li = customElement("li");
        var name = submenu_options[i].getElementsByTagName("span")[0].innerHTML;
        li.innerHTML = "<a href='/HAC4_001/"+curr_page+"/"+ name.split(" ").join("")+"'>"+name + "</a>";
        subUL.appendChild(li);
    }
    subNav.appendChild(subUL);
    replacement.appendChild(subNav);
}
replacement.style.position = "relative";
document.body.insertBefore(replacement, header);
//$("body").addClass("plus");
header.style.display = "none";
var defaultContent = document.getElementById("MainContent");
if(defaultContent != null){
    defaultContent.style.position = "static";
    defaultContent.style.height = "auto";
}
}})
