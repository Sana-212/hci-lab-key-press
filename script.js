const character = document.getElementById("character");
const attemptsDisplay = document.getElementById("attemptDisplay");
const messageDisplay = document.getElementById("messageDisplay");

let attempts = 0;
let totalTime = 0;
let startTime;
let currentChar = "";

function getRandomNumOrChar() {
    const isLetter = Math.random() < 0.5;
    if (isLetter) {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    } else {
        return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    }
}

document.addEventListener("keypress", (e) => {
    if (attempts >= 5) return;

    if (e.key === " ") {
        currentChar = getRandomNumOrChar();
        character.innerText = currentChar;
        startTime = Date.now();
        messageDisplay.innerText = "Go! Press the correct key!";
        return;
    }

    if (!startTime) return;

    // Check correct key
    let isCorrect = false;
    if ((/[A-Z]/.test(currentChar) && e.key.toLowerCase() === "a") ||
        (/[0-9]/.test(currentChar) && e.key.toLowerCase() === "l")) {
        isCorrect = true;
    }

    if (isCorrect) {
        const reactionTime = Date.now() - startTime;
        totalTime += reactionTime;
        attempts++;

        attemptsDisplay.innerText = `Attempt: ${attempts} / 5`;
        messageDisplay.innerText = `✅ Correct! Reaction time: ${(reactionTime/1000).toFixed(2)} s`;

        character.innerText = "?";
        startTime = null;
    } else {
        messageDisplay.innerText = "❌ Wrong key! Try again!";
    }

    // End game
    if (attempts === 5) {
        const avg = totalTime / attempts / 1000;
        let feedback = "";
        if (avg < 0.5) {
            feedback = "🔥 Insane reflexes!";
        } else if (avg < 0.9) {
            feedback = "👏 Pretty fast!";
        } else {
            feedback = "🐢 Slow... but trying 😄";
        }
        messageDisplay.innerText = `Game Over! Average: ${avg.toFixed(2)} s. ${feedback}`;
    }
});