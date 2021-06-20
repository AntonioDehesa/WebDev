var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomNumber2 = Math.floor(Math.random() * 6) + 1;

var dice1 = document.querySelector(".dice .img1");
var dice2 = document.querySelector(".dice .img2");

dice1.setAttribute("src","images/dice"+ randomNumber1 +".png");
dice2.setAttribute("src","images/dice"+ randomNumber2 +".png");

var winner = document.querySelector(".container h1");

var phrase = "Draw!";
if (randomNumber1 > randomNumber2)
{
    phrase = "<i class='fas fa-flag'></i> Player 1 wins!";
}
else if(randomNumber2 > randomNumber1)
{
    phrase = "Player 2 wins! <i class='fas fa-flag'></i>";
}

winner.innerHTML = phrase;
//winner.setAttribute("text",randomNumber1 > randomNumber2 ? "Player1");