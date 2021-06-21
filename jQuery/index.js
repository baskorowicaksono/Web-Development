$("h1").css("color", "red");
$("button").html("<em>Jancok</em>");
$("a").attr("href", "https://www.twitter.com");

$("h1").click(function(){
    $("h1").css("color", "purple");
})

$("button").click(function(){
    $("button").css("color", "green");
})

// $("input").keydown(function(event){
//     $("h1").text(event.key);
// }

// $("button").click(function(){
//     $('h1').toggle();   
// })

// $("button").click(function(){
//     $("h1").fadeToggle();
// })

// $("button").click(function(){
//     $("h1").slideToggle();
// })

$("button").click(function(){
    $("h1").slideUp().slideDown().animate({opacity : 0.5});
})