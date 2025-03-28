let attempts = 2;

document.querySelectorAll('.world-btn').forEach(button => {
    button.addEventListener('click', function() {
        const selectedWorld = this.dataset.world;
        
        if (selectedWorld.toLowerCase() === 'celestial') {
            alert('Correct! The celestial kingdom awaits. Proceed to the Judgement Room.');
            window.location.href = 'judgement-room.html';
        } else {
            attempts--;
            document.getElementById('attempts').textContent = `Attempts remaining: ${attempts}`;
            
            if (attempts <= 0) {
                alert('You have run out of attempts. Return to the Dark Room to try again.');
                window.location.href = 'dark-room.html';
            } else {
                alert('Incorrect. Try again!');
            }
        }
    });
});