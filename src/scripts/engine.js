const state = {
    view: {
       squares: document.querySelectorAll(".square"),
       enemy: document.querySelector(".enemy"), 
       timeLeft: document.querySelector("#time-left"),
       score: document.querySelector("#score"), 
       lives: document.querySelector("#lives")
    },
    velues: {
       gameVelocity: 1000,
       hitPosition: 0,
       result: 0,
       currentTime: 60,
       currentLives: 3 
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimeId: setInterval(countDown, 1000),
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.velues.currentTime--;
    state.view.timeLeft.textContent = state.velues.currentTime;

    if (state.velues.currentTime <= 0 || state.velues.currentLives <= 0) {
        alert("Game Over! O seu resultado foi: " + state.velues.result);
        let rst = confirm("Deseja jogar novamente");
        
        if (rst) {
           resetGame();
        } else {
          gameOver();
        }


    }
}

function randomSquare(){
    state.view.squares.forEach( (square) => {
       square.classList.remove("enemy"); 
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy")
    state.velues.hitPosition = randomSquare.id
}

function gameOver() {
   clearInterval(state.actions.countDownTimeId);
   clearInterval(state.actions.timerId);
   state.velues.currentTime = 0;
   state.view.timeLeft.textContent = state.velues.currentTime;
   state.velues.result = 0
   state.view.score.textContent = state.velues.result;
   window.location.href = "about.html"
}

function resetGame(){
    state.velues.currentTime = 60;
    state.velues.result = 0
    state.view.score.textContent = state.velues.result;
    state.view.timeLeft.textContent = state.velues.currentTime;
    state.velues.currentLives = 3;
    state.view.lives.textContent = state.velues.currentLives;
}

function addListenerHitBox() {
   state.view.squares.forEach( (square) => {
      square.addEventListener("mousedown", () => {
         if(square.id === state.velues.hitPosition) {
            state.velues.result ++;
            state.view.score.textContent = state.velues.result;
            state.velues.hitPosition = null;
            playSound();
         } else {
            state.velues.currentLives --;
            state.view.lives.textContent = state.velues.currentLives;

         }
      });
   })
}

function initialize(){
  addListenerHitBox();
}

initialize();