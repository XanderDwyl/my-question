const endExam = () => {
  Object.keys(questions).reduce((n, c) => {
    questions[c].selected = false
    return {...n, [c]: { ...questions[c] } }
  }, {});

  score = questions.filter(i => i.key === i.answer)
  localStorage.setItem("score", score.length);

  if (score.length > 5) {
    window.location.href="congrats.html"
  } else {
    window.location.href="play_again.html"
  }
}

const updateQuestion = (curr) => {
  // update next question
  Object.keys(questions).reduce((n, c) => {
    questions[c].selected = selectedQ === Number(c)
    if (selectedQ === Number(c)) {
      questions[c] = { ...curr }
    }
    return {...n, [c]: { ...questions[c] } }
  }, {});
}


const selectAnswer = (s, e) => {
  const currQ = questions[selectedQ];
  currQ.answer = s.target.value
  updateQuestion(currQ)
  const nextQ = selectedQ + 2;
  if ((selectedQ + 1) < questions.length) {
    const nextAction = document.getElementById(`action-${nextQ}`)
    const nextStep = document.getElementById(`step-${nextQ}`)
    nextAction.removeAttribute('disabled')
    nextStep.classList.remove('disabled')
  }
  
  const currAction = document.getElementById(`action-${selectedQ + 1}`)
  currAction.setAttribute('disabled', true);

  if(selectedQ + 1 === 1) {
    const currStep = document.getElementById(`step-${selectedQ + 1}`)
    currStep.classList.remove('disabled')
  }

  
  // update steps status
  questions.forEach((q, x) => {
    const updateStep = document.getElementById(`step-${x + 1}`);
    updateStep.classList.remove('success');
    updateStep.classList.remove('warning');

    let korek = q.key === q.answer;
    if (korek) {
      korek = 'success';
    } else {
      korek = 'warning';
    }
    
    if (q.answer !== '') {
      updateStep.classList.add(korek);
    }
  });

  if (selectedQ >= questions.length - 1) {
    endExam()
  }
};
