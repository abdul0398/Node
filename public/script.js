setInterval((()=>{
const date = new Date();
let hour = date.getHours();
let min = date.getMinutes();
let sec = date.getSeconds();

let hrDiv = document.querySelector(".hour");
let mintDiv = document.querySelector(".min");
let secDiv = document.querySelector(".sec");
let ampm = document.querySelector(".am");
if(hour / 12 > 1){
    ampm.innerHTML = "pm";
}else{
    ampm.innerHTML = "am";
}

hrDiv.innerHTML = hour % 12 + " hr";
mintDiv.innerHTML = min + " min";
secDiv.innerHTML = sec + " sec";
}),100);