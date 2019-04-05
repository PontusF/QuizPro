var httpRequest = new XMLHttpRequest;
loadAPI();
//Loads the questiondata and prepares everything needed to play a new game.
function loadAPI(){
  questionIndex =0;
  httpRequest.onreadystatechange = function(){
    if (httpRequest.readyState ===4){
      if (httpRequest.status ===200){
        console.log(httpRequest.response);
        splitFunction(httpRequest.response);
      } else {
        console.console.log("HTTP status: " + httpRequest.status);
      }
    } else {
      console.log(httpRequest.readyState);
    }
  }
  httpRequest.open('GET','https://opentdb.com/api.php?amount=7&category=15&type=multiple', true);
  httpRequest.responseType="json";
  httpRequest.send();
}


//initialize all variables used by functions throughout the 'script.js' file.
var questionArray;
var demo = document.getElementById("demo");
var questionIndex =0;
var correctAnswerPos = Math.floor(Math.random() * 4);
var correctAnswer = document.getElementById("answers").children[correctAnswerPos];
var wrongAnswer;
var amountOfPoints=0.0;
var gameState="ingame";
var resetButton = document.getElementById("reset");


//prepares game based on loaded Json from the webAPI
function splitFunction(apiJson){
  questionArray = apiJson;
  demo.innerHTML=assignQuestion();
  correctAnswer.innerHTML=assignCorrectAnswer();
  loadAllAnswers();
  prepareAnswerClasses();
}


// loads next set of answers and corresponding question
function loadNext(){
  var question = document.getElementsByClassName("question")[0].classList;
  questionIndex++;

  //if there is more questions, else run gameover code.
  if (questionIndex != questionArray.results.length){
    loadAllAnswers();
    prepareAnswerClasses();
    question.remove('invisible');
    question.add('visibleQuestion');
  }else{
    gameOver();
  }

}


//The "Win screen". Changes the "main" div of the screen to contain the score.
function gameOver(){
  var pointpercentage= Math.floor(amountOfPoints/7*100);
  document.getElementById("main").innerHTML = `
  <div class="gameOverScreen">
    <p>${pointpercentage}%<p>

  </div>
  `;
  gameState="gameover";
}


//shows the user question and answers based on current questionIndex.
function loadAllAnswers(){
  demo.innerHTML=assignQuestion();
  correctAnswerPos = Math.floor(Math.random()*4);
  correctAnswer = document.getElementById("answers").children[correctAnswerPos];
  correctAnswer.innerHTML=assignCorrectAnswer();

  for (i=0;i<4;i++){
    if (i != correctAnswerPos){
      wrongAnswer = document.getElementById("answers").children[i];
      wrongAnswer.innerHTML=assignWrongAnswer();
    }
  }
}
//Maps the "start over button"
reset.addEventListener("click", function (e){
  resetGame();
})

//restarts the game
function resetGame(){
  //make sure the main class contains ingame html.
    document.getElementById("main").innerHTML =`
    <div class="question visibleQuestion">
      <p id="demo">loading...</p>
    </div>
    <div class="answers" id="answers">
      <div class="answer basicAnswer" id="0"> </div>
      <div class="answer basicAnswer" id="1"> </div>
      <div class="answer basicAnswer" id="2"> </div>
      <div class="answer basicAnswer" id="3"> </div>
    </div>
    `;
    gameState="ingame";

  //Clean up and prepare everything
  correctAnswerPos = Math.floor(Math.random() * 4);
  correctAnswer = document.getElementById("answers").children[correctAnswerPos];
  demo = document.getElementById("demo");
  amountOfPoints =0.0;
  hideAllAnswers();
  var question = document.getElementsByClassName("question")[0].classList;

  //hide questions before changing them.
  question.remove('visibleQuestion');
  question.add('invisible');


  setTimeout(() => {
    loadAPI();
    //show new questions after them being changed in loadAPI
    setTimeout(() => {
      question.add('visibleQuestion');
      question.remove('invisible');
    },200)
  },500)

  //IMPORTANT!! re-map eventlisteners after changing main.innerHTML!!!!!!
  answers.addEventListener("click", function(e){
  answerclicked(e);
  })

  //Reset the score visuals.
  for (let i=0; i<7; i++){
    document.getElementsByClassName('scores')[0].children[i].classList.remove('correctScore');
    document.getElementsByClassName('scores')[0].children[i].classList.remove('wrongScore');
    document.getElementsByClassName('scores')[0].children[i].classList.add('basicScore');
  }

}

var answerchildren = document.getElementById('answers').children;

//Create an listener on the answer divs
answers.addEventListener("click", function(e){
answerclicked(e);
})

//logic for when user selects an answer.
function answerclicked(e){
if (e.target.classList.contains("answer")){
  document.getElementsByClassName('scores')[0].children[questionIndex].classList.remove('basicScore');
  //If guess is correct
  if (e.target.id == correctAnswerPos){
    console.log("You guessed correctly!!!");
    e.target.classList.add('correct');
    e.target.classList.toggle('basicAnswer');
    document.getElementsByClassName('scores')[0].children[questionIndex].classList.add('correctScore');
    amountOfPoints++;
  }
  //If guess is wrong
  else{
    //handle guessed answer
    console.log("You guessed wrongly!!!");
    e.target.classList.add('wrong');
    e.target.classList.remove('basicAnswer');
    //handle correct answer
    answerchildren[correctAnswerPos].classList.add('correct');
    answerchildren[correctAnswerPos].classList.remove('basicAnswer');
    document.getElementsByClassName('scores')[0].children[questionIndex].classList.add('wrongScore');
  }

  document.getElementById("answers").classList.add('unclickable');

  //hides the anwer before loading the next one.
  setTimeout(() => {
    hideAllAnswers();
    var question = document.getElementsByClassName("question")[0].classList;
    question.remove('visibleQuestion');
    question.add('invisible');
    setTimeout(() => {
      loadNext();
    },800)
  },3000)

}
}

//assign default classes to answers for Css purposes.
function prepareAnswerClasses(){

  for (let i =0; i<answerchildren.length; i++){
    answerchildren[i].classList.remove('hiddenAnswer');
    answerchildren[i].classList.add('basicAnswer');
  }
  document.getElementById("answers").classList.remove('unclickable');
}

//hides all answers. used between transitions
function hideAllAnswers(){
  answerchildren = document.getElementById('answers').children;
  for (let i =0; i<answerchildren.length; i++){
    answerchildren[i].classList.add('hiddenAnswer');
    answerchildren[i].classList.remove('basicAnswer');
    answerchildren[i].classList.remove('correct');
    answerchildren[i].classList.remove('wrong');
  }
}

function assignCorrectAnswer(){
  return questionArray.results[questionIndex].correct_answer;
}
function assignWrongAnswer(){
  return questionArray.results[questionIndex].incorrect_answers.pop();
}

function assignQuestion()
{
    return questionArray.results[questionIndex].question;
}
