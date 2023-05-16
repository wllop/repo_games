// Variables del juego
let score = 0;
let time = 60; // Duración del juego en segundos
let currentQuestion = {};
let isPlaying = false;
let timerInterval;

const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answer');
const submitButton = document.getElementById('submit');
const feedbackElement = document.getElementById('feedback');
const scoreValue = document.getElementById('score-value');
const timerValue = document.getElementById('timer-value');

// Evento para enviar la respuesta
submitButton.addEventListener('click', checkAnswer);

// Función para iniciar el juego
function startGame() {
  isPlaying = true;
  score = 0;
  time = 60;
  scoreValue.innerText = score;
  timerValue.innerText = time;
  feedbackElement.innerText = '';
  answerInput.value = '';
  answerInput.disabled = false;
  submitButton.disabled = false;
  generateQuestion();
  startTimer();
}

// Función para generar una nueva pregunta
function generateQuestion() {
const num1 = Math.floor(Math.random() * 9) + 1; // Número aleatorio del 1 al 9
const num2 = Math.floor(Math.random() * 9) + 1;
const result = num1 * num2;

currentQuestion = { num1, num2, result };
questionElement.innerText = `${num1} x ${num2} =`;
}

// Función para comprobar la respuesta del jugador
// Función para comprobar la respuesta
function checkAnswer() {
  if (!isPlaying || !answerInput.value) {
    return;
  }

  var userAnswer = parseInt(answerInput.value);

  if (userAnswer === currentQuestion.result) {
    feedbackElement.textContent = showoki();
    feedbackElement.style.color = 'green';
    score++;
    scoreValue.textContent = score;
  } else {
    feedbackElement.textContent = "Respuesta incorrecta";
    feedbackElement.style.color = 'red';
    score--;
    scoreValue.textContent = score;
  }
  if (scoreValue.textContent >= 1)
  {
    scoreValue.style.color = "#0004ff";
  }
  else
  {
    scoreValue.style.color = "#880000";
  }
  generateQuestion();
  clearAnswer();
}

// Función para iniciar el temporizador
function startTimer() {
timerInterval = setInterval(() => {
time--;
timerValue.innerText = time;
if (time <= 0) {
  endGame();
}
}, 1000);
}

// Función para finalizar el juego
function endGame() {
isPlaying = false;
answerInput.disabled = true;
submitButton.disabled = true;
clearInterval(timerInterval);
feedbackElement.innerText = `¡Fin del juego! Puntuación final: ${score}`;
}

function enterNumber(number) {
  if (!isPlaying) {
    return;
  }

  answerInput.value += number;
}

// Función para borrar la respuesta
function clearAnswer() {
  if (!isPlaying) {
    return;
  }

  answerInput.value = '';
}

// Resto del código del juego...

// Iniciar el juego al cargar la página
 
startGame();

function showoki() {
  let oki=["¿Cómo están los máquinas?","¡Tu has estudiado!","¡Brutal!","Perfecto","Olé tú","Llegarás lejos :)","Me quedo loco","Come on!","Go for it!","Good job!","Let's go!","Vamossssss!","¡Impresionante!","¡Qué arte tienes!","Ole, Ole y Ole"];
   respuesta = getRandomWord(oki);
   return respuesta;
}


// Función para obtener una palabra aleatoria de un array
function getRandomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}