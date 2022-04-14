


const editBtns = document.querySelectorAll('.edit-btn');

editBtns.forEach(editBtn =>{
    editBtn.addEventListener('click', e =>{
        let id = e.target.id.split('-')[2];

      const editForm = document.getElementById(`edit-form-${id}`);
      editForm.classList.toggle('hidden');


      const submitBtn = document.getElementById(`submit-edit-${id}`);

      const cancelBtn = document.getElementById(`cancel-edit-${id}`);
      cancelBtn.addEventListener('click', e=>{
        e.stopPropagation();
        console.log(e.target)
        editForm.classList.toggle('hidden');
      })

      submitBtn.addEventListener('click', async(submitEvent) => {
        submitEvent.preventDefault();
        const header = document.getElementById(`edit-header-${id}`).value
        const content = document.getElementById(`edit-content-${id}`)

        const res = await fetch(`/question/edit/${id}`, {
          method: 'PUT',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            header,
            content
          })
        })
       
      })
    })
  })
