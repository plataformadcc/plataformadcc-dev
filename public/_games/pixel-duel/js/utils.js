function rectangularCollision({ rectagle1, rectagle2 }) {
  return (
    rectagle1.attackBox.position.x + rectagle1.attackBox.width >=
      rectagle2.position.x &&
    rectagle1.attackBox.position.x <= rectagle2.width + rectagle2.position.x &&
    rectagle1.attackBox.position.y + rectagle1.attackBox.height >=
      rectagle2.position.y &&
    rectagle1.attackBox.position.y <= rectagle2.position.y + rectagle2.height
  );
}
let timer = 30;
let timeId;

function startTimer(onTick, onEnd) {
  stopTimer();

  timeId = setInterval(() => {
    if (timer <= 0) {
      stopTimer();
      if (typeof onEnd === "function") {
        onEnd();
      }
      return;
    }

    timer -= 1;

    if (typeof onTick === "function") {
      onTick(timer);
    }

    if (timer === 0) {
      stopTimer();
      if (typeof onEnd === "function") {
        onEnd();
      }
    }
  }, 1000);
}

function stopTimer() {
  if (timeId) {
    clearInterval(timeId);
  }
  timeId = undefined;
}

function resetTimer(nextTime = 30) {
  timer = nextTime;
  return timer;
}
