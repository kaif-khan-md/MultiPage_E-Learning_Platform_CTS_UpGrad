const quizQuestions = [

{
question:"What does HTML stand for?",
options:[
"Hyper Text Markup Language",
"High Transfer Machine Language",
"Home Tool Markup Language"
],
answer:0
},

{
question:"Which language styles web pages?",
options:["HTML","CSS","Java"],
answer:1
},

{
question:"Which method is used to select an element in JavaScript?",
options:["getElementById","querySelector","Both"],
answer:2
},

{
question:"Which SQL command is used to retrieve data?",
options:["SELECT","INSERT","UPDATE"],
answer:0
},

{
question:"Which of the following is a Python data type?",
options:["LinkedList","ArrayList","Tuple"],
answer:2
},

{
question:"Which framework is used for frontend development?",
options:["Angular","Django","Spring"],
answer:0
},

{
question:"Which keyword is used in C# for inheritance?",
options:[":","extends","inherits"],
answer:0
},

{
question:"Which method is used to add an element to an array in JavaScript?",
options:["push()","add()","insert()"],
answer:0
},

{
question:"Which SQL clause is used to filter records?",
options:["WHERE","GROUP BY","ORDER BY"],
answer:0
},

{
question:"Which Angular feature is used for navigation?",
options:["Routing","Services","Pipes"],
answer:0
}

];

let userAnswers = [];

//Async Quiz Load
function loadQuiz(){
    return new Promise(resolve=>{
    setTimeout(()=>{
     resolve(quizQuestions);
    },1000);
  });
}

//Start Quiz 
async function startQuiz(){
    if(typeof document === "undefined") return;

    const questions = await loadQuiz();
    renderQuiz(questions);
}

//Render Quiz
function renderQuiz(questions){

    const container = document.getElementById("quizContainer");
    if(!container) return;

    container.innerHTML = "";

    questions.forEach((q,i)=>{

    const div = document.createElement("div");
    div.className = "card p-3 mb-3";

    div.innerHTML = `
    <h5>${q.question}</h5>

    ${q.options.map((opt,index)=>`

    <label class="d-block">
    <input type="radio"
    name="q${i}"
    value="${index}"
    onchange="selectAnswer(${i}, ${index})">

    ${opt}
    </label>

    `).join("")}
    `;

    container.appendChild(div);

    });
}

//Store Answer
function selectAnswer(qIndex, optIndex){
    userAnswers[qIndex] = optIndex;
}

//Grade Calculation
function calculateGrade(percent){
    if(percent>=90) return "A";
    else if(percent>=75) return "B";
    else if(percent>=60) return "C";
    else return "F";
}

//Feedback
function feedbackMessage(grade){
    switch(grade){
    case "A": return "Excellent";
    case "B": return "Good Job";
    case "C": return "Needs Improvement";
    default: return "Try Again";
    }
}

//Submit Quiz 
function submitQuiz(){

    let score = 0;

    for(let i=0;i<quizQuestions.length;i++){

        if(userAnswers[i] === undefined){
            alert("Please answer all questions!");
            return;
        }

        if(userAnswers[i] === quizQuestions[i].answer){
            score++;
        }
    }

    const percent = (score/quizQuestions.length)*100;
    const formattedPercent = percent.toFixed(1);

    const grade = calculateGrade(percent);
    const message = feedbackMessage(grade);

    //Save to LocalStorage
    localStorage.setItem("quizScore", score);
    localStorage.setItem("totalQuestions", quizQuestions.length);

    //Show Result 
    const resultDiv = document.getElementById("result");

    if(resultDiv){
        resultDiv.innerHTML = `
        <h4>Score: ${score} / ${quizQuestions.length}</h4>
        <p>Percentage: ${formattedPercent}%</p>
        <p>Grade: ${grade}</p>
        <p>${message}</p>
        `;
    }

    //Reset Answers
    userAnswers = [];

    document.querySelectorAll('input[type="radio"]').forEach(radio=>{
    radio.checked = false;
    });

}

if(typeof window !== "undefined"){
startQuiz();
}

// ===== Export for Jest =====
if(typeof module !== "undefined"){
module.exports = { calculateGrade };
}