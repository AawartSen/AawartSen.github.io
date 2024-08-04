const operations = ["+", "-", "*", "/"];
const NotificationType = {
  CORRECT: "correct",
  INCORRECT: "incorrect",
};
const AnimationState = {
  HAPPY: "happy",
  SAD: "sad",
};

var score = 0;
var currentProblem = randomProblem();
var currentQuestion = `What is ${currentProblem.question}?`;
var integerAnswer = currentProblem.answer;

/////////////////////////////////////////////////////////////////////////////////

displayQuestion();

document
  .getElementById("userAnswer")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      checkAnswer();
    }
  });

/////////////////////////////////////////////////////////////////////////////////

function displayQuestion() {
  document.getElementById("question").textContent = currentQuestion;
  document.getElementById("userAnswer").value = "";
  document.getElementById("answer").textContent = "";
}

function randomProblem() {
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  let operation = operations[Math.floor(Math.random() * operations.length)];

  let ans = 0;
  if (operation === "+") {
    ans = num1 + num2;
  } else if (operation === "-") {
    ans = num1 - num2;
  } else if (operation === "*") {
    ans = num1 * num2;
  } else if (operation === "/") {
    ans = num1 / num2;
  }

  return { question: `${num1} ${operation} ${num2}`, answer: parseInt(ans) };
}

/////////////////////////////////////////////////////////////////////////////////

function checkAnswer() {
  var userAnswer = parseInt(document.getElementById("userAnswer").value);

  if (isNaN(userAnswer)) {
    alert("Please enter a valid number.");
    return;
  }

  if (userAnswer === integerAnswer) {
    showNotification("Correct Answer!", NotificationType.CORRECT);

    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        applyAnimation(AnimationState.HAPPY);
      }, i * 500);
    }

    setTimeout(() => {
      displayQuestion();
    }, 1000);

    score++;
    document.getElementById("score").textContent = "Score: " + score;
  } else {
    document.getElementById("userAnswer").disabled = true;
    document.querySelector("button").disabled = true;

    showNotification(
      "The correct answer was " + integerAnswer + ".",
      NotificationType.INCORRECT
    );
    applyAnimation(AnimationState.SAD);

    setTimeout(() => {
      document.getElementById("userAnswer").disabled = false;
      document.querySelector("button").disabled = false;
      document.getElementById("userAnswer").focus();
    }, 1000);

    setTimeout(() => {
      score = 0;
      document.getElementById("score").textContent = "Score: " + score;
    }, 1000);
  }

  setTimeout(() => {
    currentProblem = randomProblem();
    currentQuestion = `What is ${currentProblem.question}?`;
    integerAnswer = currentProblem.answer;
    displayQuestion();
  }, 1000);
}

/////////////////////////////////////////////////////////////////////////////////

function showNotification(message, type) {
  var notification = document.getElementById("notification");
  notification.textContent = message;
  notification.className = "show " + type;

  if (notification.timeout) {
    clearTimeout(notification.timeout);
  }

  notification.timeout = setTimeout(() => {
    notification.classList.remove("show");
  }, 1000);
}

/////////////////////////////////////////////////////////////////////////////////

function applyAnimation(state) {
  const footer = document.getElementsByTagName("footer")[0];
  const resetAnimation = () => {
    footer.classList.remove("happy-animation", "sad-animation");
    void footer.offsetWidth;
  };

  if (state === AnimationState.HAPPY) {
    resetAnimation();
    footer.classList.add("happy-animation");
    footer.addEventListener(
      "animationend",
      () => {
        footer.classList.remove("happy-animation");
      },
      { once: true }
    );
  } else if (state === AnimationState.SAD) {
    resetAnimation();
    footer.classList.add("sad-animation");
    footer.addEventListener(
      "animationend",
      () => {
        footer.classList.remove("sad-animation");
      },
      { once: true }
    );
  }
}

/////////////////////////////////////////////////////////////////////////////////
