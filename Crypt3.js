        // Timer for 3 days
        const countdown = 3 * 24 * 60 * 60; // 3 days in seconds
        let timeLeft = countdown;

        const timerElement = document.getElementById('timer');
        const backdrop = document.getElementById('backdrop');

        function updateTimer() {
            const days = Math.floor(timeLeft / (24 * 60 * 60));
            const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
            const seconds = timeLeft % 60;

            timerElement.textContent = `Next puzzle unlocks in: ${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (timeLeft > 0) {
                timeLeft--;
            } else {
                clearInterval(timerInterval);
                timerElement.textContent = "The next puzzle is now unlocked!";
                backdrop.style.display = 'none'; // Hide the backdrop when unlocked
            }
        }

        const timerInterval = setInterval(updateTimer, 1000);