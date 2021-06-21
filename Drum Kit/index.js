var x = document.querySelectorAll("button").length;
for(var i = 0; i < x; i++){
document.querySelectorAll("button")[i].addEventListener("click", handleClick);
}
function handleClick() {
    keyboardEvent(this.innerHTML);
    outputAnimation(this.innerHTML);
}

document.addEventListener("keydown", function(event){
    keyboardEvent(event.key);
    outputAnimation(event.key);
});

function keyboardEvent(key){
    switch(key){
        case "w" : 
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        case "a" :
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case "d" :
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "j" :
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        case "k" :
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
        case "l" :
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        default :
            console.log(this.event);
            break;
        }
}

function outputAnimation(key){
    var clicked = document.querySelector("." + key);
    clicked.classList.add("clicked");
    setTimeout(function(){
        var clicked = document.querySelector("." + key);
        clicked.classList.remove("clicked");
    }, 100);
    
}