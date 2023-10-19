let countdownInterval;
let timeInSeconds = 60; // Set the initial time in seconds

function formatTime(timeInSeconds) {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  countdownElement.textContent = formatTime(timeInSeconds);

  if (timeInSeconds > 0) {
    timeInSeconds--;
  } else {
    clearInterval(countdownInterval);
  }
}
let sound = new Audio("count.mp3");
const start = document.getElementById("startButton");
start.addEventListener("click", function() {
  clearInterval(countdownInterval);
  timeInSeconds = 60; // Set the initial time in seconds
  countdownInterval = setInterval(updateCountdown, 1000);
  sound.play();
});
const reset = document.getElementById("resetButton");
reset.addEventListener("click", function() {
  clearInterval(countdownInterval);
  timeInSeconds = 60; // Set the initial time in seconds
  updateCountdown();
  sound.pause();
});
