const container = document.querySelector(".container"),
  mainVideo = container.querySelector("video"),
  progressBar = container.querySelector(".progress-bar"),
  playPauseBtn = container.querySelector(".play-pause i");

mainVideo.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target; //Getting current time and duration
  let percent = (currentTime / duration) * 100;
  progressBar.style.width = `${percent}%`;
});

playPauseBtn.addEventListener("click", () => {
  //if video is paused, play video else pause
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});

mainVideo.addEventListener("play", () => {
  playPauseBtn.classList.replace("fa-play", "fa-pause"); //if video is playing change icon to pause
});
mainVideo.addEventListener("pause", () => {
  playPauseBtn.classList.replace("fa-pause", "fa-play"); //if video is paused change icon to play
});
