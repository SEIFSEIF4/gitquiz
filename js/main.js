// Select Elements
let countSpan = document.querySelector(".count span"),
  countDiv = document.getElementById("count"),
  bullets = document.querySelector(".bullets"),
  bulletsSpanContainer = document.querySelector(".bullets .spans"),
  bulletsSpan = document.querySelector(".bullets .spans span"),
  quizArea = document.querySelector(".quiz-area"),
  answersArea = document.querySelector(".answers-area"),
  submitButton = document.querySelector(".submit-button"),
  resultsContainer = document.querySelector(".results"),
  recap = document.getElementById("recap"),
  recap2 = document.getElementById("recap2"),
  countdownElement = document.querySelector(".countdown"),
  welcomeMsg = document.querySelector(".quiz-area h3"),
  inputElement = document.querySelector('input[name="countq"]');
const radioInputs = document.querySelectorAll('input[type="radio"]'),
  startBtn = document.getElementById("startBtn"),
  highScore = document.getElementById("highScore");

// Set Options
let currentIndex = 0;
let rightAnswers = 0;
let countdownInterval;
let isCountdown = false;
let qCount = 10; //default 10 Questions
let areasQuizArea = [];
let areasAnswersArea = [];

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);

      // Create Bullets + Set Questions Count
      createBullets(qCount);
      let randomIndex = Math.floor(Math.random() * questionsObject.length);

      // Pick a Random Question Index
      addQuestionData(questionsObject[randomIndex], qCount);
      // Enter key to run submitButton.click();
      document.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
          submitButton.click();
        }
      });
      // double click to run submitButton.click();
      //  // unfinished
      // radioInputs.forEach((radioInput) => {
      //   //here
      //   radioInput.addEventListener("click", () => {
      //     // Do something when a radio input is clicked
      //     let clicked = false;
      //     radioInputJs.onclick = () => {
      //       if (clicked) {
      //         submitButton.click();
      //       } else {
      //         clicked = true;
      //       }
      //     };
      //     // console.log(1 + 1);
      //   });
      // });

      submitButton.onclick = () => {
        let remainQ = qCount;
        remainQ = remainQ - 1;
        countSpan.innerHTML = remainQ;

        // Get Right Answer
        let theRightAnswer = questionsObject[currentIndex].right_answer;

        // Increase Index
        currentIndex++;

        // Check The Answer
        checkAnswer(theRightAnswer, qCount);

        // Remove Previous Question
        areasQuizArea.push(quizArea.innerHTML);
        areasAnswersArea.push(answersArea.innerHTML);
        quizArea.innerHTML = "";
        answersArea.innerHTML = "";

        addQuestionData(questionsObject[currentIndex], qCount);

        // addQuestionData(questionsObject[randomIndex], qCount);

        // Handle Bullets Class
        // handleBullets();

        // Start CountDown
        clearInterval(countdownInterval);
        countdown(15, qCount);

        // Show Results
        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", "../data/js_questions.json", true);
  myRequest.send();
}

function createBullets(num) {
  countSpan.innerHTML = num;
  // Create Spans
  for (let i = 0; i < num + 1; i++) {
    // Create Bullet
    let theBullet = document.createElement("span");
    theBullet.innerHTML = i;
    // Check If Its First Span
    if (i === 0) {
      theBullet.innerHTML = "&#8594;";
      theBullet.style = "text-align: center;";
    }
    // Append Bullets To Main Bullet Container
    bulletsSpanContainer.appendChild(theBullet);
  }
}

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    // Create H2 Question Title
    let questionTitle = document.createElement("h2");

    // Create Question Text
    let questionText = document.createTextNode(obj["title"]);

    // Append Text To H2
    questionTitle.appendChild(questionText);

    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    // Create The Answers
    for (let i = 1; i <= 4; i++) {
      // Create Main Answer Div
      let mainDiv = document.createElement("div");

      // Add Class To Main Div
      mainDiv.className = "answer";

      // Create Radio Input
      let radioInput = document.createElement("input");

      // Add Type + Name + Id + Data-Attribute
      radioInput.name = "question";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];
      radioInput.tabIndex = i;
      // Make First Option Selected
      if (i === 1) {
        radioInput.checked = true;
        radioInput.focused = true; ///////////////////////////////////////
      }

      // Create Label
      let theLabel = document.createElement("label");

      // Add For Attribute
      theLabel.htmlFor = `answer_${i}`;

      // Create Label Text
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);

      // Add The Text To Label
      theLabel.appendChild(theLabelText);

      // Add Input + Label To Main Div
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);

      // Append All Divs To Answers Area
      answersArea.appendChild(mainDiv);
    }
  }
}

