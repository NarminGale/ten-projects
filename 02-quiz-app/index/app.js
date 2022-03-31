const options = document.getElementById('quiz-options')
const question = document.getElementById('question')

async function loadQuestion() {
    const url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'
    const result = await fetch(`${url}`)
    const data = await result.json()
    showQuestion(data.results[0])
}

function showQuestion(data){
    let correctAnswer = data.correct_answer
    let incorrectAnswer = data.incorrect_answers
    let optionList = incorrectAnswer

    optionList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer)

    question.innerHTML = data.question

    options.innerHTML = optionList.map((option, index) =>
        ` <li>
            <input type="radio" id=${index} name="answer" class="answer"/>
            <label for=${index}>${option}</label>
        </li>`
    ).join('')

    console.log(data)
}

function getSelected() {
    const answer = document.querySelector('.answer')
    console.log(answer.value)
}

loadQuestion()