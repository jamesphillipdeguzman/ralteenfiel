async function loadRandomScripture() {
    try {
        const response = await fetch("/json/scripture-list.json");

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const scriptures = await response.json();
        const randomIndex = Math.floor(Math.random() * scriptures.length);
        const scripture = scriptures[randomIndex];

        document.getElementById("scriptureDisplay").innerHTML =
            `<strong>${scripture.verse}:</strong> ${scripture.passage}`;

    } catch (error) {
        alert("Error loading JSON:", error);
        document.getElementById("scriptureDisplay").innerText = "Failed to load scripture.";
    }
}

document.addEventListener("DOMContentLoaded", loadRandomScripture);
