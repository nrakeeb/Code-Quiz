// declaring variables
var startBtn = document.getElementById("start");
var quizEl = document.getElementById("question");
var answersEl = document.getElementById("answers");
var timerEl = document.getElementById("countdown");
var instructionsEl = document.getElementById("instructions");
var checkEl = document.getElementById("check");
var endQuizEl = document.getElementById("endQuiz");
var containerEl = document.getElementById("container");
var scoreEl = document.getElementById("score");
var highscoresEl = document.getElementById("highscores");
var highscoresSectionEl = document.getElementById("highscoresSection");
var highscoresBtnl = document.getElementById("viewHighscoresBtn");
var score = 0;
var timeLeft = 75;
var questionNumber = 0;
var timerId = 0;
var highscoreArray = [];
startBtn.addEventListener("click", startQuiz);

// object array of questions and answers
var questionsArray = [
  {
    question: "Who invented JavaScript?",
    answers: ["Douglas Crockford", "Sheryl Sandberg", "Brendan Eich"],
    correctAnswer: "Brendan Eich"
  },
  {
    question: "Which one of these is a JavaScript package manager?",
    answers: ["Node.js", "TypeScript", "npm"],
    correctAnswer: "npm"
  },
  {
    question: "Which tool can you use to ensure code quality?",
    answers: ["Angular", "jQuery ", "RequireJS", "ESLint"],
    correctAnswer: "ESLint"
  },
  {
    question: "How do you write an IF statement in javascript?",
    answers: ["if i==5 then", "if (i==5)", "if i=5", "if i=5 then"],
    correctAnswer: "if (i==5)"
  }
];

// called when user clicks start button
function startQuiz() {
  countdown(); // call countdown function
  displayQuestions();
  instructionsEl.style.visibility = "hidden";
}

// countdown function starts when quiz is called. 
function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval);
      endQuiz(score);
    }
  }, 1000);
  timerEl.style.visibility = "visible"; //timer will be revealed when button clicked 
}

// when display question function is called it will go through the array of question mentioned above.
function displayQuestions() {
  quizEl.innerHTML = questionsArray[questionNumber].question;
  answersEl.innerHTML = "";

  for (var i = 0; i < questionsArray[questionNumber].answers.length; i++) {
    let answerBtn = document.createElement("button");
    answersEl.appendChild(answerBtn);
    answerBtn.classList.add("btn-primary");
    answerBtn.innerHTML += questionsArray[questionNumber].answers[i]
    answerBtn.setAttribute("onclick", "checkAnswer(this.innerHTML)");
  }
}

// When each answer is clicked it will display whether it is right or wrong.
// stops quiz when for statement goes through all questions.
function checkAnswer(selectedAnswer) {
  if (selectedAnswer == questionsArray[questionNumber].correctAnswer) {
    checkEl.innerHTML = "Correct!";
  }
  else {
    checkEl.innerHTML = "Wrong!";
    timeLeft -= 10;
  }
  if (questionNumber == questionsArray.length - 1) {
    score = timeLeft;
    timerEl.style.visibility = "hidden";
    endQuiz(score);
  }
  else {
    questionNumber++;
    displayQuestions();
    resetCheck();
  }
}

// displays message if correct or incorrect for 2 seconds when user clicks button. 
//if user clicks onto another answer before 2 seconds the next display message will appear.
function resetCheck() {
  clearTimeout(timerId);
  timerId = setTimeout(
    function () {
      checkEl.innerHTML = "";
    }, 2000);
}

// calls function to display score after quiz ends.
function endQuiz(score) {
  endQuizEl.style.visibility = "visible";
  containerEl.style.visibility = "hidden";
  scoreEl.innerHTML = "Your final score is " + score;
}

// adds highscore to local storage
function addHighscore(initials) {
  var highscore = {
    initials: initials,
    score: score
  };

  highscoreArray.push(highscore);
  var availableHighScores = JSON.parse(localStorage.getItem("highscores"));

  if (availableHighScores === null) {
    var localHighscore = JSON.stringify(highscoreArray);
  } else {
    highscoreArray = highscoreArray.concat(availableHighScores);
    var localHighscore = JSON.stringify(highscoreArray);
  }

  localStorage.setItem("highscores", localHighscore);
  getHighscore();
}

// get highscores from local storage
function getHighscore() {
  highscoreArray = [];

  var availableHighScores = JSON.parse(localStorage.getItem("highscores"));
  if (availableHighScores === null) {
    let element = document.createElement("p");
    highscoresEl.appendChild(element);
    element.innerHTML = "No highscores to show!";
  } else {
    highscoreArray = highscoreArray.concat(availableHighScores);

    while (highscoresEl.firstChild) {
      highscoresEl.removeChild(highscoresEl.firstChild);
    }

    for (var i = 0; i < highscoreArray.length; i++) {
      let element = document.createElement("p");
      highscoresEl.appendChild(element);
      element.innerHTML = highscoreArray[i].initials + " " + highscoreArray[i].score;
    }
  }

  highscoresEl.style.visibility = "visible";
  timerEl.style.visibility = "hidden";
  instructionsEl.style.visibility = "hidden";
  endQuizEl.style.visibility = "hidden";
  highscoresSectionEl.style.visibility = "visible";
  highscoresBtnl.style.visibility = "hidden";
}

function restartQuiz() {
  highscoresEl.style.visibility = "hidden";
  instructionsEl.style.visibility = "visible";
  timerEl.style.visibility = "visible";
  highscoresSectionEl.style.visibility = "hidden";
  highscoresBtnl.style.visibility = "visible";
  highscoreArray = [];
  questionNumber = 0;
  timeLeft = 75;
}

// clear highscoresfrom local storage
function clearHighscore() {
  localStorage.clear();
  highscoresEl.style.visibility = "hidden";
  while (highscoresEl.firstChild) {
    highscoresEl.removeChild(highscoresEl.firstChild);
  }
}