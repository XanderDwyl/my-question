const nextQuestion = (s) => {
  // const currQ = questions[selectedQ];
  selectedQ = Number(s.target.value - 1);

  for (let i = 1; i <= questions.length; i++) {
    const stepRem = document.getElementById(`step-${i}`);
    stepRem.classList.remove('active');
    
    const contentRem = document.getElementById(`Q${i}`);
    contentRem.classList.remove('active');
    
    if (Number(s.target.value) === i) {
      stepRem.classList.add('active');
      contentRem.classList.add('active');
    }
  }
};

// add listener for every action field
questions.forEach((d, i) => {
  document.getElementById(`action-${i + 1}`).addEventListener("click", nextQuestion)
});
