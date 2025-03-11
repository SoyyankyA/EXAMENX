const questions = [
    { 
      question: "¿En qué fecha nos hicimos pareja?", 
      options: ["7 de enero", "29 de enero", "18 de enero", "12 de enero"], 
      correct: "12 de enero", 
      clue: "I O", 
      successMessage: "Correcto mi niño 🫦❤️ <br><span style='color: green; font-size: 0.6em;'>Has conseguido los caracteres: I O</span>" 
    },
    { 
      question: "¿Dónde fue nuestra primera cita?", 
      options: ["En el cine", "Parque Duarte", "En casa", "Tienda La Sirena"], 
      correct: "En el cine", 
      clue: "✨ V", 
      successMessage: "Mi novio no e’ bruto no 🥵❤️ <br><span style='color: green; font-size: 0.6em;'>Has conseguido los caracteres: ✨ V</span>" 
    },
    { 
      question: "¿Cómo me llamaste por primera vez de forma cariñosa?", 
      options: ["Amor", "Monita", "Princesa", "Mol"], 
      correct: "Mol", 
      clue: "L E", 
      successMessage: "Sigue así precioso ❤️ <br><span style='color: green; font-size: 0.6em;'>Has conseguido los caracteres: L E</span>" 
    },
    { 
      question: "¿Cuál es mi comida favorita?", 
      options: ["Pasta Boloñesa", "Pasta Alfredo", "Pizza", "Cortes de carne"], 
      correct: "Pasta Boloñesa", 
      clue: "U", 
      successMessage: "Ese va a ser mi esposo coñ* 🫦✨ <br><span style='color: green; font-size: 0.6em;'>Has conseguido el carácter: U</span>" 
    }
  ];
  
  const errorMessages = [
    "Has contestado mal 😣", 
    "No puedo creerlo 🙄", 
    "Es enserio Andy? 🙂"
  ];
  
  let currentQuestion = 0;
  let cluesCollected = [];
  let attempts = 0;
  const quizContent = document.getElementById('quiz-content');
  
  function showIntro() {
    quizContent.innerHTML = `
      <h2>¡Bienvenido, mi amor! ❤️</h2>
      <p>Este examen tiene 4 preguntas sobre nosotros. Por cada respuesta correcta, obtendrás caracteres para descubrir un mensaje oculto.</p>
      <p>Al final, deberás ordenar los caracteres correctamente para revelar el mensaje secreto.</p>
      <button onclick="showQuestion()">¡VAMOS!</button>
    `;
  }
  
  function showQuestion() {
    if (currentQuestion < questions.length) {
      const q = questions[currentQuestion];
      quizContent.innerHTML = `
        <h2>Pregunta ${currentQuestion + 1} de ${questions.length}</h2>
        <p>${q.question}</p>
        <ul>
          ${q.options.map(opt => `<li><label><input type="radio" name="option" value="${opt}"> ${opt}</label></li>`).join('')}
        </ul>
        <button id="submitButton" onclick="submitAnswer()">Enviar Respuesta</button>
        <div class="message" id="message"></div>
      `;
    } else {
      showFinal();
    }
  }
  
  function submitAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    if (!selected) {
      document.getElementById('message').textContent = "Selecciona una opción.";
      return;
    }
    const q = questions[currentQuestion];
  
    if (selected.value === q.correct) {
      cluesCollected.push(...q.clue.split(" "));
  
      // Mostrar mensaje de éxito con el tamaño correcto
      document.getElementById('message').innerHTML = `<p style="font-size: 1.8em;">${q.successMessage}</p>`;
  
      // Ocultar botón de enviar respuesta
      document.getElementById("submitButton").style.display = "none";
  
      // Agregar botón de siguiente
      quizContent.innerHTML += `<button onclick="nextQuestion()">Siguiente</button>`;
    } else {
      attempts++;
      if (attempts < 3) {
        document.getElementById('message').innerHTML = `<p style="font-size: 1.8em; color: red;">${errorMessages[attempts - 1]}</p>`;
      } else {
        quizContent.innerHTML = `<h2 style="color:red; font-size:4em;">No puedo creer esto de verdad 💔☹️</h2>`;
      }
    }
  }
  
  function nextQuestion() {
    attempts = 0;
    currentQuestion++;
    showQuestion();
  }
  
  // ---------------- DRAG & DROP -----------------
  
  function allowDrop(event) {
    event.preventDefault();
  }
  
  function drag(event) {
    event.dataTransfer.setData("text", event.target.innerText);
    event.target.classList.add("dragging");
  }
  
  function drop(event) {
    event.preventDefault();
    const letter = event.dataTransfer.getData("text");
    const dropZone = document.getElementById("drop-zone");
  
    const existingLetter = document.querySelector(`.letter[data-letter="${letter}"]`);
    if (existingLetter) {
      dropZone.appendChild(existingLetter);
    } else {
      const span = document.createElement("span");
      span.classList.add("letter");
      span.draggable = true;
      span.innerText = letter;
      span.setAttribute("data-letter", letter);
      span.ondragstart = drag;
      dropZone.appendChild(span);
    }
  }
  
  function resetDropZone() {
    const dropZone = document.getElementById("drop-zone");
    dropZone.innerHTML = "";
  }
  
  // Verificar si el mensaje es correcto
  function checkMessage() {
    const dropZone = document.getElementById("drop-zone");
    const letters = Array.from(dropZone.children).map(el => el.innerText).join("");
  
    if (letters === "ILOVEU✨") {
      quizContent.innerHTML = `
        <h2>¡Un macho inteligente es que tengo 🫦❤️!</h2>
        <h2>¡CALIFICACION 10/10!</h2>
        <button onclick="showLoveMessage()">Continuar</button>
      `;
    } else {
      document.getElementById("result").innerHTML = `<p style="font-size: 1.8em; color: red;">Vamos papito, tú puedes! Inténtalo otra vez! 🥺❤️</p>`;
    }
  }
  
  // Página final con mensaje de amor
  function showLoveMessage() {
    quizContent.innerHTML = `
      <h2>Felicidades mi amor! ❤️</h2>
      <p style="font-size: 1.8em;">Aunque no es secreto que te amo, quise hacerte este detalle como la novia programadora que tienes.</p>
      <p style="font-size: 1.2em;">Espero que te haya gustado porque duré toda la tarde haciéndolo 🤣❤️</p>
      <p style="font-size: 2.2em;">❤️ TE AMO ❤️</p>
    `;
  }
  
  // ----------------- FINAL -----------------
  function showFinal() {
    const shuffledClues = cluesCollected.sort(() => Math.random() - 0.5); // Desordenar letras
  
    quizContent.innerHTML = `
      <h2>¡Examen casi completo!</h2>
      <p>Baby, arrastra las letras para formar el mensaje secreto</p>
      <div class="letters-container" id="letters-container">
        ${shuffledClues.map(letter => `<span class="letter" draggable="true" ondragstart="drag(event)" data-letter="${letter}">${letter}</span>`).join('')}
      </div>
      <div class="drop-zone" id="drop-zone" ondragover="allowDrop(event)" ondrop="drop(event)"></div>
      <button onclick="resetDropZone()">Reiniciar</button>
      <button onclick="checkMessage()">Comprobar</button>
      <p id="result"></p>
    `;
  }
  
  // Iniciar con la introducción
  showIntro();