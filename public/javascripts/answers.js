const addHidden = (...params) => {
  params.forEach((ele) => {
    return ele.classList.add("hidden");
  });
};

const removeHidden = (...params) => {
  params.forEach((ele) => {
    return ele.classList.remove("hidden");
  });
};

window.addEventListener("DOMContentLoaded", () => {
  const addAnswer = document.querySelector(".answerBtn");
  const deleteButton = document.querySelector(".deleteBtn");
  const answerForm = document.getElementById(`answerForm`);
  const editBtns = document.querySelectorAll(".editBtn");
  const deleteBtn = document.querySelectorAll(".deleteBtn");
  const editForm = document.getElementById("edit-form");
  
  addAnswer.addEventListener("click", (e) => {
    let id = e.target.id;
    const userImg = document.getElementById(`userImg`);
    const acceptBtn = document.querySelector(".addBtn");
    const answerContainer = document.querySelector(".answerContainer");
    const cancelBtn = document.getElementById(`cancelBtn`);

    removeHidden(answerForm, userImg);

    cancelBtn.addEventListener("click", (e) => {
      addHidden(userImg, answerForm);
    });

    acceptBtn.addEventListener("click", async (event) => {
      const answer = document.getElementById(`answer`).value;

      const res = await fetch(`/questions/${id}/answer/add`, {
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

        addHidden(answerForm);
        window.location.href = `/questions/${id}`;
        newDeleteBtn.addEventListener("click", (e) => {
          addHidden(userImg);
          newDiv.remove();
        });
      }
    });
  });

  editBtns.forEach((editBtn) => {
    editBtn.addEventListener("click", (e) => {
      let target = e.target.id;
      const questionId = target.split("-")[0];
      const answerId = target.split("-")[1];
      const editForm = document.getElementById(`edit-form-${answerId}`);
      const editText = document.getElementById(`answer-${answerId}`);
      const answerText = document.getElementById(`answer-text-${answerId}`);

      cancel = document.getElementById(`cancel-${answerId}`);
      addHidden(answerText, editBtn, deleteButton);
      removeHidden(editForm);

      editText.innerText = answerText.textContent;

      cancel.addEventListener("click", (e) => {
        addHidden(editForm);
        removeHidden(deleteButton, editBtn, answerText);
        editText.value = answerText.textContent;
      });

      const acceptBtn = document.getElementById(`submit-${answerId}`);

      acceptBtn.addEventListener("click", async (submitEvent) => {
        submitEvent.preventDefault();
        const answer = document.getElementById(`answer-${answerId}`).value;

        const res = await fetch(
          `/questions/${questionId}/answer/edit/${answerId}`,
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
          addHidden(editForm);
          removeHidden(answerText, editBtn, deleteButton);
        } else {
          console.log(error.message);
        }
      });
    });
  });

  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      const currQuestion = btn.parentElement;
      const currAnswer = event.target.parentElement.parentElement;

      currAnswer.remove();
      try {
        await fetch(
          `/questions/${currQuestion.id}/answer/delete/${currAnswer.id}`,
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
})
