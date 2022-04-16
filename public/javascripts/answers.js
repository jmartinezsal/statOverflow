window.addEventListener("DOMContentLoaded", () => {
  const addAnswer = document.querySelector(".answerBtn");
  const deleteButton = document.querySelector(".deleteBtn");
  const answerForm = document.getElementById(`answerForm`);

  addAnswer.addEventListener("click", (e) => {
    let id = e.target.id;

    const userImg = document.getElementById(`userImg`);

    answerForm.classList.toggle("hidden");
    userImg.classList.toggle("hidden");

    const addBtn = document.querySelector(".addBtn");
    const answerContainer = document.querySelector(".answerContainer");
    const cancelBtn = document.getElementById(`cancelBtn`);

    cancelBtn.addEventListener("click", (e) => {
      userImg.classList.add("hidden");
      answerForm.classList.add("hidden");
    });

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

        answerContainer.appendChild(newDiv);
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
      const editText = document.getElementById(`answer-${answerId}`);
      const answerText = document.getElementById(`answer-text-${answerId}`);

      cancel = document.getElementById(`cancel-${answerId}`);
      answerText.classList.add("hidden");
      editForm.classList.toggle("hidden");
      editBtn.classList.add("hidden");
      deleteButton.classList.add("hidden");
      editText.innerText = answerText.textContent;

      cancel.addEventListener("click", (e) => {
        deleteButton.classList.remove("hidden");
        editForm.classList.add("hidden");
        editBtn.classList.remove("hidden");
      });

      const submitBtn = document.getElementById(`submit-${answerId}`);

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
          answerText.classList.remove("hidden")
          editBtn.classList.remove("hidden");
          deleteButton.classList.remove("hidden");
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
