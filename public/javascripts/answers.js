window.addEventListener("DOMContentLoaded", () => {
  const addAnswer = document.querySelector(".answerBtn");
  const deleteButton = document.querySelector(".deleteBtn");

  addAnswer.addEventListener("click", (e) => {
    let id = e.target.id;

    const answerForm = document.getElementById(`answerForm`);
    const userImg = document.getElementById(`userImg`);

    answerForm.classList.toggle("hidden");
    userImg.classList.toggle("hidden");

    const addBtn = document.querySelector(".addBtn");
    const answerCont = document.querySelectorAll(`.question-answer-${id}`);

    addBtn.addEventListener("click", async (event) => {
      const answer = document.getElementById(`answer`).value;

      const res = await fetch(`/question/${id}/answer/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answer,
        }),
      });
      const data = await res.json();

      if (data.message === "Success") {
        let newDiv = document.createElement("div");
        let newEditBtn = document.createElement("a");
        let newDeleteBtn = document.createElement("a");

        newEditBtn.classList.add("button", "editBtn");
        newDeleteBtn.classList.add("button", "deleteBtn");
        newEditBtn.innerText = "Edit";
        newDeleteBtn.innerText = "Delete";
        newDiv.innerHTML = `${data.newAnswer.answer} <br>`;
        newDiv.classList.add("answer-success");

        answerCont[0].appendChild(newDiv);
        newDiv.appendChild(newEditBtn);
        newDiv.appendChild(newDeleteBtn);

        answerForm.classList.toggle("hidden");
      }
    });
  });

  const editBtns = document.querySelectorAll(".editBtn");

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      let target = e.target.id;
      const questionId = target.split("-")[0];
      const answerId = target.split("-")[1];

      const editForm = document.getElementById(`edit-form-${answerId}`);
      editForm.classList.toggle("hidden");
      editBtn.classList.add("hidden");
      deleteButton.classList.add('hidden')

      const submitBtn = document.getElementById(`submit-${answerId}`);
      const cancelBtn = document.getElementById(`cancel-${answerId}`);

      cancelBtn.addEventListener("click", (e) => {

        editForm.classList.toggle("hidden");
        editBtn.classList.remove("hidden");
        deleteButton.classList.remove("hidden")
      });

      submitBtn.addEventListener("click", async (submitEvent) => {
        submitEvent.preventDefault();
        const answer = document.getElementById(`answer-${answerId}`).value;

        const res = await fetch(
          `/question/${questionId}/answer/edit/${answerId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              answer,
            }),
          }
        );

        const data = await res.json();

        if (data.message === "Success") {
          const answer = document.querySelector(`.answer-${answerId}`);
          answer.innerHTML = data.answerToUpdate.answer;
          editBtn.classList.remove("hidden");
          deleteButton.classList.remove("hidden")
          editForm.classList.toggle("hidden");
        } else {
          console.log(error.message);
        }
      });
    });
  });

  const deleteBtn = document.querySelectorAll(".deleteBtn");

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async (event) => {

      const currQuestion = btn.parentElement;
      const currAnswer = event.target.parentElement.parentElement;
      
      currAnswer.remove();
      try {
        await fetch(
          `/question/${currQuestion.id}/answer/delete/${currAnswer.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error(error);
      }
    });
  });
});
