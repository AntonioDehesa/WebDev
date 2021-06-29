var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var i = 0;

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
        setTimeout(function()
        {
            $(this).addClass("pressed");
        },100);
        $(this).removeClass("pressed");
        playSound(color);
    });
}

$(document).ready(function()
{
    nextSequence();
    $(".btn").on("click", function()
    {
        var id = $(this).attr("id");
        console.log(gamePattern[i]);
        console.log(id);
        if(i < gamePattern.length)
        {
            if(gamePattern[i] !== id)
            {
                $(document).addClass("game-over");
                playSound("wrong");
            }
            else
            {
                setTimeout(function()
                {
                    $(this).addClass("pressed");
                },100);
                $(this).removeClass("pressed");
                //$("#" + id).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(id);
            }
            i++;
            nextSequence();
        }
        else
        {
            i = 0;
        }
    });
});

