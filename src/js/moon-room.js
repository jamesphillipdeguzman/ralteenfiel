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
            showNotification("Incorrect. Try again!", "error");
        }
    }
}

function updateUI() {
    document.getElementById("attempts").textContent = `Attempts remaining: ${gameState.attempts}`;
}

function gameOver() {
    showNotification("You have run out of attempts. Returning to the Dark Room...", "error");
    localStorage.removeItem("worldSelectionGame");
    setTimeout(() => {
        window.location.href = "dark-room.html";
    }, 2000);
}

function winGame() {
    showNotification("Correct! The celestial kingdom awaits. Proceeding to the Judgement Room...", "success");
    localStorage.removeItem("worldSelectionGame");
    setTimeout(() => {
        window.location.href = "judgement-room.html";
    }, 2000);
}
