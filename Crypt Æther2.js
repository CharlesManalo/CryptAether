        // Matrix rain effect
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Characters to display
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$&+,:;=?@#|'<>-_*.";
        
        // Font size and columns
        const fontSize = 12;
        const columns = Math.floor(canvas.width / fontSize);
        
        // Initialize drops at random positions
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * canvas.height;
        }
        
        // Draw the matrix rain
        function drawMatrix() {
            // Semi-transparent black to create fade effect
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Green text
            ctx.fillStyle = "#0f0";
            ctx.font = fontSize + "px monospace";
            
            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                // Random character
                const char = characters.charAt(Math.floor(Math.random() * characters.length));
                
                // Draw the character
                ctx.fillText(char, i * fontSize, drops[i] * fontSize);
                
                // Move drops down and reset when off-screen
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        // Animate the matrix
        setInterval(drawMatrix, 50);
        
        // Resize canvas when window size changes
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Connect to Crypt Æther.html and CryptAether2.css
        document.addEventListener('DOMContentLoaded', () => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'CryptAether2.css';
            document.head.appendChild(link);
        });
