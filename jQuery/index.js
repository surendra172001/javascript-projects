$(document).ready(function(){
    $("h1").css("color", "blue")
    
    $("button").click(function(){
        $("button").text("You just clicked");
        $("h1").html("<em>New text</em>")
    });

    $("input").keypress(event => {
        $("h1").text(event.key);
    });
});