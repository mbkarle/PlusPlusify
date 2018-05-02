//functions to be accessed in multiple content scripts
function customElement(type){
    var temp = document.createElement(type);
    temp.classList.add("plus");
    return temp;
}
