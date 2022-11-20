const container = document.querySelector(".container"),
  mainVideo = container.querySelector("video"),
  progressBar = container.querySelector(".progress-bar"),
  videoTimeline = container.querySelector(".video-timeline"),
  volumeBtn = container.querySelector(".volume i"),
  volumeSlider = container.querySelector(".left input"),
  currentVidTime = container.querySelector(".current-time"),
  videoDuration = container.querySelector(".video-duration"),
  speedBtn = container.querySelector(".playback-speed span"),
  speedOptions = container.querySelector(".speed-options"),
  picInPicBtn = container.querySelector(".pic-in-pic span"),
  fullscreenBtn = container.querySelector(".fullscreen i"),
  playPauseBtn = container.querySelector(".play-pause i"),
  skipBackward = container.querySelector(".skip-backward i"),
  skipForward = container.querySelector(".skip-forward i");

const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

mainVideo.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target; //Getting current time and duration
  let percent = (currentTime / duration) * 100; //Getting percent
  progressBar.style.width = `${percent}%`; //Populating width with percent
  currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", (e) => {
  videoDuration.innerText = formatTime(e.target.duration);
});

videoTimeline.addEventListener("click", (e) => {
  let timelineWidth = e.target.clientWidth;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

volumeBtn.addEventListener("click", () => {
  if (!volumeBtn.classList.contains("fa-volume-high")) {
    mainVideo.volume = 1;
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  } else {
    mainVideo.volume = 0.0;
    volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  }

  volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", (e) => {
  mainVideo.volume = e.target.value;
  if (mainVideo.volume === 0) {
    volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  } else {
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  }
});

skipBackward.addEventListener("click", () => {
  mainVideo.currentTime -= 5; //skips 5 secs backwards
});

skipForward.addEventListener("click", () => {
  mainVideo.currentTime += 5; //skips 5 secs forward
});

speedBtn.addEventListener("click", () => {
  speedOptions.classList.toggle("show");
});

speedOptions.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", () => {
    mainVideo.playbackRate = option.dataset.speed;
    speedOptions.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});

document.addEventListener("click", (e) => {
  if (
    e.target.tagName !== "SPAN" ||
    e.target.className !== "material-symbols-rounded"
  ) {
    speedOptions.classList.remove("show");
  }
});

picInPicBtn.addEventListener("click", () => {
  mainVideo.requestPictureInPicture();
});

fullscreenBtn.addEventListener("click", () => {
  container.classList.toggle("fullscreen");
  if (document.fullscreenElement) {
    fullscreenBtn.classList.replace("fa-compress", "fa-expand");
    return document.exitFullscreen();
  }
  fullscreenBtn.classList.replace("fa-expand", "fa-compress");
  container.requestFullscreen();
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
