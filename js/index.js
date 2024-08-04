let score = 0;
let currentProblem = null;

document.getElementById("userAnswer").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkAnswer();
    }
});

displayQuestion();

function displayQuestion() {
    currentProblem = randomProblem();
    document.getElementById("question").textContent = `What is ${currentProblem.question}?`;
    document.getElementById("userAnswer").value = "";
    document.getElementById("answer").textContent = "";
}

function randomProblem() {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 10) + 1;
    let operation = Math.floor(Math.random() * 4);

    let qsn;
    let ans;

    if (operation === 0) {
        qsn = `${num1} + ${num2}`;
        ans = num1 + num2;
    } else if (operation === 1) {
        qsn = `${num1} - ${num2}`;
        ans = num1 - num2;
    } else if (operation === 2) {
        qsn = `${num1} * ${num2}`;
        ans = num1 * num2;
    } else if (operation === 3) {
        qsn = `${num1} / ${num2}`;
        ans = num1 / num2;
    }

    return { question: qsn, answer: ans };
}


function checkAnswer() {
    const userAnswerElement = document.getElementById("userAnswer");
    const userAnswer = parseFloat(userAnswerElement.value);
    const correctAnswer = currentProblem.answer;
    
    if (isNaN(userAnswer)) {
        alert("Please enter a valid number.");
        return;
    }
    
    if (userAnswer === parseInt(correctAnswer)) {
        score++;
        document.getElementById("score").textContent = `Score: ${score}`;
        showNotification("Correct Answer!", "correct");
        
        const icons = document.querySelectorAll("footer .icon");
        applyWaveAnimation(icons);
        setTimeout(() => {
            applyWaveAnimation(icons);
        }, 500);
        
        setTimeout(() => {
            displayQuestion();
        }, 1000);
        
    } else {
        showNotification(`Incorrect Answer! The correct answer was ${correctAnswer}.`, "incorrect", () => {
            userAnswerElement.disabled = true;
            document.querySelector("button").disabled = true;
            
            setTimeout(() => {
                userAnswerElement.disabled = false;
                document.querySelector("button").disabled = false;
                displayQuestion();
            }, 200);
        });
    }
}

function showNotification(message, type, callback) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.className = `show ${type}`;

    if (notification.timeout) {
        clearTimeout(notification.timeout);
    }

    notification.timeout = setTimeout(() => {
        notification.classList.remove("show");
        if (callback) callback();
    }, 1000);
}

function applyWaveAnimation(elements) {
    elements.forEach((icon) => {
        icon.classList.remove("wave-animation");
        void icon.offsetWidth;
        icon.classList.add("wave-animation");

        icon.addEventListener("animationend", () => {
            icon.classList.remove("wave-animation");
        }, { once: true });
    });
}
