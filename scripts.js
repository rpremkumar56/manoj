document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const startQuestBtn = document.getElementById('start-quest-btn');
    let currentScreenIndex = 0;

    // --- Easter Egg (AC Wisdom) ---
    const acEasterEgg = document.getElementById('ac-easter-egg');
    if (acEasterEgg) {
        acEasterEgg.addEventListener('click', () => {
            alert("Manoj's Wisdom: 'This is not Bengaluru weather, this shall pass... (and it has, Monsoon has come early to Bangalore!)");
        });
    }

    function showScreen(index) {
        screens.forEach((screen, i) => {
            screen.classList.toggle('active', i === index);
        });
    }

    // --- Intro Screen ---
    if (startQuestBtn) {
        startQuestBtn.addEventListener('click', () => {
            currentScreenIndex = 1; // Move to Literary Screen
            showScreen(currentScreenIndex);
        });
    }

    // --- General Logic for Choice Screens ---
    screens.forEach((screen, screenArrayIndex) => { // screenArrayIndex is the actual index in the NodeList
        // Skip intro (index 0) and finale (last index) for this choice logic
        if (screenArrayIndex === 0 || screenArrayIndex === screens.length - 1) return;

        const choices = screen.querySelectorAll('.choice');
        const feedbackEl = screen.querySelector('.feedback');
        const nextStageBtn = screen.querySelector('.next-stage-btn');
        let answeredCorrectly = false;

        // Determine the correct badge ID for this screen
        // This assumes your screen IDs match the pattern 'literary-screen', 'haiku-screen', etc.
        // And your badge IDs are 'badge-book', 'badge-haiku', etc.
        let badgeId = '';
        if (screen.id === 'literary-screen') badgeId = 'badge-book';
        else if (screen.id === 'haiku-screen') badgeId = 'badge-haiku';
        else if (screen.id === 'travel-screen') badgeId = 'badge-travel';
        else if (screen.id === 'marketing-screen') badgeId = 'badge-marketing';


        choices.forEach(choice => {
            choice.addEventListener('click', () => {
                if (answeredCorrectly) return; // Prevent multiple answers

                // Remove selection classes from other buttons in this group
                choices.forEach(btn => {
                    btn.classList.remove('selected-correct', 'selected-incorrect');
                });

                const isCorrect = choice.dataset.correct === 'true';
                if (isCorrect) {
                    choice.classList.add('selected-correct');
                    feedbackEl.textContent = "Spot on, Manoj! Excellent!";
                    feedbackEl.className = 'feedback correct';
                    answeredCorrectly = true;

                    // Show the specific badge for this screen
                    if (badgeId) {
                        const badgeElement = document.getElementById(badgeId);
                        if (badgeElement) {
                            badgeElement.style.display = 'inline-block';
                            // Timeout helps CSS transition to apply after display:block
                            setTimeout(() => badgeElement.classList.add('earned'), 50);
                        }
                    }

                    if (nextStageBtn) nextStageBtn.style.display = 'inline-block';
                } else {
                    choice.classList.add('selected-incorrect');
                    feedbackEl.textContent = "Not quite, but good guess!";
                    feedbackEl.className = 'feedback incorrect';
                }
            });
        });

        if (nextStageBtn) {
            nextStageBtn.addEventListener('click', () => {
                if (answeredCorrectly) {
                    currentScreenIndex++; // This variable tracks which screen *should* be active
                    showScreen(currentScreenIndex);
                    if (currentScreenIndex === screens.length - 1) { // If finale screen
                        const cakeImg = document.getElementById('cake-img');
                        if (cakeImg) cakeImg.style.display = 'block'; // Show cake on finale
                    }
                }
            });
        }
    });

    // Initialize: Show the intro screen first
    showScreen(currentScreenIndex);
});
