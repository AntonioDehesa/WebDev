$(document).ready(function()
{
    //$("h1").css("color","red");
    $("h1").addClass("big-title");
    $("h1").text("Changed text!");
    $("button").html("<em>bye</em>");
    $("a").attr("href","https://wwww.yahoo.com");

    $("h1").on("mouseover",function()
    {
        $("h1").css("color","purple");
    });

    $("button").on("click",function()
    {
        //$("h1").fadeToggle();
        //$("h1").slideToggle();
        $("h1").animate(//slowly changes to a desired css, but only those that include numerical values
            {
                opacity: 0.5
            });
    });
});


//<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>