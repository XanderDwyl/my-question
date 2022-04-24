window.onload = () => {
  localStorage.removeItem('score');
}

const populateQuestions = (q, i) => {
  let tabKlas = `tab`;
  if (i === 1) {
    tabKlas = `active ${tabKlas}`;
  }

  const genQuestions = document.getElementById('questions');
  const tabElem = document.createElement('div');
  const hElem = document.createElement('h1');
  hElem.textContent = `Question #${i}`;
  tabElem.setAttribute('id', `Q${i}`);
  tabElem.setAttribute('class', tabKlas);
  tabElem.appendChild(hElem)
  const pElem = document.createElement('p');
  pElem.textContent = q.question;
  tabElem.appendChild(pElem)
  
  genQuestions.prepend(tabElem)

  const formElem = document.createElement('div');
  formElem.setAttribute('id', `answers-${i}`);
  tabElem.appendChild(formElem)

  Object.keys(q.choices).forEach((choice, x) => {
    const ansDivElem = document.createElement('div');
    ansDivElem.setAttribute('class', 'answer-field');
    const inputElem = document.createElement('input');
    inputElem.setAttribute('id', `answer-Q${i}-${x + 1}`);
    inputElem.setAttribute('type', 'radio');
    inputElem.setAttribute('name', `answer-Q${i}`);
    inputElem.setAttribute('value', choice);
    inputElem.addEventListener("click", selectAnswer)
    
    if (`${choice}` === q.answer) {
      inputElem.setAttribute('checked', true);
    }
    ansDivElem.appendChild(inputElem)
    const labelElem = document.createElement('label');
    labelElem.setAttribute('for', `answer-Q${i}-${x + 1}`);
    labelElem.append(`[${choice}] ${q.choices[choice]}`)
    ansDivElem.appendChild(labelElem)
    formElem.appendChild(ansDivElem)
  });
}

const populateSteps = (q, i) => {
  let korek = q.key === q.answer;
  let isDisabled = false
  if (korek) {
    korek = ' success';
  } else {
    korek = ' warning';
  }

  if (q.answer === '') {
    isDisabled = true
    korek = ' disabled';
  }

  const stepKlas = `${q.selected ? 'active ' : ''}step${korek}`;
  const genInner = document.getElementById('step-group');
  const stepElem = document.createElement('div');
  stepElem.setAttribute('id', `step-${i}`);
  stepElem.setAttribute('class', stepKlas);
  const lElem = document.createElement('label');
  lElem.setAttribute('for', `action-${i}`);
  stepElem.appendChild(lElem)
  genInner.appendChild(stepElem)
  
  const actionInner = document.getElementById('action-group');
  const actionElem = document.createElement('input');
  actionElem.setAttribute('id', `action-${i}`);
  actionElem.setAttribute('name', `step`);
  actionElem.setAttribute('type', `radio`);
  actionElem.setAttribute('disabled', isDisabled);
  actionElem.setAttribute('value', i);
  actionInner.appendChild(actionElem)
}

questions.forEach((d, x) => {
  populateSteps(d, x + 1);
  populateQuestions(d, x + 1);
});
