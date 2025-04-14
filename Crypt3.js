        // Timer for 10 seconds (changed from 3)
        const countdown = 10; // 10 seconds
        let timeLeft = countdown;
        let timerInterval;

        // Tracking incorrect attempts
        let incorrectAttempts = 0;
        let isLocked = false;
        let lockDuration = 5 * 60; // 5 minutes in seconds (same as Index.html)

        const timerElement = document.getElementById('timer');
        const backdrop = document.getElementById('backdrop');
        const imageContainer = document.querySelector('.image-container');
        const hiddenImage = document.getElementById('hidden-image');
        const userInput = document.getElementById('user-input');
        const verifyBtn = document.getElementById('verify-btn');
        const message = document.getElementById('message');

        // Set up the hint message functionality when the DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            console.log("DOM fully loaded");
            
            // Get message elements
            const hintLink = document.getElementById('hint-link');
            const hintMessage = document.getElementById('hint-message');
            const messageBackdrop = document.getElementById('message-backdrop');
            
            console.log("Hint link:", hintLink);
            console.log("Hint message:", hintMessage);
            
            // Add click event listener to the hint link
            if (hintLink) {
                hintLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    console.log("Message button clicked");
                    
                    // Reset any closing animations
                    hintMessage.classList.remove('closing');
                    messageBackdrop.classList.remove('closing');
                    
                    // Show the message and backdrop
                    hintMessage.style.display = 'block';
                    messageBackdrop.style.display = 'block';
                    console.log("Showing message");
                    
                    // Add a typing animation effect to the text
                    addTypingEffect();
                    
                    // Auto-hide after 10 seconds
                    setTimeout(() => {
                        hideMessage();
                    }, 10000);
                });
                
                // Add click event to backdrop to close message
                messageBackdrop.addEventListener('click', function() {
                    hideMessage();
                });
                
                console.log("Event listener added to hint link");
            } else {
                console.log("Hint link not found in DOM");
            }
            
            // Function to add typing animation effect to the message content
            function addTypingEffect() {
                const paragraphs = hintMessage.querySelectorAll('p');
                
                // Reset all paragraphs first
                paragraphs.forEach(p => {
                    p.style.opacity = "0";
                });
                
                // Animate each paragraph with a delay
                paragraphs.forEach((p, index) => {
                    setTimeout(() => {
                        p.style.transition = "opacity 0.3s ease-in-out";
                        p.style.opacity = "1";
                    }, 200 * (index + 1)); // Stagger the animations
                });
            }
            
            // Function to hide the message with animation
            function hideMessage() {
                // Add closing animation classes
                hintMessage.classList.add('closing');
                messageBackdrop.classList.add('closing');
                
                // Wait for animations to complete before hiding
                setTimeout(() => {
                    hintMessage.style.display = 'none';
                    messageBackdrop.style.display = 'none';
                    hintMessage.classList.remove('closing');
                    messageBackdrop.classList.remove('closing');
                    console.log("Hiding message");
                }, 500); // Match with animation duration
            }
            
            // Check lock state and initialize the timer
            checkLockState();
        });

        function updateTimer() {
            timerElement.textContent = `Next puzzle unlocks in: ${timeLeft}s`;

            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(timerInterval);
                timerElement.textContent = "The next puzzle is now unlocked!";
                
                // Hide the backdrop and timer container
                backdrop.style.display = 'none';
                document.querySelector('.timer-container').style.display = 'none';
                
                // Show the image and input field
                showImageAndInput();
            }
        }

        function showImageAndInput() {
            // Display the image container
            imageContainer.style.display = 'flex';
            
            // Focus on the input field for better user experience
            setTimeout(() => {
                userInput.focus();
            }, 500);
            
            console.log("Image container displayed");
        }

        // Check lock state on page load
        function checkLockState() {
            const lockData = JSON.parse(localStorage.getItem('lockData3')); // Use lockData3 to keep separate from Index.html
            if (lockData) {
                const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
                const remainingTime = lockData.endTime - currentTime;

                if (remainingTime > 0) {
                    timeLeft = remainingTime; // Set remaining time
                    timerElement.textContent = `Next puzzle unlocks in: ${timeLeft}s`;
                    timerInterval = setInterval(updateTimer, 1000); // Start the timer
                } else {
                    localStorage.removeItem('lockData3'); // Clear lock data if time is up
                    
                    // Hide the backdrop and timer container
                    backdrop.style.display = 'none';
                    document.querySelector('.timer-container').style.display = 'none';
                    
                    // Show the image and input field
                    showImageAndInput();
                }
            } else {
                // If no lock data, set the timer and lock the website
                const endTime = Math.floor(Date.now() / 1000) + countdown; // Calculate end time
                localStorage.setItem('lockData3', JSON.stringify({ endTime }));
                timerInterval = setInterval(updateTimer, 1000); // Start the timer
            }
            
            // Also check verification lock state
            const verifyLockData = JSON.parse(localStorage.getItem('verifyLockData'));
            if (verifyLockData) {
                const currentTime = Math.floor(Date.now() / 1000);
                const remainingTime = verifyLockData.endTime - currentTime;
                
                if (remainingTime > 0) {
                    isLocked = true;
                    lockWebsite(remainingTime);
                } else {
                    localStorage.removeItem('verifyLockData');
                    isLocked = false;
                    incorrectAttempts = 0;
                }
            }
        }

        // Function to lock the website due to too many incorrect attempts
        function lockWebsite(remainingTime = lockDuration) {
            isLocked = true;
            incorrectAttempts = 0;
            
            // Disable input and button
            userInput.disabled = true;
            verifyBtn.disabled = true;
            
            // Create and show lock timer overlay
            let lockTimer = document.getElementById('lock-timer');
            if (!lockTimer) {
                lockTimer = document.createElement('div');
                lockTimer.id = 'lock-timer';
                lockTimer.className = 'timer-overlay';
                document.body.appendChild(lockTimer);
            }
            
            lockTimer.style.display = 'flex';
            lockTimer.textContent = `Locked for ${Math.floor(remainingTime / 60)}:${(remainingTime % 60).toString().padStart(2, '0')} minutes`;
            
            // Store lock state in localStorage
            const endTime = Math.floor(Date.now() / 1000) + remainingTime;
            localStorage.setItem('verifyLockData', JSON.stringify({ endTime }));
            
            // Start countdown
            let timeRemaining = remainingTime;
            const countdown = setInterval(() => {
                timeRemaining--;
                const minutes = Math.floor(timeRemaining / 60);
                const seconds = timeRemaining % 60;
                lockTimer.textContent = `Locked for ${minutes}:${seconds.toString().padStart(2, '0')} minutes`;
                
                if (timeRemaining <= 0) {
                    clearInterval(countdown);
                    unlockWebsite();
                }
            }, 1000);
        }

        // Function to unlock the website
        function unlockWebsite() {
            isLocked = false;
            
            // Re-enable input and button
            userInput.disabled = false;
            verifyBtn.disabled = false;
            
            // Hide lock timer overlay
            const lockTimer = document.getElementById('lock-timer');
            if (lockTimer) {
                lockTimer.style.display = 'none';
            }
            
            // Clear lock data from localStorage
            localStorage.removeItem('verifyLockData');
        }

        verifyBtn.addEventListener('click', function() {
            // Check if website is locked
            if (isLocked) {
                alert("Website is locked. Please wait until the lockout period expires.");
                return;
            }
            
            const inputValue = userInput.value.trim();
            if (inputValue.toLowerCase() === "luna") {
                // Create success message with link
                message.innerHTML = "Correct! <span class='success-text'>Luna</span> is the answer.<br><br>" +
                                   "<a href='Crypt4.html' class='next-link'>Click here to proceed to the next puzzle</a>";
                message.style.color = "#00ff00"; // Green for correct
                message.style.display = 'block';
                incorrectAttempts = 0; // Reset attempts on correct answer
                
                // Add a celebration effect (optional)
                document.body.classList.add('success');
            } else {
                incorrectAttempts++;
                const attemptsLeft = 3 - incorrectAttempts;
                
                if (attemptsLeft > 0) {
                    message.textContent = `Incorrect. ${attemptsLeft} attempts remaining before lockout.`;
                    message.style.color = "#ff3333"; // Red for incorrect
                    message.style.display = 'block';
                } else {
                    message.textContent = "Too many incorrect attempts. Website locked for 5 minutes.";
                    message.style.color = "#ff3333"; // Red for incorrect
                    message.style.display = 'block';
                    lockWebsite();
                }
            }
        });
