const options = document.getElementById('quiz-options')
const question = document.getElementById('question')
const submitButton = document.getElementById('submit')
let correctAnswer = ""

document.addEventListener('DOMContentLoaded', () => {
    loadQuestion()
    eventListeners()
})

function eventListeners(){
    submitButton.addEventListener('click', checkAnswer)
}

async function loadQuestion() {
    const url = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple'
    const result = await fetch(`${url}`)
    const data = await result.json()
    showQuestion(data.results[0])
}

function showQuestion(data){
    correctAnswer = data.correct_answer
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

    selectOption()
}

function selectOption() {
    options.querySelectorAll('li').forEach((option) => {
        option.addEventListener('click', () =>{
            if (options.querySelector('.selected')){
               const activeOption = options.querySelector('.selected')
                activeOption.classList.remove('selected')
           }
            option.classList.add('selected')
        })
    })
}

function checkAnswer() {
    submitButton.disabled = true
    if (options.querySelector('.selected')){
        let selectedAnswer = options.querySelector('.selected label').textContent
        console.log(correctAnswer)
        if (selectedAnswer === correctAnswer){
            alert('Correct Answer')
        }else{
            alert('Incorrect Answer')
        }
        setTimeout(() => {
             loadQuestion()
            submitButton.disabled = false
        }, 500)
    }
}