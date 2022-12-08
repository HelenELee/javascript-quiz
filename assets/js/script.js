//note questions and array of questions in questions.js

var score = 0;
var timeLeft = 50; //number of seconds allowed for quiz
var questionCount = 0; //track what question we are up to
var timeInterval; //user for overall timer

//get elements 
var startBtn = document.getElementById("start-quiz");
var mainH1 = document.getElementById("main-heading");
var mainContent = document.getElementById("main-content");
var question = document.getElementById("question");
var mainP = document.getElementById("main-paragraph");
var timer = document.getElementById("timer");
var result = document.getElementById("result");
var listEl = document.createElement("ul");
var form = document.createElement("form");

//creates timer for quiz
//time remaining is updated evey second
function countdown() {
    timeInterval = setInterval(function () {
      //decerment count and display time
      timeLeft--;
      timer.textContent = "Time: " + timeLeft + " seconds remaining.";
      //check if times up
      if(timeLeft === 0) {
        timer.textContent = "";
        clearInterval(timeInterval); 
        timeUp(); //alert to tell user time is up
        //if not already at the initials screen
        //clear questions and load initials screen
        if (!document.getElementById("initials-form")){
            clearScreen(); //removes elements for questions
            getInitials(); //print screen to get initials
        }
        
      }
    }, 1000);
  }

//creates the elements for holding the question and multi choice answers
function createQuestion(){
    mainContent.appendChild(listEl); //apend unordered list for questions
    listEl.setAttribute("id", "question-container");
    
    // Create unordered list items
    for (var i=1; i<5; i++){
        var li1 = document.createElement("li");
        li1.setAttribute("id", "option" + i);
        li1.setAttribute("class", "question-option");
        listEl.appendChild(li1);
    }
    //add event listener so when answer is clicked 
    //we check to see if its correct
    listEl.addEventListener("click", getAnswerHandler);

}
//atually load the question and multi choice answers into the 
//elemens created previously
function loadQuestionContent() {
    var questionObj; //holds the question details from the array of questions

    //check we still have questions to load and the time is not up
    if (questionCount < arrayQuestions.length && timeLeft > 0) {
        //write question to screen
        questionObj = arrayQuestions[questionCount];
        mainH1.innerHTML = questionObj.question;
        //write multi choice answers to screen 
        for (var i=1; i<5; i++){
            document.getElementById("option" + i).textContent = questionObj["option" + i];
        }
    } else {
       // either we have run out of questions or the time is up;
       //clear the time (time may already be up)
        clearInterval(timeInterval);
        //check if we have already reached the initials screen
        //reach it if all questions were answered
        //load initials screen if not already there
        if (!document.getElementById("initials-form")){
            clearScreen(); //remove elements for questions and answers
            getInitials();
        }
        
    }
    
}
//let user know if time is up
function timeUp() {
    clearInterval(timeInterval);
    alert("Sorry time is up!!");
}
//function called when multi choice answer is clicked
function getAnswerHandler(event) {
    //get value of clicked answer
    var answer = event.target.textContent;
    //check if its the correct by comparing to answer stored in
    //question object
    //print result
    if (answer === arrayQuestions[questionCount].answer) {
            result.innerHTML = "<hr><span class='italics'>Correct!</span>"
            score++;
          
    } else {
            result.innerHTML = "<hr><span class='italics'>Wrong!</span>"
            timeLeft=timeLeft-5;
           
    }
    //update question count - used as index into array of questions 
    questionCount++;
    //check if we still have time to do another question
    if (timeLeft >0) {
        //load next question
        var timeInterval = setTimeout(loadQuestionContent, 500);
    } else {
        //no time left, tell user, clear questions elements and load initials screen
        timeUp();
        clearScreen();
        getInitials();
    }
        
}
//remove elements we dont need at this stage of the quiz
function clearScreen() {
    
    mainH1.innerHTML = ""; //clear H1 which holds questions
    mainP.innerHTML = ""; //clear initial P that held introductory paragraph
    mainP.style.display = "none";
    //remove start button
    if (document.getElementById("start-quiz")) {
        document.getElementById("start-quiz").style.display = "none";
    }
    //remove any elements from questions
    while (listEl.hasChildNodes()) {
        listEl.removeChild(listEl.firstChild);
    }
    //remove div that holds question elements
    while (mainContent.hasChildNodes()) {
        mainContent.removeChild(mainContent.firstChild);
    }
    //clear correct/wrong message
    result.innerHTML = "";
    
}

