let audio = new Audio();

let songs = [
    {
        title: "Song Name 1",
        artist: "Artist Name",
        genre: "Pop",
        file: "music/song1.mp3",
        image: "images/song1.jpeg"
    },

    {
        title: "Song Name 2",
        artist: "Artist Name",
        genre: "Rock",
        file: "music/song2.mp3",
        image: "images/song2.jpeg"
    },

    {
        title: "Song Name 3",
        artist: "Artist Name",
        genre: "Jazz",
        file: "music/song3.mp3",
        image: "images/song3.jpeg"
    },
{
    title: "Song Name 4",
    artist: "Artist Name",
    genre: "Rock",
    file: "music/song4.mp3",
    image: "images/song4.jpeg"
},

{
    title: "Song Name 5",
    artist: "Artist Name",
    genre: "Rock",
    file: "music/song5.mp3",
    image: "images/song5.jpeg"
},

{
    title: "Song Name 6",
    artist: "Artist Name",
    genre: "Pop",
    file: "music/song6.mp3",
    image: "images/song6.jpeg"
},

{
    title: "Song Name 7",
    artist: "Artist Name",
    genre: "Rock",
    file: "music/song7.mp3",
    image: "images/song7.jpeg"
},

{
    title: "Song Name 8",
    artist: "Artist Name",
    file: "music/song8.mp3",
    image: "images/song8.jpeg"
}
];
let currentSong = 0;


// PLAY SONG
function playSong(index) {

    currentSong = index;
    let recentlyPlayed =
    JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

recentlyPlayed = recentlyPlayed.filter(i => i !== index);

recentlyPlayed.unshift(index);

if (recentlyPlayed.length > 3) {
    recentlyPlayed.pop();
}

localStorage.setItem(
    "recentlyPlayed",
    JSON.stringify(recentlyPlayed)
);

showRecentlyPlayed();

    audio.src = songs[index].file;

    audio.load();

    audio.play();

    updatePlayer();

    document.getElementById("playPauseBtn").innerHTML = "⏸";
}


// UPDATE BOTTOM PLAYER
function updatePlayer() {

    document.getElementById("playerTitle").innerText =
        songs[currentSong].title;

    document.getElementById("playerArtist").innerText =
        songs[currentSong].artist;

    document.getElementById("playerImage").src =
        songs[currentSong].image;
}


// PLAY / PAUSE
function togglePlayPause() {

    if (audio.paused) {

        audio.play();

        document.getElementById("playPauseBtn").innerHTML = "⏸";

    } else {

        audio.pause();

        document.getElementById("playPauseBtn").innerHTML = "▶";
    }
}


// NEXT SONG
function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    playSong(currentSong);
}


// PREVIOUS SONG
function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    playSong(currentSong);
}


// UPDATE PROGRESS BAR
audio.addEventListener("timeupdate", function () {

    if (!isNaN(audio.duration)) {

        let progress =
            (audio.currentTime / audio.duration) * 100;

        document.getElementById("progressBar").value = progress;

        document.getElementById("currentTime").innerText =
            formatTime(audio.currentTime);

        document.getElementById("duration").innerText =
            formatTime(audio.duration);
    }
});


// CLICK PROGRESS BAR
document.getElementById("progressBar").addEventListener("input", function () {

    if (audio.duration) {

        let time =
            (this.value / 100) * audio.duration;

        audio.currentTime = time;
    }
});


