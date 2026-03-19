// Highlight active nav link
const links = document.querySelectorAll(".nav-item-link");

const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
const linkPage = link.getAttribute("href");

if(linkPage === currentPage){
link.classList.add("fw-bold", "text-warning");
}
});