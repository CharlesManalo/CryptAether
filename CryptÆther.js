let incorrectAttempts = 0;
let isLocked = false;
let lockTimeout;
let lockDuration = 5 * 60; // 5 minutes in seconds

// Function to create typing animation effect
document.addEventListener('DOMContentLoaded', function() {
    const sequenceText = document.querySelector('.sequence-text');
    const originalText = sequenceText.textContent.trim();
    sequenceText.innerHTML = ''; // Clear the text
    
    // Create a span for the typing animation
    const typingSpan = document.createElement('span');
    typingSpan.className = 'typing-animation';
    typingSpan.textContent = originalText;
    sequenceText.appendChild(typingSpan);
    
    // Add pulse animation to buttons after typing is complete
    setTimeout(() => {
        document.querySelectorAll('.riddle-button').forEach(button => {
            button.style.animation = 'glow 1.5s infinite';
        });
    }, 3500); // Match with typing animation duration
});

// Function to check lock state on page load
function checkLockState() {
    const lockData = JSON.parse(localStorage.getItem('lockData'));
    if (lockData) {
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        const remainingTime = lockData.endTime - currentTime;

        if (remainingTime > 0) {
            lockDuration = remainingTime; // Set remaining time
            lockWebsite(); // Lock the website
        } else {
            localStorage.removeItem('lockData'); // Clear lock data if time is up
        }
    }
}

function validateInput(input) {
    // The correct input/locus - case insensitive check for "noli"
    const correctInput = input.toLowerCase() === "noli";
    
    if (isLocked) {
        alert("Website is locked. Please wait 5 minutes before trying again.");
        return false;
    }

    if (correctInput) {
        incorrectAttempts = 0;
        // Redirect to the new page on success - using encodeURI to handle special characters
        window.location.href = "Crypt%20%C3%86ther2.html";
        return true;
    } else {
        incorrectAttempts++;
        
        if (incorrectAttempts >= 3) {
            lockWebsite();
        } else {
            alert(`Incorrect input. ${3 - incorrectAttempts} attempts remaining before lockout.`);
        }
        return false;
    }
}

// Function to lock the website
function lockWebsite() {
    isLocked = true;
    incorrectAttempts = 0;

    // Disable all interactive elements
    document.querySelector('.command-input').disabled = true;
    document.querySelectorAll('.riddle-button').forEach(button => {
        button.disabled = true;
    });

    // Apply blur effect to the body
    document.body.classList.add('locked');

    // Show timer overlay
    const timerOverlay = document.getElementById('lock-timer');
    timerOverlay.style.display = 'flex'; // Use flex to center content
    timerOverlay.textContent = `Locked for ${lockDuration / 60} minutes`;

    // Store lock state in localStorage
    const endTime = Math.floor(Date.now() / 1000) + lockDuration; // Calculate end time
    localStorage.setItem('lockData', JSON.stringify({ endTime }));

    // Start countdown
    let remainingTime = lockDuration;
    const countdown = setInterval(() => {
        remainingTime--;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        timerOverlay.textContent = `Locked for ${minutes}:${seconds < 10 ? '0' : ''}${seconds} minutes`;

        if (remainingTime <= 0) {
            clearInterval(countdown);
            unlockWebsite();
        }
    }, 1000); // Update every second
}

// Function to unlock the website
function unlockWebsite() {
    isLocked = false;

    // Re-enable all interactive elements
    document.querySelector('.command-input').disabled = false;
    document.querySelectorAll('.riddle-button').forEach(button => {
        button.disabled = false;
    });

    // Remove blur effect
    document.body.classList.remove('locked');

    // Hide timer overlay
    const timerOverlay = document.getElementById('lock-timer');
    timerOverlay.style.display = 'none';

    // Clear lock data from localStorage
    localStorage.removeItem('lockData');
}

// Call checkLockState on page load
document.addEventListener('DOMContentLoaded', checkLockState);

// Add event listener to the Enter button
document.getElementById('enter-btn').addEventListener('click', () => {
    const input = document.querySelector('.command-input').value;
    validateInput(input);
});

// Add event listener for Enter key
document.querySelector('.command-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const input = e.target.value;
        validateInput(input);
    }
});

// Add event listener for the Get Clue button
document.getElementById('clue-btn').addEventListener('click', function() {
    // Hide the clue button itself
    this.style.display = 'none';
    
    const riddleText = document.querySelector('.riddle-text');
    
    // Create backdrop dynamically if it doesn't exist or get existing one
    let backdrop = document.querySelector('.backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'backdrop';
        document.body.appendChild(backdrop);
    }
    
    // Set the backdrop to fill the entire screen
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.right = '0';
    backdrop.style.bottom = '0';
    backdrop.style.width = '100vw';
    backdrop.style.height = '100vh';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    backdrop.style.backdropFilter = 'blur(5px)';
    backdrop.style.webkitBackdropFilter = 'blur(5px)';
    backdrop.style.zIndex = '50';
    
    riddleText.textContent = "The FIRST famous book name of Dr. Jose Rizal";
    
    // Apply animations to riddle and backdrop
    riddleText.classList.remove('hide');
    backdrop.classList.remove('hide');
    
    riddleText.style.display = 'block';
    backdrop.style.display = 'block';
    
    riddleText.classList.add('show');
    backdrop.classList.add('show');
    
    // Make the clue disappear after 3 seconds
    setTimeout(() => {
        riddleText.classList.remove('show');
        backdrop.classList.remove('show');
        
        riddleText.classList.add('hide');
        backdrop.classList.add('hide');
        
        setTimeout(() => {
            riddleText.style.display = 'none';
            backdrop.style.display = 'none';
            
            riddleText.classList.remove('hide');
            backdrop.classList.remove('hide');
        }, 500); // Match with fadeOut animation duration
    }, 3000);
});

// Add event listener for the Get Riddle button
document.getElementById('riddle-btn').addEventListener('click', function() {
    const riddleText = document.querySelector('.riddle-text');
    
    // Create backdrop dynamically if it doesn't exist or get existing one
    let backdrop = document.querySelector('.backdrop');
    if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'backdrop';
        document.body.appendChild(backdrop);
    }
    
    // Set the backdrop to fill the entire screen
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.right = '0';
    backdrop.style.bottom = '0';
    backdrop.style.width = '100vw';
    backdrop.style.height = '100vh';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    backdrop.style.backdropFilter = 'blur(5px)';
    backdrop.style.webkitBackdropFilter = 'blur(5px)';
    backdrop.style.zIndex = '50';
    
    riddleText.textContent = "I spoke of shadows in a town that sleeps,\nIn ink, I sowed what the tyrant reaps.\nLatin whispers on my book's first breath,\nWhat single word lights freedom's death?";
    
    // Apply animations to riddle and backdrop
    riddleText.classList.remove('hide');
    backdrop.classList.remove('hide');
    
    riddleText.style.display = 'block';
    backdrop.style.display = 'block';
    
    riddleText.classList.add('show');
    backdrop.classList.add('show');
    
    // Make the riddle disappear after 10 seconds
    setTimeout(() => {
        riddleText.classList.remove('show');
        backdrop.classList.remove('show');
        
        riddleText.classList.add('hide');
        backdrop.classList.add('hide');
        
        setTimeout(() => {
            riddleText.style.display = 'none';
            backdrop.style.display = 'none';
            
            riddleText.classList.remove('hide');
            backdrop.classList.remove('hide');
        }, 500); // Match with fadeOut animation duration
    }, 10000); // 10 seconds

    // Hide the Get Riddle button immediately when pressed
    this.style.display = 'none'; // Hide the button
});