// VOLUME
document.getElementById("volumeBar").addEventListener("input", function () {

    audio.volume = this.value;
});
function searchSongs() {

    let searchText = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();

    let songCards = document.querySelectorAll("#popularSongs .song-card");

    let found = false;

    songCards.forEach(function(card) {

        let songName = card
            .querySelector("h3")
            .innerText
            .toLowerCase();

        let artistName = card
            .querySelector("p")
            .innerText
            .toLowerCase();

        if (
            searchText === "" ||
            songName.includes(searchText) ||
            artistName.includes(searchText)
        ) {
            card.style.display = "block";
            found = true;
        } else {
            card.style.display = "none";
        }

    });

    let message = document.getElementById("noResults");

    if (!message) {
        message = document.createElement("p");
        message.id = "noResults";
        message.style.marginTop = "20px";
        message.style.color = "#aaa";
        document.getElementById("popularSongs").appendChild(message);
    }

    if (!found) {
        message.innerText = "🔍 No songs found.";
        message.style.display = "block";
    } else {
        message.style.display = "none";
    }
}
function rateSong(songIndex, rating) {

    localStorage.setItem(
        "rating" + songIndex,
        rating
    );

    showRating(songIndex, rating);
}
function showRating(songIndex, rating) {

    let cards = document.querySelectorAll(".song-card");

    let stars = cards[songIndex].querySelectorAll(".rating span");

    stars.forEach(function(star, index) {

        if (index < rating) {
            star.style.color = "gold";
        } else {
            star.style.color = "#777";
        }

    });
}
window.addEventListener("load", function() {

    for (let i = 0; i < songs.length; i++) {

        let savedRating =
            localStorage.getItem("rating" + i);

        if (savedRating) {
            showRating(i, Number(savedRating));
        }
    }

});
function toggleFavorite(index) {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(index)) {
        favorites = favorites.filter(i => i !== index);
    } else {
        favorites.push(index);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));

    updateFavorites();
}


function updateFavorites() {

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    let buttons = document.querySelectorAll(".favorite-btn");

    buttons.forEach(function(button, index) {

        if (favorites.includes(index)) {
            button.innerHTML = "♥";
            button.style.color = "red";
        } else {
            button.innerHTML = "♡";
            button.style.color = "#aaa";
        }

    });
}

