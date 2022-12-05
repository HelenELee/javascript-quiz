//alert("hello");
const q1 = {
    question:"Commonly used Data types do not include",
    option1: "1. strings",
    option2: "2. booleans",
    option3: "3. alerts",
    option4: "4. numbers",
    answer: "3. alerts"
}

const q2 = {
    question:"The condition if and if/else statement is enclosed within _____",
    option1: "1. quotes",
    option2: "2. curly brackets",
    option3: "3. parenthesis",
    option4: "4. square brackets",
    answer: "3. parenthesis"
}

const q3 = {
    question:"Arrays in javascript can be used to store _____",
    option1: "1. numbers and strings",
    option2: "2. other arrays",
    option3: "3. booleans",
    option4: "4. all of the above",
    answer: "4. all of the above"
}

const q4 = {
    question:"4. The condition if and if/else statement is enclosed within _____",
    option1: "1. quotes",
    option2: "2. curly brackets",
    option3: "3. parenthesis",
    option4: "4. square brackets",
    answer: "3. parenthesis"
}

const arrayQuestions = [q1, q2, q3, q4];

var score = 0;
var timeLeft = 5;
var questionCount = 0;
var timeInterval;

var startBtn = document.getElementById("start-quiz");
var mainH1 = document.getElementById("main-heading");
var mainContent = document.getElementById("main-content");
var question = document.getElementById("question");
var mainP = document.getElementById("main-paragraph");
var timer = document.getElementById("timer");
var result = document.getElementById("result");
var listEl = document.createElement("ul");
var form = document.createElement("form");
//alert(mainH1.textContent);

function countdown() {
    
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
      
      timeLeft--;
      timer.textContent = "Time: " + timeLeft + " seconds remaining.";
      if(timeLeft === 0) {
        // Stops execution of action at set interval
        timer.textContent = "";
        clearInterval(timeInterval);
        timer.textContent = "Time up!!!";
        timer.className = "timer-up";
        timeUp();
        if (!document.getElementById("initials-form")){
            clearScreen();
            getInitials();
        }
        
      }
    }, 1000);
  }

  function loadNextQuestion() {
    //alert("loading next question...");
    var timeInterval = setTimeout(function () {
        alert("loaded");
    } , 3000);
  }

function createQuestion(){
   // var listEl = document.createElement("ul");
   mainContent.appendChild(listEl);
   listEl.setAttribute("id", "question-container");
   
   //var li1 = document.createElement("li");
    //li1.textContent = questionObj["option"+ 1];
    //mainContent.appendChild(li1);
    
    // Create unordered list items
    for (var i=1; i<5; i++){
        var li1 = document.createElement("li");
       // li1.textContent = questionObj["option"+ i];
        li1.setAttribute("id", "option" + i);
        li1.setAttribute("class", "question-option");
        listEl.appendChild(li1);
    }

    listEl.addEventListener("click", getAnswer);

}

function loadQuestionContent() {
    console.log("count = " + questionCount);
    var questionObj;
    if (questionCount < arrayQuestions.length && timeLeft > 0) {
        questionObj = arrayQuestions[questionCount];
        mainH1.innerHTML = questionObj.question;
        for (var i=1; i<5; i++){
            document.getElementById("option" + i).textContent = questionObj["option" + i];
        }
    } else {
       // alert("end of quiz");
        clearInterval(timeInterval);
        if (!document.getElementById("initials-form")){
            clearScreen();
            getInitials();
        }
        
    }
    
}

function timeUp() {
    clearInterval(timeInterval);
    alert("time up!!");
}

function getAnswer(event) {
    //alert(event.target.textContent);
    var answer = event.target.textContent;

    var answer = event.target.textContent;
       console.log(answer + " " + arrayQuestions[questionCount].answer);

        if (answer === arrayQuestions[questionCount].answer) {
            result.innerHTML = "<hr><span class='italics'>Correct!</span>"
            score++;
           // alert('correct');
        } else {
            result.innerHTML = "<hr><span class='italics'>Wrong!</span>"
            timeLeft=timeLeft-5;
           // alert('wrong');
        }
        questionCount++;
        if (timeLeft >0) {
            var timeInterval = setTimeout(loadQuestionContent, 1000);
        } else {
            timeUp();
            clearScreen();
            getInitials();
        }
        
}

