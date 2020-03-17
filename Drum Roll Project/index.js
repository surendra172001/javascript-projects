'use strict'

const buttons = document.querySelectorAll(".drum");

const audio = [
    new Audio("./sounds/tom-1.mp3"),
    new Audio("./sounds/tom-2.mp3"),
    new Audio("./sounds/tom-3.mp3"),
    new Audio("./sounds/tom-4.mp3"),
    new Audio("./sounds/snare.mp3"),
    new Audio("./sounds/crash.mp3"),
    new Audio("./sounds/kick-bass.mp3"),
];

for(let i = 0; i < 7; i++) {
    buttons[i].addEventListener("click", function () {
        addButtonAnimation(buttons[i].innerHTML);
        audio[i].play();
    });
}

document.addEventListener("keypress", function (event) {
    switch(event.key) {
        case 'w': 
            addButtonAnimation('w');
            audio[0].play();
            break;
        case 'a': 
            addButtonAnimation('a');
            audio[1].play();
            break;
        case 's': 
            addButtonAnimation('s');
            audio[2].play();
            break;
        case 'd': 
            addButtonAnimation('j');
            audio[3].play();
            break;
        case 'j': 
            addButtonAnimation('k');
            audio[4].play();
            break;
        case 'k': 
            addButtonAnimation('l');
            audio[5].play();
            break;
        case 'l': 
            addButtonAnimation('l');
            audio[6].play();
            break;
    }
});

function addButtonAnimation(key) {
    const activeButton = document.querySelector('.' + key);

    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);

}