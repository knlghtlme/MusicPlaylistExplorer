const cardContainer = document.querySelector('.card-container');
const modal = document.getElementById('modal');
const modalContent = document.querySelector('.modal-content');
const span = document.getElementsByClassName('close')[0];
const shuffleButton = document.getElementById('shuffleButton');

let currentPlaylistID = null; 

const renderPlaylists = () => {
    const playlists = data.playlists;
    cardContainer.innerHTML = '';
    for (let i = 0; i < playlists.length; i++) {
        const playlist = playlists[i];
        const template = `
            <div class="card" onclick="openModal(${playlist.playlistID})">
                <img src="${playlist.playlist_art}" />
                <h2>${playlist.playlist_name}</h2>
                <h3>${playlist.playlist_creator}</h3>
                <p>
                    <span class="heart" onclick="likePlaylist(event, ${playlist.playlistID})">❤</span>
                    <span>${playlist.likeCount}</span>
                </p>
            </div>
        `;
        cardContainer.innerHTML += template;
    }
};

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const openModal = (playlistID) => {
    currentPlaylistID = playlistID; 
    const playlist = data.playlists.find(pl => pl.playlistID === playlistID);
    if (!playlist) return;

    modalContent.querySelector('.playlist-image').src = playlist.playlist_art;
    modalContent.querySelector('.playlist-name').textContent = playlist.playlist_name;
    modalContent.querySelector('.playlist-creator').textContent = playlist.playlist_creator;

    const songsContainer = modalContent.querySelector('.songs-container');
    songsContainer.innerHTML = ''; 

    playlist.songs.forEach(song => {
        const songTemplate = `
            <div class="song">
                <img src="${song.cover_art}" alt="${song.title} Cover Art" class="song-image">
                <div class="song-details">
                    <h3 class="song-title">${song.title}</h3>
                    <p class="song-artist">${song.artist}</p>
                    <p class="song-album">${song.album}</p>
                </div>
                <p class="song-duration">${song.duration}</p>
            </div>
        `;
        songsContainer.innerHTML += songTemplate;
    });

    modal.style.display = 'block';

    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
        currentPlaylistID = null; 
    };
};

const shuffleSongs = () => {
    if (currentPlaylistID === null) return;

    const playlist = data.playlists.find(pl => pl.playlistID === currentPlaylistID);
    if (playlist) {
        playlist.songs = shuffleArray(playlist.songs);
        openModal(playlist.playlistID); 
    }
};

shuffleButton.addEventListener('click', shuffleSongs);

const likePlaylist = (event, playlistID) => {
    event.stopPropagation(); 
    const playlist = data.playlists.find(pl => pl.playlistID === playlistID);
    if (playlist) {
        playlist.likeCount = playlist.likeCount === 0 ? 1 : 0;
        renderPlaylists(); 
    }
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
        currentPlaylistID = null; 
    }
};

renderPlaylists();