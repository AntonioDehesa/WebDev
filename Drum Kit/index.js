//document.querySelector("button").addEventListener("click",handleClick);
var allButtons = document.querySelectorAll(".drum");

allButtons.forEach(element => {
    element.addEventListener("click", function()
    {
        playAudio(this);
    });
});

function playAudio(clickedButton)
{
    /*var audio = new Audio("sounds/tom-1.mp3");
    audio.play();*/
    clickedButton.style.color = "white";
    clickedButton.classList.add("test");
}