var buttonColors = ["red", "blue", "yellow", "green"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var pressed = false;

function nextSequence(){
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    useSound(randomChosenColor);
}

function useSound(button){
    switch(button){
        case "blue" :
            var audio = new Audio("sounds/blue.mp3");
            audio.play();
            break;
        case "green" :
            var audio = new Audio("sounds/green.mp3");
            audio.play();
            break;
        case "red" :
            var audio = new Audio("sounds/red.mp3");
            audio.play();
            break;
        case "yellow" :
            var audio = new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        default :
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            break;       
    }
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    var valid = true;
    if(userClickedPattern[userClickedPattern.length-1] !== gamePattern[userClickedPattern.length-1]){
        valid = false;
        var audio = new Audio("sounds/wrong.mp3");
        audio.play;
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
        
    }
    if(userClickedPattern.length === gamePattern.length  && valid){ 
        userClickedPattern = [];
        setTimeout(nextSequence,1000);
        
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    pressed = false;
    userClickedPattern = [];
}

$(document).keydown(function(event){
    if(!pressed){
        $("#level-title").text("Level " + level);
        pressed = true;
        nextSequence();
    }
});

$(".btn").on("click", function(){
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    useSound(this.id);
    console.log(userClickedPattern); 
    animatePress(userChosenColor);
    checkAnswer(level); 
});