var timer = document.querySelector(".timer");

var secondsLeft = 5;

//The Questions

var theQuestions = [
    {
        question: "Who Invented Javascript?",
        answers: {
            a: "Earl Pottajowski",
            b: "Sarah Connor",
            c: "Reince Priebus",
            d: "Brendan Eich"

        },
        correctAnswer: "d"
    },
    {
        question: "In the 1990 film Total Recall, what was the main character's name?",
        answers: {
            a: "Casey Ryback",
            b: "Douglas Quaid",
            c: "John Matrix",
            d: "Harry Tasker"
        },
        correctAnswer: "b"
    },
]

function startQuiz(){

};
function showHighScore(){

};

function setTime() {
    var timerInterval = setInterval(function() {
      secondsLeft--;
      $(".timer").text(secondsLeft + " seconds");
  
      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        quizOver();
      }
  
    }, 1000);
}

function quizOver() {
    $(".question").text("Time's up! Your Quiz has come to an end.");
    $(".high-score").removeClass("d-none");
    //$(".high-score").addClass("d-block");
}

setTime();