// function checkAnswer(rAnswer, count) {

//   let answers = document.getElementsByName("question");
//   let theChoosenAnswer;

//   for (let i = 0; i < answers.length; i++) {
//     if (answers[i].checked) {
//       theChoosenAnswer = answers[i].dataset.answer;
//     }
//   }

//   if (rAnswer === theChoosenAnswer) {
//     rightAnswers++;
//   }
// }

// function handleBullets() {
//   let bulletsSpans = document.querySelectorAll(".bullets .spans span");
//   let arrayOfSpans = Array.from(bulletsSpans);
//   arrayOfSpans.forEach((span, index) => {
//     if (currentIndex === index) {
//       if (false) {
//         span.className = "right";
//       } else {
//         span.className = "wrong";
//       }
//     }
//   });
// }

// Edit here

function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("question");
  let theChoosenAnswer;

  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      for (let i = 0; i < answers.length; i++) {
        if (answers[i].checked) {
          theChoosenAnswer = answers[i].dataset.answer;
        }
      }

      if (rAnswer === theChoosenAnswer) {
        rightAnswers++;
        // Style Right Answer
        span.className = "right";
      } else {
        // Style wrong Answer
        span.className = "wrong";
      }
    }
  });
}

function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    countdownElement.remove();
    bullets.appendChild(resultsContainer);

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count}`;
    } else if (rightAnswers === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Good`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count}`;
    }

    // Get the previous high score from localStorage
    let preHighScore = localStorage.getItem("highScore");
    // If there is no previous high score, set it to 0
    if (preHighScore === null) {
      preHighScore = 0;
    }
    // Convert the stored high score from string to number
    preHighScore = parseInt(preHighScore);
    if (rightAnswers > preHighScore) {
      // Update the high score in localStorage
      localStorage.setItem("highScore", rightAnswers);
      countDiv.innerHTML = "New High Score : " + rightAnswers;
      countDiv.style.color = "green";
    } else {
      countDiv.innerHTML = "Current High Score : " + preHighScore;
    }

    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "#181a1b";
  }
}

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(function () {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countdownElement.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}

startBtn.addEventListener("click", () => {
  startBtn.classList.toggle("active");
  startBtn.innerHTML = "End Quiz";
  welcomeMsg.style = "display:none;";
  inputElement.style = "display:none;";
  submitButton.style = "background-color: #0075ff;";

  if (startBtn.classList.contains("active")) {
    // First click, call getQuestions()
    getQuestions();
  } else {
    // Second click, reload the page
    window.location.reload();
  }
});

//get value
inputElement.addEventListener("input", function () {
  let inputValue = inputElement.value;
  let twoDigits = inputValue.slice(0, 2);

  // Remove leading zeros
  twoDigits = parseInt(twoDigits).toString();

  // Update the input value with the restricted two-digit value
  inputElement.value = twoDigits;

  // Set Max is 20 and Min is 5
  if (twoDigits <= 0 || twoDigits > 20) {
    alert(
      "Please Enter a Number Between 1 & 20\n\nCuz honestly, I don't have that Many Questions :)\n. . . . API Soon?"
    );
    qCount = 10;
    countSpan.innerHTML = 10;
    inputElement.value = 10;
  } else if (isNaN(twoDigits)) {
    qCount = 10;
    countSpan.innerHTML = 10;
    inputValue.innerHTML = 10;
  } else {
    qCount = parseInt(twoDigits);
    countSpan.innerHTML = twoDigits;
  }
});

/**Cursor Glowing Effect**/
document.addEventListener("mousemove", function (event) {
  var glow = document.getElementById("glow");
  var x = event.clientX;
  var y = event.clientY;
  glow.style.left = x + "px";
  glow.style.top = y + "px";
  glow.style.opacity = 1;
});
document.addEventListener("mouseout", function () {
  var glow = document.getElementById("glow");
  glow.style.opacity = 0;
});

// unfinished
// function recapAnswers() {
//   recap.innerHTML = quizArea.innerHTML;
//   recap2.innerHTML = answersArea.innerHTML;
//   console.log(areasQuizArea[1]);
//   console.log(areasAnswersArea[2]);
// }

// document.getElementById("startBtn2");
// startBtn2.addEventListener("click", () => {
//   recapAnswers();
//   console.log(1 + 1);
// });

