document.addEventListener('DOMContentLoaded', () => {
    const questionContainer = document.getElementById('questionContainer');
    const answerForm = document.getElementById('answerForm');
    const userAnswer = document.getElementById('userAnswer');
    const practiceMessage = document.getElementById('practiceMessage');

    const username = localStorage.getItem('username');
    const currentSetIndex = localStorage.getItem('currentSetIndex');
    const isPremium = localStorage.getItem('isPremium') === 'true';

    if (!username || currentSetIndex === null || !isPremium) {
        window.location.href = 'dashboard.html';
    }

    const studySets = JSON.parse(localStorage.getItem(`studySets_${username}`)) || [];
    const currentSet = studySets[currentSetIndex];

    if (!currentSet || !currentSet.content) {
        window.location.href = 'dashboard.html';
    }

    const questions = currentSet.content.split('\n').map(line => {
        const [question, answer] = line.split('|');
        return { question, answer };
    });

    console.log('Questions:', questions); // Debugging

    let currentQuestionIndex = 0;

    const showQuestion = () => {
        if (currentQuestionIndex < questions.length) {
            questionContainer.textContent = questions[currentQuestionIndex].question;
        } else {
            alert('Gefeliciteerd met het oefenen!');
            window.location.href = 'dashboard.html';
        }
    };

    const checkAnswer = () => {
        if (currentQuestionIndex >= questions.length) {
            return; // Don't check answer if there are no more questions
        }

        const answer = userAnswer.value.trim().toLowerCase();
        const correctAnswer = (questions[currentQuestionIndex].answer || '').trim().toLowerCase();

        console.log('Current Question Index:', currentQuestionIndex); // Debugging

        if (answer === correctAnswer) {
            practiceMessage.textContent = 'Correct!';
            currentQuestionIndex++;
            userAnswer.value = '';
            showQuestion();
        } else {
            if (currentQuestionIndex === questions.length - 1) {
                alert('Sorry, je hebt het fout. Probeer het nog een keer.');
                window.location.href = 'dashboard.html';
            } else {
                practiceMessage.textContent = 'Sorry, je hebt het fout. Probeer het nog een keer.';
            }
        }
    };

    answerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        checkAnswer();
    });

    userAnswer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkAnswer();
        }
    });

    showQuestion();
});
