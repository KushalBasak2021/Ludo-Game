'use strict';

const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");


let scores = [0, 0];
let currentscore = 0;
let activePlayer = 0;
let playing = true;

function init() {
    diceEl.classList.add("hidden");

    scores = [0, 0];
    currentscore = 0;
    activePlayer = 0;
    playing = true;

    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    document.getElementById("score--0").textContent = 0;
    document.getElementById("score--1").textContent = 0;
    document.getElementById("current--0").textContent = 0;
    document.getElementById("current--1").textContent = 0;
}
init();

function switchPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentscore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}


btnRoll.addEventListener("click", function () {
    if (playing) {
        let diceNumber = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove("hidden");
        diceEl.src = `dice-${diceNumber}.png`;

        if (diceNumber !== 1) {
            currentscore += diceNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentscore;
        } else {
            switchPlayer();
        }
    }
})

btnHold.addEventListener("click", function () {
    if (playing) {
        scores[activePlayer] += currentscore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
        if (scores[activePlayer] >= 100) {
            playing = false;
            diceEl.classList.add("hidden");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        } else {
            switchPlayer();
        }
    }
})

btnNew.addEventListener("click", init)