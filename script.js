var timer = document.querySelector(".timer");

var timeLeft = 15;
var score = 0;
var currentQuestion = {};

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

function handleWrongAnswer() {

};

//This function starts the quiz mechanics
function startQuiz(){
    $(".start-quiz").addClass("d-none");
    // var output = [];
    // var answers = [];
    score = 0;
    questionCounter = 0;
    //save score to local storage for high score
    localStorage.setItem('playerScore', score)




/*
    theQuestions.forEach(
        function (currentQuestion, questionNumber) {
            var answers = [];

            for (letter in currentQuestion.answers) {
                answers.push(
                    `
                <button class="btn btn-primary answers>${letter}: ${currentQuestion.answers[letter]}
                </button>
                `
                );
            }

            output.push(
                `<div class="new-question"><h2> ${currentQuestion.question}</h2>
            </div>
            <div class="new-answer"> ${answers.join('')} </div>
            `
            );
        }
    );
*/
    $(".question").append(output.join(''));

};

function showHighScore(){

};

function setTime() {
    var timerInterval = setInterval(function() {
      timeLeft--;
      $(".timer").text(timeLeft + " seconds");
  
      if(timeLeft === 0) {
        clearInterval(timerInterval);
        quizOver();
      }
  
    }, 1000);
}

function quizOver() {
    $(".question").text("Your Quiz has finished.");
    $(".high-score").removeClass("d-none");
    //$(".high-score").addClass("d-block");
}

var currentQuestion = theQuestions[0];

$("#next").on("click", function() {
    currentQuestion = currentQuestion + 1;
    if (currentQuestion === (theQuestions.length -1)) {
        $("#next").addClass("d-none");
    }

})

$(".start-quiz").on("click", startQuiz);
$(".start-quiz").on("click", setTime);

//setTime();