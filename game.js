var buttonColours = ["red","blue","green","yellow"];
var i = 0;
var ucp = [];
var randomChosenColour;
var level = 1;
$(document).keypress(function(){
    if (level==1) {
        nextSequence();
    }
})
function nextSequence(){
    $("#level-title").text("Level "+level);
    randomChosenColour = buttonColours[Math.floor(Math.random()*4)];
    playSound("sounds/"+randomChosenColour+".mp3")
    animatePress(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    console.log(randomChosenColour+"   success");
    level++;
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    })
}
function playSound(name) {
    new Audio(name).play();
}
$(".btn").click(function (event) {
    var userChosenColour = $(this).attr("id");
    playSound("sounds/"+userChosenColour+".mp3");
    animatePress(userChosenColour);
    checkAnswer(userChosenColour)

})
function checkAnswer(userChosenColour) {
    if (i<ucp.length&&ucp[i]==userChosenColour) {
        i++;
        console.log(ucp);
    }
    else if (userChosenColour==randomChosenColour&&i==ucp.length) {
        ucp.push(randomChosenColour);
        console.log(ucp);
        i=0;
        setTimeout(function () {
            nextSequence();  
        },500);
    } else {
        console.log("terminate");
        $("#level-title").text("Press A Key to Restart");
        ucp=[];
        level = 1;
        new Audio("sounds/wrong.mp3").play();   
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },500);
    }
}