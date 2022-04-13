window.addEventListener("DOMContentLoaded", (event)=>{

})

const demoUserBtn = document.getElementById('demo__user');
demoUserBtn.addEventListener('click', event =>{
    event.stopPropagation();

    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const submitBtn = document.querySelector('button');

    username.value = "demo_dragon";
    password.value = "password123";
    


})
