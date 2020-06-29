// JavaScript source code
var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var secondsLeft = (questions.length * 15 + 1);
var timerEl = document.getElementById("timer");
var submitScoreEl = document.querySelector("#submit-score");
var userScoreEl = document.getElementById("user-score");
 
var userNameInput;
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");

var questionNumber = -1;
var answer;


function startTimer() {
    // swap welcome msg w/ questions
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');

    // timer set and begins 90s countdown
    setTimer();
    // create questions to display
    makeQuestions();
}

function setTimer() {

    var countdown = setInterval(function () {
        secondsLeft--;
        timerEl.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var q = 0; q < choices.length; q++) {
        var nextChoice = document.createElement("button");

        nextChoice.textContent = choices[q]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-3 m-1 btn btn-light btn-block");
    }
}

// display option to enter name to scoreboard
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreEl.textContent = "Your final score is " + secondsLeft + ".";
	
	 localStorage.setItem("userScoreEl", secondsLeft);

}

// Event Listeners for Main Buttons
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    
    window.location.href = './highscores.html'
	
	
	
});

function addScore () {
    userNameInput = document.getElementById("userName").value
     localStorage.setItem("userNameInput", userNameInput);

    // create a new object with name and score keys
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    // check if there are scores in local storage first(get it)
    //if not, make a new/blank array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // push object into score array
    highScores.push(newScore)
    // turn objects into an array of strings then put it into local storage
    localStorage.setItem("highScores", JSON.stringify(highScores));

}

function hideFeedback(){
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.style.display='none'
}
  var count = 0;
  var timeleft = 90;
function showFeedback(){
	
	
    var pEl= document.getElementsByClassName("feedback")[0]
    pEl.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) 
{
    var pEl= document.getElementsByClassName("feedback")[0]
  
    // evaluation of user's answer choices & feedback
    if (answer === event.target.textContent)
	{   
        //count = count +10;
       // alert("1=>"+count);
        pEl.innerHTML = "Correct!";
        setTimeout(hideFeedback,1000);
        showFeedback();   
    } else 
	{
		
        pEl.innerHTML = "Sorry, that's incorrect.";
        setTimeout(hideFeedback,1000);
        secondsLeft = secondsLeft - 10;
        showFeedback();
		
		count = 10;
		timeleft = timeleft - count;

    }    
    makeQuestions();
});
	


var downloadTimer = setInterval(function(){
  if(timeleft <= 0)
  {
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Finished";
  } 
  else 
  {
	console.log(count++);
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
	
  }
  timeleft -= 1;
}, 1000);
