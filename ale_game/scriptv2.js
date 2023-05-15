// Obtener referencias a elementos del DOM
const wordElement = document.getElementById('word');
const agudaButton = document.getElementById('aguda');
const llanaButton = document.getElementById('llana');
const esdrujulaButton = document.getElementById('esdrujula');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score-value');
const score_malElement = document.getElementById('score_mal-value');
const intentosElement = document.getElementById('intentos');
const wrongWordsElement =  document.getElementById('wrong-words-container');
const wrongWordsList = document.getElementById('wrong-words-list');
const toggleWordsButton = document.getElementById('toggle-words-button');


let score = 0;
let score_mal = 0;
let intentos=1;
let currentWord = '';
let agudas = [];
let llanas = [];
let esdrujulas = [];
let wrongWords = [];

function buscarPalabra(cadena) {
  for (let i = 0; i < wrongWords.length; i++) {
    const [palabra, repeticiones] = wrongWords[i].split(":");
    if (palabra === cadena) {
      const numRepeticiones = parseInt(repeticiones);
      wrongWords[i] = `${palabra}:${numRepeticiones + 1}`; // Incrementar el número de repeticiones
      return numRepeticiones + 1;
    }
  }

  return 0;
}

// Función para obtener una palabra aleatoria de un arreglo
function getRandomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function updateWrongWordsList() {
    wrongWordsList.innerHTML = '';
    wrongWords.forEach(function (word) {
      const listItem = document.createElement('li');
      listItem.textContent = word;
      wrongWordsList.appendChild(listItem);
    });
  
    if (wrongWords.length > 0) {
      wrongWordsList.classList.add('wrong-words-expanded');
    } else {
      wrongWordsList.classList.remove('wrong-words-expanded');
    }
  }
  
// Event listener para el botón de desplegar/ocultar palabras incorrectas

toggleWordsButton.addEventListener('click', function () {
    wrongWordsList.classList.toggle('wrong-words-expanded');
  });

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
    let oki=["¿Cómo están los máquinas?","¡Brutal!","Perfecto","Olé tú","Llegarás lejos :)","Me quedo loco","Come on!","Go for it!","Good job!","Let's go!","Vamossssss!","¡Impresionante!","¡Qué arte tienes!","Ole, Ole y Ole"];
     respuesta = getRandomWord(oki);
     return respuesta;
  }
// Función para verificar la respuesta del usuario
function checkAnswer(type) {
  agudaButton.setAttribute("disabled","true");
  llanaButton.setAttribute("disabled","true"); 
  esdrujulaButton.setAttribute("disabled","true");
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
    if(score_mal==1){
      wrongWords.push("Repasar(repe.):");
    }
    const repeticiones = buscarPalabra(currentWord);
    if(repeticiones===0) //Sólo push de las nuevas palabras
    {
      wrongWords.push(`${currentWord}:1`);
    }
    
    updateWrongWordsList();
  }
  wrongWordsList.classList.remove('wrong-words-expanded');
  intentos++;
  scoreElement.textContent = score;
  score_malElement.textContent = score_mal;
 
  setTimeout(() => {
    resultElement.textContent = '';
    showNewWord();
    intentosElement.textContent = intentos;
    agudaButton.removeAttribute("disabled");
    llanaButton.removeAttribute("disabled"); 
    esdrujulaButton.removeAttribute("disabled");
  }, 2500);
  
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