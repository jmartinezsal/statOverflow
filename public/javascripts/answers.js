window.addEventListener("DOMContentLoaded", () => {
    const addAnswer = document.querySelector(".answerBtn");
    

    addAnswer.addEventListener("click", e => {
        let id = e.target.id
        const answerForm = document.getElementById(`answerForm`);
        const userImg = document.getElementById(`userImg`);
        const toggle = document.getElementById('toggle')
        const toggleAgain = document.getElementById('toggleAgain')
        
        answerForm.classList.toggle('hidden');
        userImg.classList.toggle('hidden');

        const addBtn = document.querySelector(".addBtn");
        const answerCont = document.querySelectorAll(`.question-answer-${id}`);
        // const currAnswer2 = answerCont.parentElement.parentElement

        addBtn.addEventListener('click', async(event) => {
            event.preventDefault();
            const answer = document.getElementById(`answer`).value;
            
            const res = await fetch(`/question/${id}/answer/add`, {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                answer
              })
            })
            const data = await res.json();

            if (data.message === "Success") {
                let newDiv = document.createElement('div')
                newDiv.innerHTML = data.newAnswer.answer
                newDiv.classList.add("answer-success")
                answerCont[0].appendChild(newDiv)
                toggleAgain.classList.toggle('hidden');
                answerForm.classList.toggle('hidden');
                toggle.classList.toggle('hidden');

            }
                   
    })
})

const editBtns = document.querySelectorAll('.editBtn');

editBtns.forEach(editBtn =>{
    editBtn.addEventListener('click', e =>{
        let target = e.target.id;
        const questionId = target.split('-')[0]
        const answerId = target.split('-')[1]


      const editForm = document.getElementById(`edit-form-${answerId}`);
      editForm.classList.toggle('hidden');


      const submitBtn = document.getElementById(`submit-${answerId}`);
    //   const cancelBtn = document.getElementById(`cancel-edit-${id}`);

      // cancelBtn.addEventListener('click', e=>{
      //   e.stopPropagation();
      //   console.log(e.target)
      //   editForm.classList.toggle('hidden');
      // })

      submitBtn.addEventListener('click', async(submitEvent) => {
        submitEvent.preventDefault();
        const answer = document.getElementById(`answer-${answerId}`).value;

        const res = await fetch(`/question/${questionId}/answer/edit/${answerId}`, {
          method: 'PUT', 
          
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            answer
          })
        })

        const data = await res.json();
        if(data.message === 'Success'){
          const answer = document.querySelectorAll(`#answer-${answerId}`)[0];
          
          answer.innerHTML = data.answer.answer;
          editForm.classList.toggle('hidden');
        } else{
          //Create error message
        }

      })
    })
  })

    const deleteBtn = document.querySelectorAll(".deleteBtn");
    
    deleteBtn.forEach((btn) => {
        btn.addEventListener("click", async (event) => {
          event.preventDefault();
          event.stopPropagation();
            
          const currQuestion = btn.parentElement;
          const currAnswer = btn.parentElement.parentElement
          console.log(currAnswer)
          currAnswer.remove();
            try {
              await fetch(`/question/${currQuestion.id}/answer/delete/${currAnswer.id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } catch (error) {
              console.error(error);
            }
        })})})