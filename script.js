const question = [
    {
      question: "What is HTML?",
      answers: [
        { text: "Hypertext Markup Language", correct: true },
        { text: "Hightext Markup Language", correct: false },
        { text: "Hypertext Menu Language", correct: false },
        { text: "Hypertext Markup Leaugue", correct: false },
      ],
    },
    {
      question: "What is JavaScript?",
      answers: [
        { text: "Programming Language", correct: true },
        { text: "A website", correct: false },
        { text: "Social networking website ", correct: false },
        { text: "Reasearch Website", correct: false },
      ],
    },
  ];
  const questionElement = document.getElementById("question");
  const answerButtons = document.getElementById("answer-buttons");
  const nextButton = document.getElementById("next-btn");
  const timerElement = document.getElementById("timer");
  const saveButton = document.getElementById("save-btn");
  const initialsInput = document.getElementById("initials-input");
  const highScoresList = document.getElementById("high-scores-list");
  saveButton.addEventListener("click", saveScore);

function saveScore() {
  const initials = initialsInput.value.trim();

  if (initials !== "") {
    const scoreData = {
      initials: initials,
      score: score,
    };
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(scoreData);
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    displayHighScores(highScores);
  }
}
function displayHighScores(highScores) {
    highScoresList.innerHTML = "";
  
    for (let i = 0; i < highScores.length; i++) {
      const scoreData = highScores[i];
      const listItem = document.createElement("li");
      listItem.textContent = `${scoreData.initials}: ${scoreData.score}`;
      highScoresList.appendChild(listItem);
    }
  }
  
 
  window.onload = function () {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    displayHighScores(highScores);
  };










  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  let timerId;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    showQuestion();
    startTimer();
  }
  
  function startTimer() {
    timerId = setInterval(() => {
      timeLeft--;
      timerElement.textContent = `Time Left: ${timeLeft}s`;
  
      if (timeLeft === 0) {
        clearInterval(timerId);
        showScore();
      }
    }, 1000);
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = question[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  
    currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButtons.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.classList.add("correct");
      score++;
    } else {
      selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextButton.style.display = "block";
  }
  
  function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${question.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
  }
  
  function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < question.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
  
  nextButton.addEventListener("click", handleNextButton);
  
  window.onload = function () {
    startQuiz();
  };
  