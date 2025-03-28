let gameState = {
    timeLeft: 180,  // 3 minutes in seconds
    attempts: 3
};

function saveGameState() {
    localStorage.setItem("judgementGame", JSON.stringify(gameState));
}

function loadGameState() {
    const storedState = JSON.parse(localStorage.getItem("judgementGame"));
    if (storedState) {
        gameState.timeLeft = storedState.timeLeft;
        gameState.attempts = storedState.attempts;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadGameState();
    updateUI();
    startTimer();
    document.getElementById("submitAnswer").addEventListener("click", checkAnswer);
});

// Function to show notifications instead of alerts
function showNotification(message, type = "info", duration = 3000) {
    const notification = document.getElementById("notification");
    if (!notification) return;

    notification.innerText = message;
    notification.className = `notification ${type}`;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
        notification.innerText = "";
    }, duration);
}

function startTimer() {
    const timerElement = document.getElementById("timer");

    const timer = setInterval(() => {
        gameState.timeLeft--;
        saveGameState();

        const minutes = Math.floor(gameState.timeLeft / 60);
        const seconds = gameState.timeLeft % 60;
        timerElement.textContent = `Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;

        if (gameState.timeLeft <= 0) {
            clearInterval(timer);
            gameOver("Time has run out! Ms. Ralteen Fiel remains in her eternal slumber.");
        }
    }, 1000);
}

function checkAnswer() {
    const answer = document.getElementById("finalAnswer").value.trim().toLowerCase();

    if (answer === "eternal life") {
        winGame();
    } else {
        gameState.attempts--;
        saveGameState();
        updateUI();

        if (gameState.attempts <= 0) {
            gameOver("You have run out of attempts. Ms. Ralteen Fiel remains in her eternal slumber.");
        } else {
            showNotification("Incorrect answer. Try again!", "error");
        }
    }
}

function updateUI() {
    document.getElementById("attemptsLeft").textContent = `Attempts remaining: ${gameState.attempts}`;
}

function gameOver(message) {
    showNotification(message, "error");
    localStorage.removeItem("judgementGame");
    setTimeout(() => {
        window.location.href = "../index.html";
    }, 2000);
}

function winGame() {
    showNotification("Congratulations! You have awakened Ms. Ralteen Fiel from her eternal slumber!", "success");

    
    document.querySelector("#timer").style.display = "none";
    const attempts = document.querySelector("#attempts");
    if (attempts) {
        attempts.style.display = "block";
    }
    document.querySelector("#submitAnswer").style.display = "none";

    document.querySelector(".judgement-room-content").innerHTML = `
        <h1>Victory!</h1>
        <p class="victory-text">
            "Well done, thou good and faithful servant: thou hast been faithful over a few things,
            I will make thee ruler over many things: enter thou into the joy of thy lord."
        </p>
        <p class="awakening">Ms. Ralteen Fiel has awakened from her very deep sleep!</p>
        <img id="awakened" src="/assets/images/ralteenfiel-awakened.webp"
         alt="Ms. Ralteen Fiel awakened" width="500" height="500"><br><br>
        <a href="../index.html" class="cta-button">Return Home</a>
        <br>
    `;
    document.querySelector("#awakened").style.display = "flex";
    document.querySelector("#awakened").style.width = "100%";
    document.querySelector("#awakened").style.maxWidth = "90vw";
    document.querySelector("#awakened").style.height = "auto";
    document.querySelector("#awakened").style.alignSelf = "center";

    localStorage.removeItem("judgementGame"); // Clear progress after victory
}
