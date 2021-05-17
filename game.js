var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

$(document).keydown(function () {
  if (!gameStarted) {
    gameStarted = true;
    nextSequence();
  }
});

$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");

    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    startOver();

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
}

function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  animatePress(randomChosenColour);

  playSound(randomChosenColour);
}

function playSound(name) {
  var colourSound = new Audio("sounds/" + name + ".mp3");
  colourSound.play();
}

function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");

  setTimeout(function () {
    $("." + currentColour).removeClass("pressed");
  }, 100);
}
