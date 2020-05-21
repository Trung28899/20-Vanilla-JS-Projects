const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Array contains the songs title
const songs = [
  "Hãy Trao Cho Anh - Sơn Tùng MTP",
  "Tình Đắng Như Ly Càfe - nân x ngơ",
  "Please Me - Cardi B & Bruno Mars",
  "Bad Liar - Imagine Dragons",
];

// Index to Keep track of songs
let songIndex = 0;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// play song operation:
function playSong() {
  musicContainer.classList.add("play");
  // change to pause button
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  // Audio tag in html5 has this method to play the music
  // internal html5 API
  // See this link down below and search for 'Events' section
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
  audio.play();
}

// pause song operation:
function pauseSong() {
  musicContainer.classList.remove("play");
  // change to play button
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  audio.pause();
}

// Previous song operation:
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song operation:
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update Progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  // duration is the whole length of the song currentTime is the current progress
  // console.log(duration, currentTime);
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.JPG`;
}

// Set progress bar
function setProgress(e) {
  // getting the full width of the progress bar
  const width = progressContainer.clientWidth;
  // console.log(width);
  // Get the click progress value of the event
  const clickX = e.offsetX;
  // getting the complete duration of the song
  const duration = audio.duration;

  // Setting the current time of the audio to the correct value
  audio.currentTime = (clickX / width) * duration;
}

// Event Listeners: to check if the music is playing or not
playBtn.addEventListener("click", () => {
  // checking if the song is play or not for toggle
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change Song:
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

// Time/song update
// See this link down below and search for 'Events' section
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
audio.addEventListener("timeupdate", updateProgress);

// Click on Progress Bar:
progressContainer.addEventListener("click", setProgress);

// Song Ends > move to next song
audio.addEventListener("ended", nextSong);
