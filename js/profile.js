//Read data
function getCompleted(){
    try{
        return JSON.parse(localStorage.getItem("completedCourses")) || [];
    }catch{
        return [];
    }
}

const completed = getCompleted();
const list = document.getElementById("completedList");

const courses = [
    { id:1, name:"JavaScript Basics" },
    { id:2, name:"HTML & CSS" },
    { id:3, name:"React Fundamentals" },
    { id:4, name:"C# Programming" },
    { id:5, name:"SQL Database" },
    { id:6, name:"Angular" },
    { id:7, name:"Python" },
    { id:8, name:"Node.js" }
];

//Render Completed Courses 
if(list){
    list.innerHTML = "";

    completed.forEach(id=>{
    const course = courses.find(c => c.id === id);

    const li = document.createElement("li");
    li.className = "list-group-item";

    li.textContent = course ? course.name : "Unknown Course";

    list.appendChild(li);
    });
}

//Quiz Score 
const score = localStorage.getItem("quizScore");
const total = localStorage.getItem("totalQuestions");

const scoreEl = document.getElementById("quizScore");

if(scoreEl){
    if(score && total){
        scoreEl.textContent = `Last Score: ${score} / ${total}`;
    }else{
        scoreEl.textContent = "Quiz not attempted";
    }
}

//Name Handling
function handleName(){

const input = document.getElementById("usernameInput");
const btn = document.getElementById("nameBtn");

if(btn.textContent === "Save"){

    const name = input.value.trim();

    if(name === ""){
        alert("Enter valid name");
        return;
    }

    // Save
    localStorage.setItem("username", name);

    //Update Name
    document.getElementById("displayName").textContent = name;
    input.disabled = true;

    //Edit button
    btn.textContent = "Edit";
    btn.classList.remove("btn-success");
    btn.classList.add("btn-warning");

    }else{
    
    input.disabled = false;

    // Change button
    btn.textContent = "Save";
    btn.classList.remove("btn-warning");
    btn.classList.add("btn-success");

    }
}

//Page Load 
window.onload = function(){

const savedName = localStorage.getItem("username");

const input = document.getElementById("usernameInput");
const btn = document.getElementById("nameBtn");
const display = document.getElementById("displayName");

    if(savedName){
        display.textContent = savedName;
        input.value = savedName;
        input.disabled = true;
        btn.textContent = "Edit";
        btn.classList.remove("btn-success");
        btn.classList.add("btn-warning");

    }
    else{
        display.textContent = "Not set";
    }
};