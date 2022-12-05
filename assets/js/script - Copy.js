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
    answer: "3. parentheses"
}

const arrayQuestions = [q1, q2];

var score = 0;
var timeLeft = 5;
var questionCount = 0;

var startBtn = document.getElementById("start-quiz");
var mainH1 = document.getElementById("main-heading");
var mainContent = document.getElementById("main-content");
var question = document.getElementById("question");
var mainP = document.getElementById("main-paragraph");
var timer = document.getElementById("timer");
var result = document.getElementById("result");
//alert(mainH1.textContent);

function countdown() {
    
  
    // TODO: Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
      
      timeLeft--;
      timer.textContent = "Time: " + timeLeft + " seconds remaining.";
      if(timeLeft === 0) {
        // Stops execution of action at set interval
        timer.textContent = "";
        clearInterval(timeInterval);
        timer.textContent = "Time up!!!";
        timer.className = "timer-up";
      }
    }, 1000);
  }

  function loadNextQuestion() {
    //alert("loading next question...");
    var timeInterval = setTimeout(function () {
        alert("loaded");
    } , 3000);
  }

function createQuestion(questionObj){
    var listEl = document.createElement("ul");
    mainContent.appendChild(listEl);
    mainContent.setAttribute("id", "question-container");
    //var li1 = document.createElement("li");
    //li1.textContent = questionObj["option"+ 1];
    //mainContent.appendChild(li1);

    
    // Create unordered list items
    for (var i=1; i<5; i++){
        var li1 = document.createElement("li");
        li1.textContent = questionObj["option"+ i];
        li1.setAttribute("id", "option" + i);
        li1.setAttribute("class", "question-option");
        mainContent.appendChild(li1);
    }

}

function formatQuestion (questionObj) {
    var textQuestion = "<ul id='question-container'>";
    for (var i=1; i<5; i++){
        textQuestion = textQuestion + "<li id='" + i +"'>" + questionObj["option"+ i] + "</li>";
    }
    //textQuestion = textQuestion + "<li id='" + "" +"'>" + questionObj.option1 + "</li>";
   // textQuestion = textQuestion + "<li>" + questionObj.option2 + "</li>";
    //textQuestion = textQuestion + "<li>" + questionObj.option3 + "</li>";
    //textQuestion = textQuestion + "<li>" + questionObj.option4 + "</li>";
    //textQuestion = textQuestion + "</ul>";
    //alert(textQuestion);
    return textQuestion;
}

function getAnswer(event) {
    //alert(event.target.textContent);
    var answer = event.target.textContent;

    var answer = event.target.textContent;
       // alert(answer + " " + arrayQuestions[0].answer);

        if (answer === arrayQuestions[0].answer) {
            result.innerHTML = "<hr>Correct!"
            score++;
           // alert('correct');
        } else {
            result.innerHTML = "<hr>Wrong!"
            timeLeft=timeLeft-5;
           // alert('wrong');
        }
        questionCount++;
        loadNextQuestion();
}

function startQuiz(event) {
    event.preventDefault();
    score = 0;
    timer.className = "timer";
    countdown();
    //alert(arrayQuestions[1].question);
    mainH1.innerHTML = arrayQuestions[questionCount].question;
    mainP.textContent = "";
    mainP.style.display = "none";
    startBtn.style.display = "none";
    //mainContent.innerHTML = formatQuestion(arrayQuestions[0]);
    createQuestion(arrayQuestions[questionCount]);
    var questContainer = document.getElementById('question-container');

    questContainer.addEventListener("click", getAnswer)
    
    //mainContent.innerHTML = "questions";

}
startBtn.addEventListener("click", startQuiz);

