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
  const deleteQ = document.getElementById("deleteQ");
  const editQ = document.getElementById("editQ");
  const editForm = document.getElementById("edit-form");
  const questionText = document.getElementById("questionText")
  const inputText = document.getElementById("inputText")

  deleteQ.addEventListener("click", async (e) => {
    const questionId = window.location.href.split("/")[4];

    try {
      await fetch(`/question/${questionId}/delete/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
    }

    window.location.href = "/";
  });

  editQ.addEventListener("click", async (e) => {
    const questionId = window.location.href.split("/")[4]
    const acceptBtn = document.getElementById("submit")
    const cancelBtn = document.getElementById("cancel")

    removeHidden(editForm);
    addHidden(editQ, deleteQ, addAnswer, questionText)

    cancelBtn.addEventListener('click', () => {
      removeHidden(editQ, deleteQ, addAnswer, questionText);
      addHidden(editForm)
    })

    inputText.innerText = questionText.textContent;

    acceptBtn.addEventListener("click", async (submitEvent) => {
      submitEvent.preventDefault();

      const content = inputText.value

      const res = await fetch(
      `/question/${questionId}/edit`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content
        }),
      }
    );

    const data = await res.json();
      
    if (data.message === "Success") {
      questionText.innerHTML = data.question.content;
      addHidden(editForm);
      removeHidden(editQ, deleteQ, addAnswer, questionText);
    } else {
      console.log(error.message);
    }
  });
});

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

        addHidden(answerForm);

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
})
