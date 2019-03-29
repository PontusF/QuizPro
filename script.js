fetch('https://opentdb.com/api.php?amount=7&category=15&type=multiple')
  .then(function(response){ return response.json();
})
  .then (function (myJson){  splitFunction(JSON.stringify(myJson));
});


var questionArray;
var demo = document.getElementById("demo");

var questionIndex =0;
var correctAnswerPos = Math.floor(Math.random() * 4);
var correctAnswer = document.getElementById("answers").children[correctAnswerPos];
var wrongAnswer;
function splitFunction(apiJson){
  questionArray = (JSON.parse(apiJson));
  console.log(questionArray.results[questionIndex].question);
  //demo.innerHTML=assignQuestion();
  //correctAnswer.innerHTML=assignCorrectAnswer();
  loadAllAnswers();
}

function loadNext(){
  questionIndex++;
  loadAllAnswers();
}
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
