const questionDeleteBtns = document.querySelectorAll('.question-delete-btn');
questionDeleteBtns.forEach(deleteBtn =>{
  deleteBtn.addEventListener('click',async(event) =>{
    console.log(questionDeleteBtns)
    const questionId = event.target.id.split('-')[2];


    const res = await fetch(`/question/${questionId}/delete`, {
      method: 'DELETE'
    })

    const data = await res.json();
    console.log(data)

    if(data.message ==='Success'){
      const questionContainer = document.getElementById(`question-container-${questionId}`);
      questionContainer.remove();

      if(data.path !== '/'){
        const answersContainer = document.getElementById('allAnswers');
        answersContainer.remove();
        window.location.href = '/';
      }
    }
  })
})


const questionEditBtns = document.querySelectorAll('.question-edit-btn');

questionEditBtns.forEach(editBtn =>{
    editBtn.addEventListener('click', e =>{

      let id = e.target.id.split('-')[2];

      const editForm = document.getElementById(`edit-form-${id}`);
      editForm.classList.toggle('hidden');

      if(editBtn.innerText ==='Cancel'){
        editBtn.innerText = "Edit";
        editBtn.style.backgroundColor= "#364F59";
        editBtn.style.color= "#C2C7CB";

      } else{
        editBtn.innerText = "Cancel";
        editBtn.style.backgroundColor= "red";
        editBtn.style.color= "white";
      }

      const submitBtn = document.getElementById(`submit-edit-${id}`);

      submitBtn.addEventListener('click', async(submitEvent) => {
        submitEvent.preventDefault();
        const header = document.getElementById(`edit-header-${id}`).value;
        const content = document.getElementById(`edit-content-${id}`).value;

        const res = await fetch(`/question/${id}/edit`, {
          method: 'PUT',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            header,
            content
          })
        })

        const data = await res.json();
        if(data.message === 'Success'){
            editForm.classList.toggle('hidden');
            const headerEle = document.querySelectorAll(`#question-header-${id}`)[0];
            const contentEle = document.getElementById(`question-content-${id}`);
            headerEle.innerHTML = data.question.header;
            contentEle.innerHTML = data.question.content;
            editBtn.innerText = "Edit";
            editBtn.style.backgroundColor= "#364F59";
            editBtn.style.color= "#C2C7CB";
        }
      })
    })
  });
