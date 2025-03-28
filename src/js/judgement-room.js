let timeLeft = 10; // 3 minutes in seconds
let attempts = 3;

// Start the timer
const timer = setInterval(() => {
    timeLeft--;
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('timer').textContent =
        `Time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
        clearInterval(timer);
        alert('Time has run out! Ms. Ralteen Fiel remains in her eternal slumber.');
        window.location.href = '../index.html';
    }
}, 1000);

document.getElementById('submitAnswer').addEventListener('click', function () {
    const answer = document.getElementById('finalAnswer').value.trim().toLowerCase();

    if (answer === 'eternal life') {
        clearInterval(timer);
        alert('Congratulations! You have awakened Ms. Ralteen Fiel from her eternal slumber!');
        // Show victory message
        document.querySelector('.judgement-room-content').innerHTML = `
            <h1>Victory!</h1>
            <p class="victory-text">
                "Well done, thou good and faithful servant: thou hast been faithful over a few things,
                I will make thee ruler over many things: enter thou into the joy of thy lord."
            </p>
            <p class="awakening">Ms. Ralteen Fiel has awakened from her very deep sleep!</p>
            <a href="index.html" class="cta-button">Return Home</a>
        `;
    } else {
        attempts--;
        document.getElementById('attemptsLeft').textContent = `Attempts remaining: ${attempts}`;

        if (attempts <= 0) {
            clearInterval(timer);
            alert('You have run out of attempts. Ms. Ralteen Fiel remains in her eternal slumber.');
            window.location.href = 'index.html';
        } else {
            alert('Incorrect answer. Try again!');
        }
    }
});