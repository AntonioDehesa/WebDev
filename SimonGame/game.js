var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var level = 0;
var i = 0;
var started = false;

function playSound(sound)
{
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

function nextSequence()
{
    var random = Math.floor(Math.random() * 4);
    gamePattern.push(buttonColours[random]);
    gamePattern.forEach(color => {
        setTimeout(function () {
            playSound(color);
            $("#" + buttonColours[random]).fadeIn(100).fadeOut(100).fadeIn(100);
        }, 300);
    });
    level++;
    $("#level-title").text("Level " + level);
}


function error()
{
    started = false;
    $('body').addClass("game-over");
    playSound("wrong");
    $("#level-title").text("Game Over, Press A Key to Start");
    setTimeout(function () 
    {
        $("body").removeClass("game-over");
    }, 200);
    gamePattern = [];
}

$(document).ready(function()
{
    $(document).keypress(function()
    {
        started = true;
        level = 0;
        nextSequence();
        $("#level-title").text("Level " + level);
        $('body').removeClass("game-over");
    }
    );
    $(".btn").on("click", function()
    {
        if (started)
        {
            var id = $(this).attr("id");
            console.log(gamePattern[i]);
            console.log(id);
            if(i < gamePattern.length)
            {
                if(gamePattern[i] !== id)
                {
                    error();
                }
                else
                {
                    $("#" + id).addClass("pressed");
                    setTimeout(function()
                    {
                        $("#" + id).removeClass("pressed");
                    },100);
                    //$("#" + id).fadeIn(100).fadeOut(100).fadeIn(100);
                    playSound(id);
                }
                i++;
                if ( i == gamePattern.length)
                {
                    i = 0;
                    nextSequence();
                }
            }
            else
            {
                setTimeout(function()
                {
                    nextSequence();
                },100);
                i = 0;
            }
            }
    });
});