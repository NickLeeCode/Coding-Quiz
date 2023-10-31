const questions = [
    {
        question: "What does HTML stand for?",
        choices: ["Hyper Text Markup Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Markup Language"],
        correctAnswer: 0
    },
    {
        question: "Which programming language is often used for web development?",
        choices: ["Java", "Python", "C++", "JavaScript"],
        correctAnswer: 3
    }
];

let currentQuestion = 0;
let score = 0;
let countdown = 60;

const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const countdownElement = document.getElementById("countdown");

function displayQuestion() {
    questionElement.textContent = questions[currentQuestion].question;

    for (let i = 0; i < 4; i++) {
        choicesElement.children[i].textContent = questions[currentQuestion].choices[i];
    }
}

function checkAnswer(choice) {
    if (choice === questions[currentQuestion].correctAnswer) {
        score++;
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Wrong!";
        countdown -= 10; // Deduct 10 seconds for a wrong answer
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    countdownElement.textContent = "Time's up!";
    resultElement.textContent = `You scored ${score} out of ${questions.length} questions.`;
    document.getElementById('initals-area').style.display='block';
}

document.getElementById('submit').addEventListener('click',function(){
    var initals = document.getElementById('intials').value
    var highscores = JSON.parse (localStorage.getItem('scores')) || []
    var score = {
        initals,countdown
    }
highscores.push(score);
localStorage.setItem('scores', JSON.stringify(highscores));
document.getElementById('quiz-container').style.display='none';
document.getElementById('Highscores').style.display='block';
for(var i=0; i < highscores.length; i++){
var highscore = document.createElement('p')
highscore.innerText = highscores[i].initals + ' ' + highscores[i].countdown
document.getElementById('Highscores').appendChild(highscore)
}
});
displayQuestion();
const timer = setInterval(function () {
    countdown--;
    countdownElement.textContent = countdown + " seconds";

    if (countdown <= 0) {
        endQuiz();
    }
}, 1000);

document.getElementById('clear').addEventListener('click', function(){
    localStorage.clear()
    window.location.reload()
})
document.getElementById('play-again').addEventListener('click', function(){
    window.location.reload()
})