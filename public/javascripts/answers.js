window.addEventListener("DOMContentLoaded", () => {


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
