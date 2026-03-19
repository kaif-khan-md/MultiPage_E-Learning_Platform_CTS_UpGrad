const courses = [
{ id:1, name:"JavaScript Basics", lessons:["Variables","Functions","DOM","Events"]},
{ id:2, name:"HTML & CSS", lessons:["HTML","Forms","Flexbox","Grid"]},
{ id:3, name:"React Fundamentals", lessons:["Components","Props","State","Hooks"]},
{ id:4, name:"C# Programming", lessons:["Basics","OOP","LINQ","ASP.NET"]},
{ id:5, name:"SQL Database", lessons:["Queries","Joins","Indexes","Stored Procedures"]},
{ id:6, name:"Angular", lessons:["Components","Services","Routing","Forms"]},
{ id:7, name:"Python", lessons:["Syntax","Functions","Modules","OOP"]},
{ id:8, name:"Node.js", lessons:["Modules","Express","Middleware","APIs"]}
];

//localStorage read
function getCompleted(){
    try{
        return JSON.parse(localStorage.getItem("completedCourses")) || [];
    }
    catch{
        return [];
    }
}

const completed = getCompleted();

//Dashboard
const table = document.getElementById("courseTable");

if(table){
    courses.forEach(course=>{

    const status = completed.includes(course.id) ? "Completed" : "Pending";

    const row = document.createElement("tr");

    row.innerHTML = `
    <td>${course.name}</td>
    <td>${course.lessons.length}</td>
    <td>${status}</td>
    `;

    table.appendChild(row);

    });
}

//Courses Page 
const container = document.getElementById("courses");

if(container){

    container.innerHTML = "";

    courses.forEach(course=>{

    const isCompleted = completed.includes(course.id);

    const card = document.createElement("div");
    card.className = "card p-3 shadow";

    card.innerHTML = `
    <h5>${course.name}</h5>

    <ol>
    ${course.lessons.map(l=>`<li>${l}</li>`).join("")}
    </ol>

    <button class="btn ${isCompleted ? 'btn-secondary' : 'btn-success'} mt-2"
    onclick="completeCourse(${course.id})"
    ${isCompleted ? 'disabled' : ''}>

    ${isCompleted ? 'Completed' : 'Complete'}

    </button>
    `;

    container.appendChild(card);

    });
}

//Complete Course 
function completeCourse(id){

    const completed = getCompleted();

    if(!completed.includes(id)){
    completed.push(id);
    localStorage.setItem("completedCourses", JSON.stringify(completed));
    }

    location.reload();
}

//Progress
const progressBar = document.getElementById("progressBarBootstrap");
const progressText = document.getElementById("progressText");

if(progressBar){

    let completed = JSON.parse(localStorage.getItem("completedCourses")) || [];
    let percent = (completed.length / courses.length) * 100;
    progressBar.style.width = percent + "%";
    progressBar.innerText = percent.toFixed(0) + "%";


    progressBar.classList.remove("bg-danger","bg-warning","bg-success");

    if(percent < 40){
    progressBar.classList.add("bg-danger");
    }
    else if(percent < 75){
    progressBar.classList.add("bg-warning");
    }
    else{
    progressBar.classList.add("bg-success");
    }

}