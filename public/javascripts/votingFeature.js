

const upVoteBtns = document.querySelectorAll('.fa-arrow-up');
upVoteBtns.forEach(upVoteBtn => {
  upVoteBtn.addEventListener('click', async (event) => {

    const answerId = event.target.id.split('-')[2];
    const questionId = event.target.id.split('-')[1];

    const totalEl = document.getElementById( `totalVotes-${answerId}`);
    const resultVoteEl = document.getElementById(`vote-${answerId}`);
    const currUpBtn = document.getElementById(`${event.target.id}`);
    const currDownBtn = document.getElementById(`downvote-${questionId}-${answerId}`)
    //Check if the vote already exists
    const resCheck = await fetch(`/answers/${answerId}/votes`);
    const {userVote} = await resCheck.json();


    if (userVote !== null) {
      const voteId = userVote.id;
      if(userVote.upvote == true ){
        const resDelete = await fetch(`/answer/${answerId}/vote/${voteId}`, {
          method: "DELETE"
        })
        currUpBtn.style.color = "black";
        resultVoteEl.innerHTML = parseInt(resultVoteEl.innerHTML)-1;
        totalEl.innerHTML = parseInt(totalEl.innerHTML)-1;

      } else{
        const resEdit = await fetch(`/answer/${answerId}/vote/${voteId}`, {
          method: "PUT",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            upvote: true
          })
        })
        currUpBtn.style.color = "green";
        currDownBtn.style.color = "black"
        resultVoteEl.innerHTML = parseInt(resultVoteEl.innerHTML)+2;
      }

    } else {
      const resVote = await fetch(`/answer/${answerId}/vote`,
        {
          method: "POST",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            upvote: true
          })
        })
      const data = await resVote.json();
      if(data.message){
        resultVoteEl.innerHTML = parseInt(resultVoteEl.innerHTML)+1;
        currUpBtn.style.color = "green";
        totalEl.innerHTML = parseInt(totalEl.innerHTML)+1;

      }
    }

  })
})


const downVoteBtns = document.querySelectorAll('.fa-arrow-down');
downVoteBtns.forEach(downVoteBtn => {
  downVoteBtn.addEventListener('click', async (event) => {

    const answerId = event.target.id.split('-')[2];
    const questionId = event.target.id.split('-')[1];

    const totalEl = document.getElementById( `totalVotes-${answerId}`);
    const resultVoteEl = document.getElementById(`vote-${answerId}`);
    const currDownBtn = document.getElementById(`${event.target.id}`);
    const currUpBtn = document.getElementById(`upvote-${questionId}-${answerId}`)
    //Check if the vote already exists
    const resCheck = await fetch(`/answers/${answerId}/votes`);
    const {userVote} = await resCheck.json();

    console.log(userVote)
    if (userVote !== null) {
      const voteId = userVote.id;
      if(userVote.upvote == false){

        const resDelete = await fetch(`/answer/${answerId}/vote/${voteId}`, {
          method: "DELETE"
        })
        totalEl.innerHTML = parseInt(totalEl.innerHTML)-1;
        resultVoteEl.innerHTML = parseInt(resultVoteEl.innerHTML)+1;
        currDownBtn.style.color = "black";
      } else {
          const resUpdate = await fetch(`/answer/${answerId}/vote/${voteId}`, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              upvote: false
            })
          })
          currDownBtn.style.color = "red";
          currUpBtn.style.color = "black"
          resultVoteEl.innerHTML = parseInt(resultVoteEl.innerHTML)-2;

      }
    } else {
      const resVote = await fetch(`/answer/${answerId}/vote`,
        {
          method: "POST",
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({
            upvote: false
          })
        })
      const data = await resVote.json();
      if(data.message){
        totalEl.innerHTML = parseInt(totalEl.innerHTML)+1;
        resultVoteEl.innerHTML = parseInt(resultVoteEl.innerHTML)-1;
        currDownBtn.style.color = "red";
      }
    }

  })
})
