


const editBtns = document.querySelectorAll('.edit-btn');

editBtns.forEach(editBtn =>{
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

        const res = await fetch(`/question/edit/${id}`, {
          method: 'PUT',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            header,
            content
          })
        })

        const data = await res.json();
        if(data.message ==='Success' ){

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
  })
