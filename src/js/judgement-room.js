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
            alert("Incorrect answer. Try again!");
        }
    }
}

function updateUI() {
    document.getElementById("attemptsLeft").textContent = `Attempts remaining: ${gameState.attempts}`;
}

function gameOver(message) {
    alert(message);
    localStorage.removeItem("judgementGame");
    window.location.href = "../index.html";
}

function winGame() {
    alert("Congratulations! You have awakened Ms. Ralteen Fiel from her eternal slumber!");
    document.querySelector("#awakened").style.display = "block";
    document.querySelector("#timer").style.display = "none";
    document.querySelector("#attempts").style.display = "none";
    document.querySelector("#submitAnswer").style.display = "none";

    document.querySelector(".judgement-room-content").innerHTML = `
        <h1>Victory!</h1>
        <p class="victory-text">
            "Well done, thou good and faithful servant: thou hast been faithful over a few things,
            I will make thee ruler over many things: enter thou into the joy of thy lord."
        </p>
        <p class="awakening">Ms. Ralteen Fiel has awakened from her very deep sleep!</p>
        <a href="index.html" class="cta-button">Return Home</a>
    `;

    localStorage.removeItem("judgementGame"); // Clear progress after victory
}
