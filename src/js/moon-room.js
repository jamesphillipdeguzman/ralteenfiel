let gameState = {
    attempts: 2
};

function saveGameState() {
    localStorage.setItem("worldSelectionGame", JSON.stringify(gameState));
}

function loadGameState() {
    const storedState = JSON.parse(localStorage.getItem("worldSelectionGame"));
    if (storedState) {
        gameState.attempts = storedState.attempts;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadGameState();
    updateUI();

    document.querySelectorAll(".world-btn").forEach(button => {
        button.addEventListener("click", function () {
            checkWorld(this.dataset.world);
        });
    });
});

function checkWorld(selectedWorld) {
    if (selectedWorld.toLowerCase() === "celestial") {
        winGame();
    } else {
        gameState.attempts--;
        saveGameState();
        updateUI();

        if (gameState.attempts <= 0) {
            gameOver();
        } else {
            alert("Incorrect. Try again!");
        }
    }
}

function updateUI() {
    document.getElementById("attempts").textContent = `Attempts remaining: ${gameState.attempts}`;
}

function gameOver() {
    alert("You have run out of attempts. Return to the Dark Room to try again.");
    localStorage.removeItem("worldSelectionGame");
    window.location.href = "dark-room.html";
}

function winGame() {
    alert("Correct! The celestial kingdom awaits. Proceed to the Judgement Room.");
    localStorage.removeItem("worldSelectionGame");
    window.location.href = "judgement-room.html";
}
