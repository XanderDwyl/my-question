window.onload = function() {
  if (!localStorage.getItem('score')) {
    window.location.href="question.html"
  }
  
  score = localStorage.getItem('score');
  const congrats = document.getElementById("congrats")
  if (score > 5 && congrats) {
    congrats.innerHTML = `Well done! Your score is ${score}/${questions.length}.`
  } else {
    const messages = document.getElementById("messages")
    if (score <= 5 && messages) {
      messages.innerHTML = `Your score is ${score}/${questions.length}. Play again to get better score!`
    } else {
      window.location.href="question.html"
    }
  }
}
