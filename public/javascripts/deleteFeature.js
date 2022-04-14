const deleteBtns = document.querySelectorAll('.delete-btn');
deleteBtns.forEach(deleteBtn =>{
  deleteBtn.addEventListener('click',async(event) =>{

    const questionId = event.target.id.split('-')[2];

    const res = await fetch(`/question/delete/${questionId}`, {
      method: 'DELETE'
    })

    const data = await res.json();
    console.log(data)

    if(data.message ==='Success'){
      const questionContainer = document.getElementById(`question-container-${questionId}`);
      questionContainer.remove();
    }

  })
})
