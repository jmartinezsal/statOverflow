window.addEventListener("DOMContentLoaded", () => {
    // const editBtn = document.querySelectorAll(".editBtn");

    // editBtn.forEach(btn => {
    //     btn.addEventListener("click", async (event) => {
    //         event.preventDefault();
    //         event.stopPropagation();

    //         const form = document.getElementById(`form-${btn.parentElement.id}`)
    //         form.setAttribute('class', 'displayed')
    //     })
    // })

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