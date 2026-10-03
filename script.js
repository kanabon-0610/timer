const hoursSlider = document.querySelector("#hours-slider");
const minutesSlider = document.querySelector("#minutes-slider");
const secondsSlider = document.querySelector("#seconds-slider");
const slider = document.querySelectorAll(".slider");

const timer = document.querySelector("#timer");

const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const resetBtn = document.querySelector("#reset-btn");

const alarm = document.querySelector("#alarm-sound");

let hours = 0;
let minutes = 0;
let seconds = 0;
let convertSeconds = 0; // 例えば30分を秒に変換し、主にこれを-1ずつ下げていく。-1するごとに秒を何時間何分何秒に変換して表示する。この変数が0になったら音を鳴らす。

let situation = "stop";

let operateTheTimer;

hoursSlider.addEventListener("input", () => {
  hours = Number(hoursSlider.value);
  updateTimer();
});

minutesSlider.addEventListener("input", () => {
  minutes = Number(minutesSlider.value);
  updateTimer();
});

secondsSlider.addEventListener("input", () => {
  seconds = Number(secondsSlider.value);
  updateTimer();
});

function updateTimer() {
  timer.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(Math.floor(seconds)).padStart(2, "0")}`;
}

startBtn.addEventListener("click", () => {
  if (timer.textContent === "00:00:00") {
    alert("時間を設定してください。");
  } else if (situation === "stop") {
    convertSeconds = hours * 3600 + minutes * 60 + seconds;
    startTimer();
  }
});

function startTimer() {
  situation = "running";
  rangeDisabled(true);
  operateTheTimer = setInterval(() => {
    convertSeconds -= 0.1;
    hours = Math.floor(convertSeconds / 3600);
    minutes = Math.floor((convertSeconds % 3600) / 60);
    seconds = (convertSeconds % 3600) % 60;
    operateTheSlider();
    updateTimer();

    if (convertSeconds < 0.01) {
      situation = "stop";
      convertSeconds = 0;
      updateTimer();
      rangeDisabled(false);
      stopTimer();
      resetTimer();
      soundPlay();
    }
  }, 100);
}

function rangeDisabled(boolean) {
  slider.forEach((element) => {
    element.disabled = boolean;
  });
}

stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

function stopTimer() {
  clearInterval(operateTheTimer);
  situation = "stop";
  rangeDisabled(false);
}

function resetTimer() {
  if (situation === "stop") {
    hours = 0;
    minutes = 0;
    seconds = 0;
    operateTheSlider();
    updateTimer();
  }
}

function operateTheSlider() {
  hoursSlider.value = hours;
  minutesSlider.value = minutes;
  secondsSlider.value = Math.floor(seconds);
}

alarm.addEventListener("ended", soundPlay);

function soundPlay() {
  alarm.currentTime = 0;
  alarm.play();
}

document.addEventListener("click", () => {
  alarm.pause();
  alarm.currentTime = 0;
});
