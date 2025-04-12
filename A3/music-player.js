// Music Player JavaScript
const songs = [
    { name: "Alone - Edward", file: "songs/Alone.mp3" },
    { name: "Color_Hot - Robert Mark", file: "songs/Color_Hot.mp3" },
    { name: "Host - Adele", file: "songs/Host.mp3" },
    { name: "On The Rocks - Hellwen", file: "songs/On The Rocks.mp3" },
    { name: "Sake Bomb - Ed Sheeran", file: "songs/Sake_Bomb.mp3" },
    { name: "Alpha - sizzle", file: "songs/asphalt-sizzle-322468.mp3" },
    { name: "Bitter Sweet - Sizzle", file: "songs/breath-of-life_10-minutes-320859.mp3" },
    { name: "Cold - Sizzle", file: "songs/calm-waves-soft-piano-314968.mp3" },
    { name: "Dawn - Sizzle", file: "songs/emotional-depth-323009.mp3" },
    { name: "Fallen - Sizzle", file: "songs/gardens-stylish-chill-303261.mp3" },
    { name: "Lost - Sizzle", file: "songs/go-beyond-314301.mp3" },
    { name: "Nightfall - Sizzle", file: "songs/indigo-lo-fi-hip-hop_short-320823.mp3" },
    { name: "Sorrow - Sizzle", file: "songs/kugelsicher-by-tremoxbeatz-302838.mp3" },
    { name: "The End - Sizzle", file: "A3/songs/midnight-whispers-lo-fi-background-music-for-video-short-version-321904.mp3" },
    { name: "The Last - Sizzle", file: "songs/next-level_medium-2-322999.mp3" },
    { name: "The Road - Sizzle", file: "songs/next-level_medium-3-323001.mp3" },
    { name: "The Way - Sizzle", file: "songs/path-to-harmony-313385.mp3" },
    { name: "Time - Sizzle", file: "songs/spring-energy-320531.mp3" },
    { name: "Waves - Sizzle", file: "songs/zen-garden-310599.mp3" },
  ];
  
  let currentIndex = 0;
  
  const audio = document.getElementById("audio");
  const songList = document.getElementById("songList");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  
  // Render song list
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.name;
    li.className = "bg-[#1f1f1f] px-6 py-4 rounded-lg cursor-pointer hover:bg-[#333] transition-all";
    li.addEventListener("click", () => {
      playSong(index);
    });
    songList.appendChild(li);
  });
  
  // Play selected song
  function playSong(index) {
    currentIndex = index;
    audio.src = songs[currentIndex].file;
    audio.play();
    highlightCurrent();
  }
  
  // Highlight current playing song
  function highlightCurrent() {
    const items = songList.querySelectorAll("li");
    items.forEach((item, i) => {
      item.classList.toggle("active-song", i === currentIndex);
    });
  }
  
  // Autoplay next
  audio.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
  });
  
  // Prev/Next buttons
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    playSong(currentIndex);
  });
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    playSong(currentIndex);
  });
  
  // Play first song on load
  window.addEventListener("DOMContentLoaded", () => {
    playSong(currentIndex);
  });
  