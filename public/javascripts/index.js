// window.addEventListener("load", (event)=>{
//     console.log("hello from javascript!")
// })

document.addEventListener('DOMContentLoaded',()=>{

const loginLink = document.getElementById('login');
const loginForm = document.querySelector(".login");
loginLink.addEventListener('click', (event) =>{
    event.preventDefault()
    loginForm.classList.toggle('hidden');
})

})
