document.addEventListener('DOMContentLoaded', function () {
  const startListeningBtn = document.getElementById('start-listening-btn');
  if (startListeningBtn) {
    startListeningBtn.addEventListener('click', function () {
      document.querySelector('#featured-section').scrollIntoView({
        behavior: 'smooth'
      });
    });
  }

  const explorePremiumBtn = document.getElementById('explore-premium-btn');
  if (explorePremiumBtn) {
    explorePremiumBtn.addEventListener('click', function () {
      showPremiumModal();
    });
  }

  const viewAllLinks = document.querySelectorAll('[data-view-all]');
  viewAllLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetSection = this.getAttribute('data-view-all');
      document.querySelector(targetSection).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  const playButtons = document.querySelectorAll('.play-song-btn, .new-release-play');
  let currentSongId = null;

  playButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      const songId = this.getAttribute('data-song-id');
      playSong(songId, this);
    });
  });

  const moodButtons = document.querySelectorAll('.mood-btn');
  moodButtons.forEach(button => {
    button.addEventListener('click', function () {
      const mood = this.getAttribute('data-mood');
      moodButtons.forEach(btn => btn.classList.remove('active-mood'));
      this.classList.add('active-mood');
    });
  });

  const getMoodPlaylistBtn = document.getElementById('get-mood-playlist-btn');
  if (getMoodPlaylistBtn) {
    getMoodPlaylistBtn.addEventListener('click', function () {
      const activeMood = document.querySelector('.mood-btn.active-mood');
      if (activeMood) {
        const mood = activeMood.getAttribute('data-mood');
        generateMoodPlaylist(mood);
      } else {
        showToast('Please select a mood first');
      }
    });
  }

  initAudioPlayer();

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileMenu.classList.toggle('hidden');
    });
  }

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
      } else {
        backToTopBtn.classList.remove('opacity-100', 'visible');
        backToTopBtn.classList.add('opacity-0', 'invisible');
      }
    });

    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  function initAudioPlayer() {
    if (!document.getElementById('global-audio-player')) {
      const audioPlayer = document.createElement('audio');
      audioPlayer.id = 'global-audio-player';
      audioPlayer.style.display = 'none';
      document.body.appendChild(audioPlayer);
    }
  }

  function playSong(songId, button = null) {
    const audioPlayer = document.getElementById('global-audio-player');

    // Pause if same song is playing
    if (currentSongId === songId && !audioPlayer.paused) {
      audioPlayer.pause();
      if (button) updateButtonToPlay(button);
      showToast('Playback paused');
      return;
    }

    // Resume if same song is paused
    if (currentSongId === songId && audioPlayer.paused) {
      audioPlayer.play();
      if (button) updateButtonToPause(button);
      showToast(`Now playing: ${getSongNameById(songId)}`);
      return;
    }

    // Play new song
    const songUrl = getSongUrlById(songId);
    audioPlayer.src = songUrl;
    audioPlayer.play()
      .then(() => {
        currentSongId = songId;
        if (button) updateButtonToPause(button);
        showToast(`Now playing: ${getSongNameById(songId)}`);
      })
      .catch(error => {
        console.error('Error playing song:', error);
        showToast('Error playing song. Please try again.');
      });
  }

  function updateButtonToPlay(button) {
    document.querySelectorAll('.play-song-btn').forEach(btn => {
      btn.innerHTML = 'Play Now';
      btn.classList.remove('playing');
    });
    button.innerHTML = 'Play Now';
    button.classList.remove('playing');
  }

  function updateButtonToPause(button) {
    document.querySelectorAll('.play-song-btn').forEach(btn => {
      btn.innerHTML = 'Play Now';
      btn.classList.remove('playing');
    });
    button.innerHTML = '<i class="fas fa-pause mr-2"></i> Playing';
    button.classList.add('playing');
  }

  function getSongUrlById(songId) {
    const demoUrls = {
      'song1': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      'song2': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      'song3': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      'song4': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
      'song5': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
      'song6': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
      'song7': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      'song8': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
      'song9': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3'
    };
    return demoUrls[songId] || demoUrls.song1;
  }

  function getSongNameById(songId) {
    const songNames = {
      'song1': "Today's Top Hit",
      'song2': "Chill Vibes",
      'song3': "Workout Energy",
      'song4': "Focus Flow",
      'song5': "Midnight Memories",
      'song6': "Electric Dreams",
      'song7': "Summer Vibes",
      'song8': "Dark Paradise",
      'song9': "Neon Lights"
    };
    return songNames[songId] || 'Unknown Song';
  }

  function generateMoodPlaylist(mood) {
    const moodSongs = {
      'happy': 'song1',
      'sad': 'song2',
      'romantic': 'song3',
      'energetic': 'song5',
      'relaxed': 'song4'
    };

    const songId = moodSongs[mood] || 'song1';
    playSong(songId);
    showToast(`Generated ${mood} playlist! Playing sample track.`);
  }

  function showPremiumModal() {
    if (!document.getElementById('premium-modal')) {
      const modalHTML = `
        <div id="premium-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 hidden">
          <div class="glass p-8 rounded-xl max-w-md w-full">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-2xl font-bold gradient-text">Go Premium</h3>
              <button id="close-premium-modal" class="text-gray-400 hover:text-white">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <i class="fas fa-check-circle text-green-400 text-xl"></i>
                <p>Ad-free listening</p>
              </div>
              <div class="flex items-center space-x-4">
                <i class="fas fa-check-circle text-green-400 text-xl"></i>
                <p>Offline playback</p>
              </div>
              <div class="flex items-center space-x-4">
                <i class="fas fa-check-circle text-green-400 text-xl"></i>
                <p>High quality audio</p>
              </div>
            </div>
            <button class="w-full bg-gradient-to-r from-pink-500 to-cyan-400 text-white py-3 rounded-full mt-8 hover:opacity-90">
              Try Premium Free for 30 Days
            </button>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', modalHTML);
      document.getElementById('close-premium-modal').addEventListener('click', function () {
        document.getElementById('premium-modal').classList.add('hidden');
      });
    }
    document.getElementById('premium-modal').classList.remove('hidden');
  }

  function showToast(message) {
    if (!document.getElementById('toast-notification')) {
      const toastHTML = `
        <div id="toast-notification" class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg opacity-0 transition-opacity duration-300 flex items-center">
          <span id="toast-message"></span>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', toastHTML);
    }

    const toast = document.getElementById('toast-notification');
    const toastMessage = document.getElementById('toast-message');
    toastMessage.textContent = message;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');

    setTimeout(() => {
      toast.classList.remove('opacity-100');
      toast.classList.add('opacity-0');
    }, 3000);
  }
});
