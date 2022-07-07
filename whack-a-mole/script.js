const moles = document.querySelectorAll(".mole");
const holes = document.querySelectorAll(".image");
const scoreBoard = document.querySelector(".score");
const button = document.querySelector("button");
let lastHole;
let timeup = false;
let score = 0;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  console.log(hole);
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(1000, 2000);
  const hole = randomHole(holes);
  hole.classList.add("up");

  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeup) {
      peep();
    }
  }, time);
}

function startGame() {
  timeup = false;
  score = 0;
  scoreBoard.textContent = 0;
  peep();
  setTimeout(() => {
    timeup = true;
    alert(`Game Over!! Your Score is ${score}`);
  }, 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  score++;
  this.parentNode.classList.remove("up");
  scoreBoard.textContent = score;
}

moles.forEach((mole) => mole.addEventListener("click", bonk));
button.addEventListener("click", startGame);