//handler thats called when start button is clicked
function startQuizHandler(event) {
    event.preventDefault(); //prevent submitting of form
    score = 0; //initially score is 0
    timer.className = "timer";
    countdown(); //start timer

    //remove initial paragraph with instructions
    mainP.textContent = "";
    mainP.style.display = "none";
    startBtn.style.display = "none"; //remove start button
    createQuestion(); //create elements for questions
    loadQuestionContent(); //load questions content
}
//called when reached ens fo all questions
//loads screen prompting for initials
function getInitials() {
    timer.textContent = "Time: 0 seconds remaining.";
    mainH1.textContent = "All done!";
    mainP.textContent = "Your final score is " + score;
    mainP.style.display = "block";

    //create label for field used for initals
    var initialsLabel = document.createElement("label");
    initialsLabel.setAttribute("for", "input");
    initialsLabel.textContent ="Enter initials:";
    initialsLabel.setAttribute("class", "label");
    
    //create field for initials
    var input = document.createElement("input");
    input.setAttribute("id", "initials");
    input.maxLength = "2"; //only allow user enter 2 initials

    //create submit button
    var submitInitials = document.createElement("button");
    submitInitials.setAttribute("id", "submit-initials");
    submitInitials.innerText = "Submit";

    //append form and set attributes
    mainContent.appendChild(form);
    form.setAttribute("id", "initials-form");
    form.appendChild(initialsLabel);
    form.appendChild(input);
    form.appendChild(submitInitials);
    //add listener for click event on submit button
    submitInitials.addEventListener("click", saveScoreHandler);
}
//function called when initials are submitted
function saveScoreHandler(event){
    event.preventDefault(); //prevent submitting of form
    var arrayScores;
    //get array of stored scores
    var storedScores = localStorage.getItem("scores");
    //validation - must enter initials
    if (document.getElementById("initials").value == ''){
     alert("Please enter your initials.");
     return;
    }
    //create object from current score and initials
    var currentScore = {
    initials: document.getElementById("initials").value,
    score: score
   }  
  
   //check if this is the first score we are saving
   if (storedScores == null){
     arrayScores = [currentScore];
   } else {
    //already have saved scores so push current onto array
     arrayScores = JSON.parse(storedScores);
     arrayScores.push(currentScore);
  }
   //save all scores to local storage again - including current score
   localStorage.setItem("scores", JSON.stringify(arrayScores));
   //call function to print scores to screen
   printHighScores();
}

//fuction to print all scores to screen
function printHighScores () {
    var liElement;
    var arrayScores;
    var scoreObj;
    clearScreen(); //ensure all questions elements have been removed
    mainH1.textContent = "High Scores";
    var scores = localStorage.getItem("scores");
    //check there are scores to print
    if (scores != null){
        //convert to array from string
        arrayScores = JSON.parse(scores);
        //loop through array of scores and print
        for (let i=0; i<arrayScores.length; i++){
            liElement = document.createElement("li");
            liElement.setAttribute("class", "high-scores-list");
            scoreObj = arrayScores[i];
            liElement.textContent = (i+1) + ". " + scoreObj.initials + " " + scoreObj.score 
            listEl.appendChild(liElement);
        }
        mainContent.appendChild(listEl); //display scores
    }
    //create back button
    var backButton = document.createElement("button");
    backButton.setAttribute("id", "back-button");
    backButton.innerText = "Back";
    
    //create buton to clear scores from storage
    var clearHighScores = document.createElement("button");
    clearHighScores.setAttribute("id", "clear-high-scores");
    clearHighScores.innerText = "Clear High Scores";
    
    //display buttons
    mainContent.appendChild(backButton);
    mainContent.appendChild(clearHighScores);
    //add event listeners to buttons
    backButton.addEventListener("click", goBackHandler);
    clearHighScores.addEventListener("click", clearHighHandler);
}
//function called to remove stored scores from local storage
function clearHighHandler(event) {
    event.preventDefault();
    localStorage.removeItem("scores");
    //re print scores i.e no scores
    printHighScores(); 
}

//function called when click back button - brigs you to start page again
function goBackHandler() {
    location.reload();
}
//add function to start quiz
startBtn.addEventListener("click", startQuizHandler);


