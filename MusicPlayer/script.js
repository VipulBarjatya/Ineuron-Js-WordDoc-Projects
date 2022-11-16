const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

// Music
const songs = [
  {
    name: "NCS-1",
    displayName: "On & On",
    artist: "Cartoon, Daniel Levi",
  },
  {
    name: "NCS-2",
    displayName: "Why We Lose",
    artist: "Cartoon, Coleman Trapp",
  },
  {
    name: "NCS-3",
    displayName: "Heroes Tonight",
    artist: "Janji, Johnning",
  },
  {
    name: "NCS-4",
    displayName: "Vision pt.II",
    artist: "She Is Jules, Lost Sky",
  },
  {
    name: "NCS-5",
    displayName: "Where We Started",
    artist: "Lost Sky, Jexrtoon",
  },
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "pause");
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "play");
  music.pause();
}

// Play or pause
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

// update
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Prev Song
function prevSong() {
  songIndex < 0 ? (songIndex = songs.length - 1) : songIndex--;
  loadSong(songs[songIndex]);
  playSong();
}

// Next Song
function nextSong() {
  songIndex > songs.length - 1 ? (songIndex = 0) : songIndex++;
  loadSong(songs[songIndex]);
  playSong();
}

// On Load - Selecting first Song
loadSong(songs[songIndex]);

// update Progress Bar & Time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // calculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    // console.log("Minutes :", durationMinutes);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    // console.log("Seconds :", durationSeconds);

    // calculate currentProgress
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    console.log(currentMinutes, currentSeconds);

    // Delay switching duration Element to avoid Nan
    if (durationSeconds)
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// setProgress Bar
function setProgressBar(e) {
  // total width of bar
  const width = this.clientWidth;
  // current position at bar
  const click = e.offsetX;
  const { duration } = music;
  music.currentTime = (click / width) * duration;
}

// Even Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
music.addEventListener("ended", nextSong);
