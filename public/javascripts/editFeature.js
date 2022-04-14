


const editBtns = document.querySelectorAll('.edit-btn');

editBtns.forEach(editBtn =>{
    editBtn.addEventListener('click', e =>{
        let id = e.target.id.split('-')[2];

      const editForm = document.getElementById(`edit-form-${id}`);
      editForm.classList.toggle('hidden');


      const submitBtn = document.getElementById(`submit-edit-${id}`);
      const cancelBtn = document.getElementById(`cancel-edit-${id}`);

      // cancelBtn.addEventListener('click', e=>{
      //   e.stopPropagation();
      //   console.log(e.target)
      //   editForm.classList.toggle('hidden');
      // })

      submitBtn.addEventListener('click', async(submitEvent) => {
        submitEvent.preventDefault();
        const header = document.getElementById(`edit-header-${id}`).value;
        const content = document.getElementById(`edit-content-${id}`).value;

        const res = await fetch(`/question/edit/${id}`, {
          method: 'PUT',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            header,
            content
          })
        })

        const data = await res.json();
        if(data.message ==='Success'){
          const headerEle = document.querySelectorAll(`#question-header-${id}`)[0];
          const contentEle = document.getElementById(`question-content-${id}`);
          console.log(headerEle)
          headerEle.innerHTML = data.question.header;
          contentEle.innerHTML = data.question.content;
          editForm.classList.toggle('hidden');
        } else{
          //Create error message
        }


      })
    })
  })
