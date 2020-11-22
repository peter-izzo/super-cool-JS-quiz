//Global Variables
const timer = document.querySelector(".timer");
const answers = document.getElementById("answers");
var timeLeft = 120;
var score = 0;
let randomizeQuestions;
let currentQuestionIndex;

// var storeInitials = JSON.parse(localStorage.getItem("Initials"));
const highScore = JSON.parse(localStorage.getItem("Score")) || [];
const highScoreList = document.getElementById('highScoresList');

 
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
    {
        question: "Which of the following ISN'T a Javascript data-type",
        answers: [
            {text: 'a: Number', correct: false},
            {text: 'b: String', correct: false},
            {text: 'c: Float', correct: false},
            {text: 'd: Miniture', correct: true}
        ]
    },
    {
        question: "What is Homer Simpson's middle name?",
        answers: [
            {text: 'a: Jay', correct: true},
            {text: 'b: James', correct: false},
            {text: 'c: Jordan', correct: false},
            {text: 'd: Jared', correct: false}
        ]
    },
    {
        question: "In the hit 1990 sci-fi movie 'Total Recall', What was the main character's career in the beginning?",
        answers: [
            {text: 'a: Spy', correct: false},
            {text: 'b: Plumber', correct: false},
            {text: 'c: Construction Worker', correct: true},
            {text: 'd: Electrician', correct: false}
        ]
    },
    {
        question: "Where did Rocky's girlfriend work in Rocky I",
        answers: [
            {text: 'a: Flower Shop', correct: false},
            {text: 'b: Ice Cream Shop', correct: false},
            {text: 'c: Pet Shop', correct: true},
            {text: 'd: Movie Theatre', correct: false}
        ]
    },
    {
        question: "What is the best programming language?",
        answers: [
            {text: 'a: Javascript', correct: true},
            {text: 'b: Squark', correct: false},
            {text: 'c: P-Nutz', correct: false},
            {text: 'd: Javascript', correct: true}
        ]
    },
    {
        question: "Who was NOT one of the original creators of Doom",
        answers: [
            {text: 'a: John Romero', correct: false},
            {text: 'b: John Carmack ', correct: false},
            {text: 'c: Dave Taylor', correct: false},
            {text: 'd: Cliff Bleszinski', correct: true}
        ]
    }
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
    timeLeft = 15;
    score = 0;
    setTime();
    $(".start-quiz").addClass("d-none");
    $(".question").removeClass("d-none");
    randomizeQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    nextQuestion();
    
    //save score to local storage for high score
    // localStorage.setItem('playerScore', score)

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

//makes next button disappear until question is answered
function resetState() {
    $("#next").addClass("d-none");
    while(answers.firstChild) {
        answers.removeChild(answers.firstChild)
    }
}

//logic for correct anwsers
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

// handling of correct-incorrect answers
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

//clears button colors when new questions appear
function clearStatusClass(e) {
    e.classList.remove('btn-correct');
    e.classList.remove('btn-danger');
}

//Save High Score to local Storage
function saveHighScores(e){
    e.preventDefault();

    const listOfScores = {
        points: score,
        name: $("#hs-name").val()
    };

    highScore.push(listOfScores);

    highScore.sort( function (a, b) {
            return b.score - a.score;
        });

    highScore.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScore));



    // var storeInitials = JSON.parse(localStorage.getItem("Initials"));
    // var highScore = JSON.parse(localStorage.getItem("Score"));
};



// timer for quiz
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

//ends quiz
function quizOver() {
    $(".question").text("Your Quiz has finished.");
    $(".high-score").removeClass("d-none");
    $("#restart").removeClass("d-none");
    //$(".high-score").addClass("d-block");
    timeLeft = 0;
    $(".timer").text("0");
}

function displayMessage(type, message) {
    $(".msg").html(message);
    $(".msg").attr("class", type);
}

/**
 *  /////// EVENT LISTENERS \\\\\\\\
 */

// var currentQuestion = theQuestions[0];

$("#next").on("click", function() {
    currentQuestionIndex = currentQuestionIndex + 1;
    nextQuestion();
    if (currentQuestion === (theQuestions.length -1)) {
        $("#next").addClass("d-none");
    }

})

//Start quiz button clicked? START QUIZ
$(".start-quiz").on("click", startQuiz);

//Restart button clicked? RESTART QUIZ
$("#restart").click(function() {
    location.reload();
});

//Save scores to leaderboard
$("#submit").click(function (event) {
    event.preventDefault();

    var highScoreName = $("#hs-name").val();

    if (highScoreName === "") {
        displayMessage("text-danger", "Initials cannot be blank");
    } else{
        displayMessage("success", "High Score Saved!");

        localStorage.setItem("Initials", highScoreName);
        localStorage.setItem("Score", score);
    }

    // highScoreList.innerHTML = highScore.map(listOfScores => {
    //     return `<li class="high-score">${listOfScores.name} - ${listOfScores.score}</li>`}).join('');
})

