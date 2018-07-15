// init DOM elements
let innerContainer = document.querySelector(`#inner-container`);
let inputGroup = document.querySelector(`.input-group`);
let formBox = document.querySelector(`#form-box`);
// button
let prevBtn = document.querySelector(`#prev-btn`);
let nextBtn = document.querySelector(`#next-btn`);
// input
let inputField = document.querySelector(`#input-field`);
let inputLabel = document.querySelector(`#input-label`);
// progress
let progressBar = document.querySelector(`#progress-bar`);
let inputProgress = document.querySelector(`#input-progress`);
let progress = document.querySelector(`.progress`);
// question
const questions = [
    { question: 'Enter Your First Name' },
    { question: 'Enter Your Last Name' },
    { question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/ },
    { question: 'Create A Password', type: 'password' }
];
// init position
let position = 0;
// events
document.addEventListener("DOMContentLoaded",getQues);
nextBtn.addEventListener("click",validate);
inputField.addEventListener("keyup",e => {
    if (e.keyCode === 13){
        validate();
    }
});
prevBtn.addEventListener("click",goBack);
// function
function getQues() {
    inputLabel.innerHTML = questions[position].question;
    inputField.type = questions[position].type || `text`;
    prevBtn.className = position ? `fa fa-arrow-left mb-4 fa-2x` : `fa fa-user mb-4 fa-2x`;
    showQuest();
}
function goBack() {
    if (position===0){
        shake();
    }
    else if(position >=1){
        position --;
        inputField.value = questions[position].answer;
        getQues();
    }
}
function validate() {
    if (!inputField.value.match(questions[position].pattern||/.+/)){
        inputFail();
    }
    else{
        inputPass();
    }
}
// check
function showQuest() {
    inputProgress.style.width = `100%`;
    progressBar.style.width = `${(position*100)/questions.length}%`;
}
function inputFail() {
    shake();
    inputProgress.style.borderColor = `#dc3545`;
    nextBtn.style.color = `#dc3545`;
}
function inputPass() {
    questions[position].answer=inputField.value || ``;
    console.log(questions[position].answer);
    position++;
    if (questions[position]){
        inputField.value = questions[position].answer || ``;
        inputField.focus();
        hidden();
        getQues();
    }
    else {
        complete();
    }
}
// move
function complete() {
    progressBar.style.width=`100%`;
    innerContainer.classList.add(`form-complete`);
    setTimeout(function () {
        innerContainer.innerHTML = `<h1 class="display-4 text-primary">tnx ${questions[0].answer} for login</h1>`;
    },1000)
}
function hidden() {
    inputProgress.style.borderColor = ``;
    nextBtn.style.color = ``;
}
function shake() {
    for (let i = 0; i<6; i++){
        let x = ((i%2)*2-1)*30;
        setTimeout(function () {
            innerContainer.style.transform = `translate(${x}px,0)`;
        },i*100);
    }
    setTimeout(function () {
        innerContainer.style.transform = `translate(0,0)`;
    },600);
}
