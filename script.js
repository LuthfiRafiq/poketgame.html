

// Ambil elemen input dan tombol
const usernameInput = document.querySelector('.login input');
const playButton = document.querySelector('.button');

// Saat tombol Play ditekan
playButton.addEventListener('click', async () => {
  const username = usernameInput.value.trim();

  if (username === '') {
    alert('Masukkan username dulu!');
    return;
  }

  // Simpan username di localStorage (untuk halaman game)
  localStorage.setItem('username', username);

  // 🔹 Kirim username ke server (simpan_username.php)
  try {
    const response = await fetch('simpan_username.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(username)}`
    });

    const result = await response.text();
    console.log('Server response:', result);
  } catch (error) {
    console.error('Gagal mengirim data ke server:', error);
  }

  // 🔹 Tampilkan loading dan sembunyikan form login
  document.querySelector('.login-opsi').style.display = 'none';
  const mainGame = document.querySelector('.main-game');
  mainGame.style.display = 'block';
  mainGame.innerHTML = `
    <h2>Selamat datang, ${username}!</h2>
    <p>Game sedang dimuat...</p>
  `;

  // 🔹 Setelah 2 detik, arahkan ke halaman game
  setTimeout(() => {
    window.location.href = 'Game.html';
  }, 2000);
});
