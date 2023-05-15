// Obtener referencias a elementos del DOM
const wordElement = document.getElementById('word');
const agudaButton = document.getElementById('aguda');
const llanaButton = document.getElementById('llana');
const esdrujulaButton = document.getElementById('esdrujula');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score-value');
const score_malElement = document.getElementById('score_mal-value');
const intentosElement = document.getElementById('intentos');
let score = 0;
let score_mal = 0;
let intentos=1;
let currentWord = '';
let agudas = [];
let llanas = [];
let esdrujulas = [];

// Función para obtener una palabra aleatoria de un arreglo
function getRandomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Función para cargar las palabras desde los ficheros
function loadWords() {
  fetch('https://raw.githubusercontent.com/wllop/repo_games/main/ale_game/agudas.txt')
    .then(response => response.text())
    .then(data => {
      agudas = data.split('\n');
    });

  fetch('https://raw.githubusercontent.com/wllop/repo_games/main/ale_game/llanas.txt')
    .then(response => response.text())
    .then(data => {
      llanas = data.split('\n');
    });

  fetch('https://raw.githubusercontent.com/wllop/repo_games/main/ale_game/esdrujulas.txt')
    .then(response => response.text())
    .then(data => {
      esdrujulas = data.split('\n');
    });
}

// Función para mostrar una nueva palabra en el juego
function showNewWord() {
  const randomType = Math.floor(Math.random() * 3); // 0: aguda, 1: llana, 2: esdrújula

  if (randomType === 0) {
    currentWord = getRandomWord(agudas);
  } else if (randomType === 1) {
    currentWord = getRandomWord(llanas);
  } else {
    currentWord = getRandomWord(esdrujulas);
  }
  if(currentWord=="") showNewWord();
  wordElement.textContent = currentWord;
}

function showoki() {
     let oki=["Perfecto","Olé tú","Llegarás lejos :)","Me quedo loco","Let's go","IM PRESIONANTE","¡Qué arte tienes!","Ole, Ole y Ole"];
     respuesta = getRandomWord(oki);
     return respuesta;
  }
// Función para verificar la respuesta del usuario
function checkAnswer(type) {
  let correctType = '';

  if (agudas.includes(currentWord)) {
    correctType = 'aguda';
} else if (llanas.includes(currentWord)) {
    correctType = 'llana';
  } else if (esdrujulas.includes(currentWord)) {
    correctType = 'esdrújula';
  }

  if (type === correctType) {
    resultElement.textContent = showoki();
    resultElement.style.color = 'green';
    score++;
  } else {
    resultElement.textContent = `¡Incorrecto! Era una palabra ${correctType}.`;
    resultElement.style.color = 'red';
    score_mal++;
  }
  intentos++;
  scoreElement.textContent = score;
  score_malElement.textContent = score_mal;
  intentosElement.textContent = intentos;
  setTimeout(() => {
    resultElement.textContent = '';
    showNewWord();
  }, 1500);
}

// Event listeners para los botones de respuesta
agudaButton.addEventListener('click', () => {
  checkAnswer('aguda');
});

llanaButton.addEventListener('click', () => {
  checkAnswer('llana');
});

esdrujulaButton.addEventListener('click', () => {
  checkAnswer('esdrújula');
});

// Cargar las palabras al iniciar la página
loadWords();
setTimeout(() => {
    resultElement.textContent = '';
    showNewWord();
  }, 1500);