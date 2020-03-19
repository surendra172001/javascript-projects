const getRandomNumbers = function () {
    return {
        num1 : Math.floor(Math.random() * 6) + 1,
        num2 : Math.floor(Math.random() * 6) + 1,
    }
}

const getResult = function(randomNumbers) {
    let result = "";

    if(randomNumbers.num1 > randomNumbers.num2) {
        result = "🚩 Player 1 Wins!";
    } else if(randomNumbers.num1 < randomNumbers.num2) {
        result = "Player 2 Wins!🚩";
    } else {
        result = "Draw!";
    }

    return result;
}

const randomNumbers = getRandomNumbers();

const result = getResult(randomNumbers);

document.querySelector("h1").innerText = result;

const img1Location = "./images/dice" + randomNumbers.num1 + ".png";
const img2Location = "./images/dice" + randomNumbers.num2 + ".png";

const img1 = document.querySelector(".img1").setAttribute("src", img1Location);
const img2 = document.querySelector(".img2").setAttribute("src", img2Location);