function clearScreen() {
    console.log("clearScreen");

    mainH1.innerHTML = "";
    mainP.innerHTML = "";
    
    if (document.getElementById("start-quiz")) {
        document.getElementById("start-quiz").style.display = "none";
    }
    while (listEl.hasChildNodes()) {
        listEl.removeChild(listEl.firstChild);
    }

    while (mainContent.hasChildNodes()) {
        console.log("removing child");
        mainContent.removeChild(mainContent.firstChild);
    }
    result.innerHTML = "";
    mainP.style.display = "none";
}


function startQuiz(event) {
    event.preventDefault();
    score = 0;
    timer.className = "timer";
    countdown();
    mainP.textContent = "";
    mainP.style.display = "none";
    startBtn.style.display = "none";
    createQuestion();
    loadQuestionContent();
    
    
    //mainContent.innerHTML = "questions";

}

function getInitials() {
    mainH1.textContent = "All done!";
    mainP.textContent = "Your final score is " + score;
    mainP.style.display = "block";
    var initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("for", "input");
    initialsLabel.textContent ="Enter initials:";
    initialsLabel.setAttribute("class", "label");

    var input = document.createElement("input");
    input.setAttribute("id", "initials");

    var submitInitials = document.createElement("button");
    submitInitials.setAttribute("id", "submit-initials");
    submitInitials.innerText = "Submit";

    mainContent.appendChild(form);
    form.setAttribute("id", "initials-form");
    form.appendChild(initialsLabel);
    form.appendChild(input);
    form.appendChild(submitInitials);

    submitInitials.addEventListener("click", saveScore);
}

function saveScore(event){
    console.log("saveScore");
    event.preventDefault();
  var arrayScores;

  if (document.getElementById("initials").value == ''){
    alert("Please enter your initials.");
    return;
  }
  var currentScore = {
    initials: document.getElementById("initials").value,
    score: score
  }  
  var storedScores = localStorage.getItem("scores");

  if (storedScores == null){
    arrayScores = [currentScore];
  } else {
    arrayScores = JSON.parse(storedScores);
    arrayScores.push(currentScore);
  }
  localStorage.setItem("scores", JSON.stringify(arrayScores));
  console.log(arrayScores);
  printHighScores();
}

function removeInitialsForm() {
    mainH1.textContent = "";
    mainP.textContent = "";
}

function printHighScores () {
    var liElement;
    var arrayScores;
    var scoreObj;
    clearScreen();
    mainH1.textContent = "High Scores";
    var scores = localStorage.getItem("scores");
    if (scores == null){

    } else {
        arrayScores = JSON.parse(scores);
        for (let i=0; i<arrayScores.length; i++){
            liElement = document.createElement("li");
            liElement.setAttribute("class", "high-scores-list");
            scoreObj = arrayScores[i];
            liElement.textContent = (i+1) + ". " + scoreObj.initials + " " + scoreObj.score 
            listEl.appendChild(liElement);
        }
        mainContent.appendChild(listEl); 
    }
    var backButton = document.createElement("button");
    backButton.setAttribute("id", "back-button");
    backButton.innerText = "Back";
    

    var clearHighScores = document.createElement("button");
    clearHighScores.setAttribute("id", "clear-high-scores");
    clearHighScores.innerText = "Clear High Scores";
    

    mainContent.appendChild(backButton);
    mainContent.appendChild(clearHighScores);
    
    backButton.addEventListener("click", goBack);
    //clearHighScores.addEventListener("click", clearHighScores);
    clearHighScores.addEventListener("click", clearHigh);
}

function clearHigh(event) {
    console.log("clearing high scores");
    event.preventDefault();
    localStorage.removeItem("scores");
    printHighScores();
}

function goBack() {
    console.log('go back');
    location.reload();
}

startBtn.addEventListener("click", startQuiz);
//localStorage.removeItem("scores");

