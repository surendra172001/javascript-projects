'use strict'

//#####################################################
//################### KEY RELATED #####################
//#####################################################
let firstPress = true;
let keyPressed = false;


//#####################################################
//################### INDEX RELATED ###################
//#####################################################
let currentLevel = 0;
let level = 0;


//#####################################################
//###################### ARRAYS #######################
//#####################################################
let gamePattern = [];
let userClickedPattern = [];

const buttonColors = ['red', 'blue', 'green', 'yellow'];


//###################### SOUND #######################
const audio = [
    new Audio("./sounds/blue.mp3"),
    new Audio("./sounds/green.mp3"),
    new Audio("./sounds/red.mp3"),
    new Audio("./sounds/yellow.mp3"),
    new Audio("./sounds/wrong.mp3"),
];




//#####################################################
//##################### CLICK #########################
//#####################################################

$(document).click(function(event) {

    if(keyPressed) {
        let userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);

        checkPattern(userClickedPattern.length - 1);

    }

});

function checkPattern(levelNum) {

    if(gamePattern[levelNum] === userClickedPattern[levelNum]) {

        playSound(userClickedPattern[levelNum]);
        if(gamePattern.length === userClickedPattern.length) {
            userClickedPattern.length = 0;
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {

        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 100);
        $("#level-title").html("Game Over, Press Any key to Restart");
        startOver();

    }

}






//#####################################################
//################# KEY PRESS #########################
//#####################################################

$(document).keypress(function(event){
    if(firstPress) {
        firstPress = false;
        keyPressed = true;
        nextSequence();
    }
});




//#####################################################
//################# NEXT SEQUENCE #####################
//#####################################################
function nextSequence() {

    level += 1;

    $("#level-title").html("Level " + level);

    let  randomNumber = Math.floor(Math.random()*3) + 1;
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    playSound(randomChosenColor);
    animatePress(randomChosenColor);

}





//#####################################################
//################# SOUND PLAY ########################
//#####################################################
function playSound(key) {
    switch(key) {
        case 'blue':
            audio[0].play();
            break;
        case 'green':
            audio[1].play();
            break;
        case 'red':
            audio[2].play();
            break;
        case 'yellow':
            audio[3].play();
            break;
        case 'wrong':
            audio[4].play();
            break;
        default:
            break;
    }
}




//#####################################################
//################# KEY ANIMATION #####################
//#####################################################
function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}


function startOver() {

    gamePattern.length = 0;
    userClickedPattern.length = 0;
    keyPressed = false;
    firstPress = true;
    level = 0;

}
