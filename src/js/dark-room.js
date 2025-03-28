let scriptures = [];
let usedWOLs = new Set(JSON.parse(localStorage.getItem("usedWOLs")) || []);
let collectedWOLs = parseInt(localStorage.getItem("collectedWOLs")) || 0;
const totalWOLs = 11;
let currentScripture = null;
let currentTrivia = null;

async function loadScriptures() {
    try {
        const response = await fetch("/json/scripture-list.json");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        scriptures = await response.json();
    } catch (error) {
        console.error("Error loading JSON:", error);
        document.getElementById("scriptureDisplay").innerText = "Failed to load scriptures.";
    }
}

function loadRandomScripture() {
    const availableScriptures = scriptures.filter(s => !usedWOLs.has(s.wol));
    if (availableScriptures.length === 0) return null;
    return availableScriptures[Math.floor(Math.random() * availableScriptures.length)];
}

const triviaQuestions = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "How many continents are there?", answer: "7" },
    { question: "What is the chemical symbol for water?", answer: "H2O" },
    { question: "Who painted the Mona Lisa?", answer: "Leonardo" },
    { question: "What planet is known as the Red Planet?", answer: "Mars" },
    { question: "What is the largest ocean on Earth?", answer: "Pacific" },
    { question: "What gas do plants absorb from the air?", answer: "Carbon" },
    { question: "What is the hardest natural substance?", answer: "Diamond" },
    { question: "What is the tallest mountain in the world?", answer: "Everest" },
    { question: "What is the fastest land animal?", answer: "Cheetah" },
    { question: "What is the smallest country in the world?", answer: "Vatican" },
    { question: "What is the main ingredient in guacamole?", answer: "Avocado" },
    { question: "Who discovered gravity?", answer: "Newton" },
    { question: "What is the longest river in the world?", answer: "Nile" },
    { question: "What is the national flower of Japan?", answer: "Cherry" }
];



document.addEventListener("DOMContentLoaded", async () => {
    await loadScriptures();
    document.querySelector("#askWOL").addEventListener("click", askTree);
    document.querySelector("#submitKeyword").addEventListener("click", checkWOLAnswer);
    document.querySelector("#submitTrivia").addEventListener("click", checkTriviaAnswer);
    resetInputs();
});

function updateWOLImage(isWOL) {
    const wolImage = document.querySelector("#treeSprite img");
    if (!wolImage) {
        console.error("Error: wolImage element not found!");
        return;
    }

    // Use absolute paths for public assets
    wolImage.src = isWOL ? "/assets/images/wol1.webp" : "/assets/images/wol2.webp";

    console.log(`Image updated to: ${wolImage.src}`);
}



function askTree() {
    resetInputs();
    const isWOL = Math.random() < 0.6;
    updateWOLImage(isWOL);

    // Correctly update the answer text
    document.getElementById("answer").innerText = isWOL ? "YES" : "NO";
    document.getElementById("answer").style.display = "block";

    if (isWOL) {
        showWOLInput();
        provideScripture();
    } else {
        showTriviaInput();
        askTrivia();
    }
}


function provideScripture() {
    if (collectedWOLs >= totalWOLs) {
        document.getElementById("scriptureDisplay").innerText = "Congratulations! You've collected all WOLs. Proceed to the next room.";
        return;
    }

    currentScripture = loadRandomScripture();

    console.log("Selected scripture:", currentScripture); // Debugging output

    if (currentScripture) {
        document.getElementById("scriptureDisplay").innerHTML = `<strong>${currentScripture.verse}:</strong> ${currentScripture.passage}`;
    } else {
        document.getElementById("scriptureDisplay").innerText = "No scriptures left!";
    }
}


function checkWOLAnswer(answer) {
    const userGuess = document.getElementById("keywordInput").value.trim().toUpperCase();
    if (!currentScripture || usedWOLs.has(currentScripture.wol)) return;

    document.getElementById("answer").style.display = "none";

    // Show scriptureDisplay if answer is "YES", hide if "NO"
    if (answer === "NO") {
        document.getElementById("scriptureDisplay").style.display = "none";
        return;
    } else {
        document.getElementById("scriptureDisplay").style.display = "block";
    }

    if (userGuess === currentScripture.wol.toUpperCase()) {
        collectedWOLs++;
        usedWOLs.add(currentScripture.wol);
        localStorage.setItem("collectedWOLs", collectedWOLs);
        localStorage.setItem("usedWOLs", JSON.stringify([...usedWOLs]));
        document.getElementById("wolCount").innerText = collectedWOLs;
        document.getElementById("scriptureDisplay").innerText = `Correct! You have collected WOL ${collectedWOLs}.`;

        // Check if all 11 WOLs have been collected
        if (collectedWOLs >= totalWOLs) {
            setTimeout(() => {
                alert("Congratulations! You've collected all 11 WOLs and completed the game!");
                window.location.href = "moon-room.html";
            }, 1000);
        }
    } else {
        document.getElementById("scriptureDisplay").innerText = `Incorrect. The correct answer was: ${currentScripture.wol}. Try again.`;
    }

    resetInputs();
}



function askTrivia() {
    currentTrivia = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
    document.getElementById("triviaQuestion").innerText = currentTrivia.question;
}

function checkTriviaAnswer() {
    const userAnswer = document.getElementById("triviaInput").value.trim().toLowerCase();
    if (!currentTrivia) return;

    if (userAnswer === currentTrivia.answer.toLowerCase()) {
        document.getElementById("scriptureDisplay").innerText = "";
        document.getElementById("scriptureDisplay").style.display = "none";
        document.getElementById("answer").style.display = "none";

        resetInputs();
    } else {
        document.getElementById("answer").style.display = "none";
        if (confirm(`Incorrect. The correct answer was: ${currentTrivia.answer}. Try again?`)) {
            askTrivia();
        } else {
            resetGame();
        }
    }
}


function resetGame() {
    collectedWOLs = 0;
    usedWOLs.clear();
    document.getElementById("wolCount").innerText = collectedWOLs;
    document.getElementById("scriptureDisplay").innerText = "Game restarted. Click 'Ask WOL' to begin.";
    resetInputs();
}

function showWOLInput() {

    document.getElementById("wolInputSection").classList.add("wol-active", "show");
    document.getElementById("triviaSection").classList.remove("trivia-active", "show");
}

function showTriviaInput() {
    document.getElementById("triviaSection").classList.add("trivia-active", "show");
    document.getElementById("wolInputSection").classList.remove("wol-active", "show");
}

function resetInputs() {
    document.getElementById("scriptureDisplay").innerText = "";
    document.getElementById("answer").style.display = "none";
    document.getElementById("scriptureDisplay").style.display = "block";
    document.getElementById("wolInputSection").classList.remove("wol-active", "show");
    document.getElementById("triviaSection").classList.remove("trivia-active", "show");
    document.getElementById("keywordInput").value = "";
    document.getElementById("triviaInput").value = "";
}
