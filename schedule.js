//content script
//document.body.innerHTML = "l"
chrome.storage.sync.get("Schedule",function(val){
   console.log(val.Schedule); 
    if(val.Schedule){

var dayIndices = ["A","B","C","D","E","F","G","H"]
var days = {
    "A": [1,2,3,5,6,7],
    "B": [2,3,4,6,7,8],
    "C": [3,4,1,7,8,5],
    "D": [4,1,2,8,5,6]
}
days["E"] = days["A"]
days["F"] = days["B"]
days["G"] = days["C"]
days["H"] = days["D"]
var curr_schedule = {};
for(var x = 1; x < 9; x++){
    curr_schedule[""+x] = [];
}
let iframe = document.getElementById("sg-legacy-iframe");

var replacement = customElement("TABLE");
replacement.style.position = "absolute";
replacement.style.top = "30%";
replacement.style.width = "80%";
replacement.style.left = "10%";
replacement.style.backgroundColor = "white";
var head = replacement.createTHead().insertRow(0);
var body = replacement.createTBody();
for(var cHead = 0; cHead < 9; cHead++){
    head.appendChild(customElement("TH"));
}
for(var r = 0; r < 6; r++){
    body.insertRow(r);
    body.rows[r].appendChild(customElement("TH"));
    body.rows[r].cells[0].innerHTML = "Block " + (r+1);
    body.rows[r].cells[0].classList.add("left");
    for(var c = 1; c < 9; c++){
       body.rows[r].insertCell(c);
       classList = body.rows[r].cells[c].classList;
       classList.add("text-left");
       classList.add("plus");
    }
}
iframe.onload = function(){
    let iframeDoc = iframe.contentWindow.document;
    console.log(iframeDoc);
    let schedule = iframeDoc.getElementById("plnMain_dgSchedule");
    let rows = schedule.rows;
    for(var i = 0; i < rows.length; i++){
        var period = parseInt(rows[i].cells[2].innerHTML)
        if(!isNaN(period)){
            curr_schedule[""+period].push({
                "Name": rows[i].cells[1].childNodes[1].innerHTML,
                "Teacher": rows[i].cells[3].innerHTML.split(",")[0],
                "Room": rows[i].cells[4].innerHTML.split(" ")[0],
                "Days": {},
                "Quarters": rows[i].cells[6].innerHTML.split(", "),
                "Period": period
            });
            var daysActive = rows[i].cells[5].innerHTML.split(", ");
            for(var d = 0; d <daysActive.length; d++){
                var thisPeriod = curr_schedule[""+period];
                thisPeriod[thisPeriod.length-1]["Days"][daysActive[d]] = true;
            }
        }
    }
    buildSchedule(); 
    console.log(curr_schedule);
    console.log(replacement);
    if(document.getElementsByClassName("sg-main-header")[0].style.display == "none"){
        replacement.style.top = "18%";
    }
    document.body.appendChild(replacement);
    document.body.removeChild(document.getElementById("MainContent"));
    $("body").addClass("plus");
}

function buildSchedule(){
    head.cells[0].innerHTML = "Day";
    head.cells[0].classList.add("corner");
    for(var i = 0; i < head.cells.length - 1; i++){
        head.cells[i+1].innerHTML = dayIndices[i];
        head.cells[i+1].classList.add("top");
    }
    for(var i = 0; i < body.rows.length; i++){
        for(var c = 1; c < body.rows[0].cells.length; c++){
            var thisDay = dayIndices[c-1];
            var thisPeriod = days[thisDay][i];
            var classes = curr_schedule[thisPeriod];
            var thisCell = body.rows[i].cells[c];
            for(var d = 0; d < classes.length; d++){
                if(classes[d]["Days"][thisDay]){
                    thisCell.innerHTML = classText(classes[d]);
                    break;
                }
            }
        }
    }
}
function classText(classId){
    var html = classId["Name"] + "\n" + classId["Teacher"] +"\n" +  classId["Room"] + "\n Period: " + classId["Period"];
    return html;
}

}});