if (document.readyState === "loading") {

    document.addEventListener("DOMContentLoaded", updateFavorites);

} else {

    updateFavorites();

}
function hideAllSections() {

    document.getElementById("popularSongs").style.display = "none";

    document.getElementById("albumsSection").style.display = "none";

    document.getElementById("artistsSection").style.display = "none";

    document.getElementById("recentlyPlayedSection").style.display = "none";

    document.getElementById("playlistSection").style.display = "none";

    document.getElementById("favoritesSection").style.display = "none";
    document.getElementById("authSection").style.display = "none";
    document.getElementById("profileSection").style.display = "none";
    document.getElementById("adminLoginSection").style.display = "none";
    document.getElementById("adminDashboard").style.display = "none";       
}
function showFavoriteSongs() {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    let popularSongs =
        document.getElementById("popularSongs");

    let favoritesSection =
        document.getElementById("favoritesSection");

    let artistsSection =
    document.getElementById("artistsSection");

    let albumsSection =
        document.getElementById("albumsSection");

    let container =
        document.getElementById("favoriteSongs");


    // Hide Popular Songs
    popularSongs.style.display = "none";

artistsSection.style.display = "none";

favoritesSection.style.display = "block";


    container.innerHTML = "";


    if (favorites.length === 0) {

        container.innerHTML = "<p>No favorite songs yet.</p>";

        return;
    }


    favorites.forEach(function(index) {

        let song = songs[index];

        let card = document.createElement("div");

        card.className = "song-card";

        card.innerHTML = `
            <img src="${song.image}" alt="${song.title}">

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

            <button onclick="playSong(${index})">
                ▶ Play
            </button>
        `;

        container.appendChild(card);
    });
}
 function showHome() {

    hideAllSections();

    document.getElementById("popularSongs").style.display = "block";
    document.getElementById("recentlyPlayedSection").style.display = "block";
    document.getElementById("playlistSection").style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function showSongs() {

    hideAllSections();

    document.getElementById("popularSongs").style.display = "block";

    document.getElementById("popularSongs").scrollIntoView({
        behavior: "smooth"
    });
}


function showAlbums() {

    hideAllSections();

    document.getElementById("albumsSection").style.display = "block";

    document.getElementById("albumsSection").scrollIntoView({
        behavior: "smooth"
    });
}


function showArtists() {

    hideAllSections();

    document.getElementById("artistsSection").style.display = "block";

    document.getElementById("artistsSection").scrollIntoView({
        behavior: "smooth"
    });
}
function openAlbum(albumIndex) {

    let albumSongs = document.getElementById("albumSongs");

    let song = songs[albumIndex];

    albumSongs.innerHTML = `
        <h2>💿 Album ${albumIndex + 1}</h2>

        <div class="album-song-list">

            <div class="album-song-item">

                <img
                    src="${song.image}"
                    alt="${song.title}"
                >

                <div class="album-song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>

                <button onclick="playSong(${albumIndex})">
                    ▶ Play
                </button>

            </div>

        </div>
    `;
}
function openArtist(artistIndex) {

    let artistSongs = document.getElementById("artistSongs");

    let song = songs[artistIndex];

    artistSongs.innerHTML = `
        <h2>🎤 Artist Name ${artistIndex + 1}</h2>

        <div class="album-song-list">

            <div class="album-song-item">

                <img
                    src="${song.image}"
                    alt="${song.title}"
                >

                <div class="album-song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>

                <button onclick="playSong(${artistIndex})">
                    ▶ Play
                </button>

            </div>

        </div>
    `;
}
function showRecentlyPlayed() {

    let recentlyPlayed =
        JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

    let container =
        document.getElementById("recentlyPlayed");

    container.innerHTML = "";

    if (recentlyPlayed.length === 0) {
        container.innerHTML = "<p>No recently played songs.</p>";
        return;
    }

    recentlyPlayed.forEach(function(index) {

        let song = songs[index];

        let card = document.createElement("div");

        card.className = "song-card";

        card.innerHTML = `
            <img src="${song.image}" alt="${song.title}">

            <h3>${song.title}</h3>

            <p>${song.artist}</p>

            <button onclick="playSong(${index})">
                ▶ Play
            </button>
        `;

        container.appendChild(card);
    });
}
window.addEventListener("load", function() {
    showRecentlyPlayed();
});
// UPDATE TIME AND PROGRESS
audio.addEventListener("timeupdate", function () {

    if (Number.isFinite(audio.duration)) {

        let progress =
            (audio.currentTime / audio.duration) * 100;

        document.getElementById("progressBar").value = progress;

        document.getElementById("currentTime").innerText =
            formatTime(audio.currentTime);

        document.getElementById("duration").innerText =
            formatTime(audio.duration);
    }
});


// GET SONG DURATION
audio.addEventListener("loadedmetadata", function () {

    if (Number.isFinite(audio.duration)) {

        document.getElementById("duration").innerText =
            formatTime(audio.duration);
    }
});


// FORMAT TIME
function formatTime(seconds) {

    let minutes = Math.floor(seconds / 60);

    let secs = Math.floor(seconds % 60);

    if (secs < 10) {
        secs = "0" + secs;
    }

    return minutes + ":" + secs;
}
let playlists =
    JSON.parse(localStorage.getItem("playlists")) || [];

function createPlaylist() {

    let name =
        document.getElementById("playlistName").value.trim();

    if (name === "") {
        alert("Please enter a playlist name");
        return;
    }

    playlists.push({
        name: name,
        songs: []
    });

    localStorage.setItem(
        "playlists",
        JSON.stringify(playlists)
    );

    document.getElementById("playlistName").value = "";

    showPlaylists();
}
function showPlaylists() {

    let container =
        document.getElementById("playlistContainer");

    container.innerHTML = "";

    if (playlists.length === 0) {

        container.innerHTML =
            "<p>No playlists created yet.</p>";

        return;
    }

    playlists.forEach(function(playlist, index) {

        let div = document.createElement("div");

        div.className = "playlist-card";

        div.innerHTML = `
            <h3>🎵 ${playlist.name}</h3>

            <p>${playlist.songs.length} songs</p>

            <button onclick="openPlaylist(${index})">
                Open Playlist
            </button>
        `;

        container.appendChild(div);
    });
}
window.addEventListener("load", function() {
    showPlaylists();
    showRecommendations();
});
function addToPlaylist(songIndex) {

    if (playlists.length === 0) {
        alert("Please create a playlist first.");
        return;
    }

    let playlistNumber = prompt(
        "Enter playlist number:\n" +
        playlists.map((p, i) => (i + 1) + ". " + p.name).join("\n")
    );

    let index = Number(playlistNumber) - 1;

    if (index < 0 || index >= playlists.length) {
        alert("Invalid playlist number.");
        return;
    }

    if (playlists[index].songs.includes(songIndex)) {
        alert("Song is already in this playlist.");
        return;
    }

    playlists[index].songs.push(songIndex);

    localStorage.setItem(
        "playlists",
        JSON.stringify(playlists)
    );

    showPlaylists();

    alert("Song added to playlist!");
}
// DOWNLOAD SONG
function downloadSong(index) {

    let song = songs[index];

    let link = document.createElement("a");

    link.href = song.file;
    link.download = song.title + ".mp3";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    alert(song.title + " downloaded successfully!");
}
function openPlaylist(index) {

    let playlist = playlists[index];

    let container = document.getElementById("playlistContainer");

    container.innerHTML = `
        <h2>🎵 ${playlist.name}</h2>
    `;

    if (playlist.songs.length === 0) {
        container.innerHTML += "<p>No songs in this playlist.</p>";
        return;
    }

    playlist.songs.forEach(function(songIndex) {

        let song = songs[songIndex];

        let div = document.createElement("div");

        div.className = "playlist-song";

        div.innerHTML = `
            <img src="${song.image}" width="80">
            <span>
                <strong>${song.title}</strong>
                <br>
                ${song.artist}
            </span>

            <button onclick="playSong(${songIndex})">
    ▶ Play
</button>

<button onclick="removeFromPlaylist(${index}, ${songIndex})">
    ❌ Remove
</button>
        `;

        container.appendChild(div);
    });
}
function removeFromPlaylist(playlistIndex, songIndex) {

    playlists[playlistIndex].songs =
        playlists[playlistIndex].songs.filter(
            function(index) {
                return index !== songIndex;
            }
        );

    localStorage.setItem(
        "playlists",
        JSON.stringify(playlists)
    );

    openPlaylist(playlistIndex);
}
document.getElementById("searchInput").addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        searchSongs();
    }

});
// LOGIN / SIGNUP

