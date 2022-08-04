const questionDeleteBtns = document.querySelectorAll('.question-delete-btn');
questionDeleteBtns.forEach(deleteBtn =>{
  deleteBtn.addEventListener('click',async(event) =>{
    console.log(questionDeleteBtns)
    const questionId = event.target.id.split('-')[2];


    const res = await fetch(`/questions/${questionId}/delete`, {
      method: 'DELETE'
    })

    const data = await res.json();
    console.log(data)

    if(data.message ==='Success'){
      const questionContainer = document.getElementById(`question-container-${questionId}`);
      questionContainer.remove();

      if(data.path !== '/' || data.path !== '/questions'){
        const answersContainer = document.querySelector('.answers-container');
        answersContainer.remove();
        window.location.href = '/';
      }
    }
  })
})


const questionEditBtns = document.querySelectorAll('.question-edit-btn');

questionEditBtns.forEach(editBtn =>{
    editBtn.addEventListener('click', e =>{
      console.log(e.target)
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

        const res = await fetch(`/questions/${id}/edit`, {
          method: 'PUT',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            header,
            content
          })
        })

        const data = await res.json();
        if(data.message === 'Success'){
            editForm.classList.add('hidden');
            const headerEle = document.querySelectorAll(`#question-header-${id}`)[0];
            const contentEle = document.getElementById(`question-content-${id}`);
            const updatedAtEle = document.getElementById(`updatedAt-${id}`);
            headerEle.innerHTML = data.question.header;
            contentEle.innerHTML = data.question.content;
            updatedAtEle.innerHTML = `Created/Updated on ${data.question.updatedAt.toString().substring(11,19)}`;

            editBtn.innerText = "Edit";
            editBtn.style.backgroundColor= "#364F59";
            editBtn.style.color= "#C2C7CB";
        }
      })
    })
  });
