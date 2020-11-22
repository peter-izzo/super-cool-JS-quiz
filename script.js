//Global Variables
var timer = document.querySelector(".timer");
const answers = document.getElementById("answers");
var timeLeft = 15;
var score = 0;
let randomizeQuestions;
let currentQuestionIndex;
 
//The Quiz Questions
var questions = [
    {
        question: "Who Invented Javascript?",
        answers: [
            {text: 'a: Earl Pottajowski', correct: false},
            {text: 'b: Sarah Connor', correct: false},
            {text: 'c: Reince Priebus', correct: false},
            {text: 'd: Brendan Eich', correct: true}

        ]
    },
    {
        question: "In the 1990 film Total Recall, what was the main character's name?",
        answers: [
            {text: 'a: Casey Ryback', correct: false},
            {text: 'b: Douglas Quaid', correct: true},
            {text: 'c: John Matrix', correct: false},
            {text: 'd: Harry Tasker', correct: false}
        ]
    },
]

/**
 *   ////////// Main Functions \\\\\\\
 */

//Handles wrong answers and decreases time
function handleWrongAnswer() {
    timeLeft = timeLeft - 1;
};

//Starts the Quiz game
function startQuiz(){
    setTime();
    $(".start-quiz").addClass("d-none");
    $(".question").removeClass("d-none");
    randomizeQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    nextQuestion();
    score = 0;
    
    //save score to local storage for high score
    localStorage.setItem('playerScore', score)

};

function nextQuestion() {
    resetState();
    displayQuestion(randomizeQuestions[currentQuestionIndex])
};

function displayQuestion(question){
    $("#current").html(`<h3>${question.question}</h3>`);
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add('btn', 'btn-lg', 'btn-primary', 'my-2');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer);
        answers.appendChild(button);
    })
}

function resetState() {
    $("#next").addClass("d-none");
    while(answers.firstChild) {
        answers.removeChild(answers.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    Array.from(answers.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    });
    if (randomizeQuestions.length > currentQuestionIndex + 1) {
        $("#next").removeClass('d-none');
    } else {
        quizOver();
    }
};

function setStatusClass(e, correct) {
    clearStatusClass(e);
    if (correct) {
        e.classList.add('btn-success');
        score++;
        $(".score").text(score);
        console.log(score);
    } else{
        e.classList.add('btn-danger');
        handleWrongAnswer();
    }
}

function clearStatusClass(e) {
    e.classList.remove('btn-correct');
    e.classList.remove('btn-danger');
}

function showHighScore(){

};


function setTime() {
    var timerInterval = setInterval(function() {
      timeLeft--;
      $(".timer").text(timeLeft + " seconds");
  
      if(timeLeft === 0 || timeLeft < 0) {
        clearInterval(timerInterval);
        quizOver();
      }
      console.log(timeLeft);

  
    }, 1000);
}

function quizOver() {
    $(".question").text("Your Quiz has finished.");
    $(".high-score").removeClass("d-none");
    //$(".high-score").addClass("d-block");
    timeLeft = 0;
    $(".timer").text("0");
}

// var currentQuestion = theQuestions[0];

$("#next").on("click", function() {
    currentQuestionIndex = currentQuestionIndex + 1;
    nextQuestion();
    if (currentQuestion === (theQuestions.length -1)) {
        $("#next").addClass("d-none");
    }

})

$(".start-quiz").on("click", startQuiz);

//setTime();