let users =
    JSON.parse(localStorage.getItem("users")) || [];

function signupUser() {

    let username =
        document.getElementById("authUsername").value.trim();

    let password =
        document.getElementById("authPassword").value.trim();

    let message =
        document.getElementById("authMessage");

    if (username === "" || password === "") {
        message.innerText = "Please enter username and password.";
        return;
    }

    let existingUser = users.find(
        user => user.username === username
    );

    if (existingUser) {
        message.innerText = "Username already exists.";
        return;
    }

    users.push({
        username: username,
        password: password
    });

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    message.innerText = "Account created successfully!";

    document.getElementById("authUsername").value = "";
    document.getElementById("authPassword").value = "";
}


function loginUser() {

    let username =
        document.getElementById("authUsername").value.trim();

    let password =
        document.getElementById("authPassword").value.trim();

    let message =
        document.getElementById("authMessage");

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(function(user) {

        return user.username === username &&
               user.password === password;

    });

    if (user) {

        localStorage.setItem(
            "loggedInUser",
            username
        );

        message.innerText =
            "Login successful! Welcome " + username;

        updateProfileNav();

    } else {

        message.innerText =
            "Invalid username or password.";
    }
}
// SHOW LOGIN

function showLogin() {

    hideAllSections();

    document.getElementById("authSection").style.display = "block";

    document.getElementById("authTitle").innerText = "🔐 Login";

    document.getElementById("loginButton").style.display = "block";
    document.getElementById("signupButton").style.display = "none";

    document.getElementById("authMessage").innerText = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// SHOW SIGNUP

function showSignup() {

    hideAllSections();

    document.getElementById("authSection").style.display = "block";

    document.getElementById("authTitle").innerText = "📝 Create Account";

    document.getElementById("loginButton").style.display = "none";
    document.getElementById("signupButton").style.display = "block";

    document.getElementById("authMessage").innerText = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
// PROFILE

function showProfile() {

    hideAllSections();

    document.getElementById("profileSection").style.display = "block";

    let loggedInUser =
        localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        document.getElementById("profileUsername").innerText =
            loggedInUser;
    } else {
        document.getElementById("profileUsername").innerText =
            "Guest";
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// LOGOUT

function logoutUser() {

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully!");

    showLogin();
}
// UPDATE PROFILE NAVBAR

function updateProfileNav() {

    let loggedInUser =
        localStorage.getItem("loggedInUser");

    let profileNav =
        document.getElementById("profileNav");

    if (loggedInUser) {
        profileNav.innerText = "👤 " + loggedInUser;
    } else {
        profileNav.innerText = "👤 Profile";
    }
}
window.addEventListener("load", function() {
    updateProfileNav();
});
// ADMIN LOGIN

function showAdminLogin() {

    hideAllSections();

    document.getElementById("adminLoginSection").style.display = "block";

    document.getElementById("adminMessage").innerText = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function adminLogin() {

    let username =
        document.getElementById("adminUsername").value.trim();

    let password =
        document.getElementById("adminPassword").value.trim();

    let message =
        document.getElementById("adminMessage");

    if (username === "admin" && password === "admin123") {

        localStorage.setItem("adminLoggedIn", "true");

        message.innerText =
            "Admin login successful!";

        showAdminDashboard();

    } else {

        message.innerText =
            "Invalid admin username or password.";
    }
}
// ADMIN DASHBOARD

function showAdminDashboard() {


    document.getElementById("adminDashboard").style.display = "block";

    updateAdminCounts();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function updateAdminCounts() {

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    document.getElementById("adminSongCount").innerText =
        songs.length;

    document.getElementById("adminUserCount").innerText =
        users.length;
}


function adminLogout() {

    localStorage.removeItem("adminLoggedIn");

    document.getElementById("adminDashboard").style.display = "none";

    showAdminLogin();
}
function showAdminSongs() {

    let content =
        document.getElementById("adminContent");

    content.innerHTML = `
        <h2>🎵 Manage Songs</h2>
        <div id="adminSongList"></div>
    `;

    let songList =
        document.getElementById("adminSongList");

    songs.forEach(function(song, index) {

        let div = document.createElement("div");

        div.className = "admin-song";

        div.innerHTML = `
            <img src="${song.image}" width="70">

            <div>
                <strong>${song.title}</strong>
                <p>${song.artist}</p>
            </div>

            <button onclick="deleteAdminSong(${index})">
                🗑️ Delete
            </button>
        `;

        songList.appendChild(div);
    });
}
function deleteAdminSong(index) {

    let confirmDelete =
        confirm("Are you sure you want to delete this song?");

    if (!confirmDelete) {
        return;
    }

    songs.splice(index, 1);

    updateAdminCounts();

    showAdminSongs();

    alert("Song deleted successfully!");
}
function showAdminUsers() {

    let content =
        document.getElementById("adminContent");

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    content.innerHTML = `
        <h2>👥 Registered Users</h2>
        <div id="adminUserList"></div>
    `;

    let userList =
        document.getElementById("adminUserList");

    if (users.length === 0) {
        userList.innerHTML =
            "<p>No registered users found.</p>";
        return;
    }

    users.forEach(function(user, index) {

        let div = document.createElement("div");

        div.className = "admin-user";

        div.innerHTML = `
            <span>👤 ${user.username}</span>

            <button onclick="deleteAdminUser(${index})">
                🗑️ Delete
            </button>
        `;

        userList.appendChild(div);
    });
}
function deleteAdminUser(index) {

    let confirmDelete =
        confirm("Are you sure you want to delete this user?");

    if (!confirmDelete) {
        return;
    }

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    users.splice(index, 1);

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

    updateAdminCounts();

    showAdminUsers();

    alert("User deleted successfully!");
}
function showRecommendations() {
    let container = document.getElementById("recommendedSongs");

    container.innerHTML = "";

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    let recent =
        JSON.parse(localStorage.getItem("recentlyPlayed")) || [];

    let sourceIndex = favorites.length > 0
        ? favorites[0]
        : recent.length > 0
        ? recent[0]
        : 0;

    let preferredGenre = songs[sourceIndex].genre;

    songs.forEach(function(song, index) {

        if (song.genre === preferredGenre) {

            let div = document.createElement("div");

            div.className = "song-card";

            div.innerHTML = `
                <img src="${song.image}">
                <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <p>Genre: ${song.genre}</p>

                <button onclick="playSong(${index})">
                    ▶ Play
                </button>
            `;

            container.appendChild(div);
        }
    });
}