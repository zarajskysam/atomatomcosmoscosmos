$(document).ready(function () {
    //список песен
    const songs = [
        {
            id: '1',
            title: 'On a Clear Day You Can See Forever',
            artist: 'Роберт Гуле'
        },
        {
            id: '2',
            title: 'First Time Ever I Saw Your Face',
            artist: 'Роберта Флэк'
        },
        {
            id: '3',
            title: 'Нежность',
            artist: 'Майя Кристалинская'
        },
        {
            id: '4',
            title: 'Rocket Man',
            artist: 'Элтон Джон'
        },
        {
            id: '5',
            title: 'Bohemian Rhapsody',
            artist: 'Queen'
        },
        {
            id: '6',
            title: 'Every Breath You Take',
            artist: 'The Police'
        },
        {
            id: '7',
            title: 'Растаяла дымка сквозная',
            artist: 'Константин Никольский'
        },
        {
            id: '8',
            title: 'To the Moon and Back',
            artist: 'Savage Garden'
        },
        {
            id: '9',
            title: 'Supermassive Black Hole',
            artist: 'Muse'
        },
        {
            id: '10',
            title: 'Homeward Bound',
            artist: 'Simon & Garfunkel'
        }
    ];
    //Объявление переменных
    const player = document.querySelector('.player__interface'),
        playBtn = document.querySelector('.play'),
        playlist = document.querySelector('.playlist'),
        prevBtn = document.querySelector('.prev'),
        nextBtn = document.querySelector('.next'),
        audio = document.querySelector('.audio'),
        progressContainer = document.querySelector('.player__interface__progressbar'),
        progressBar = document.querySelector('.progressbar'),
        title = document.querySelector('.song__info__title'),
        artist = document.querySelector('.song__info__artist'),
        imgSrc = document.querySelector('.play__img'),
        cover = document.querySelector('.cover'),
        currentTimeSong = document.querySelector('.progressbar__time__progress'),
        durationSong = document.querySelector('.progressbar__time__end');

    //Вывод названий пемен в список
    songs.forEach(element => {
        playlist.innerHTML = playlist.innerHTML + `<li class="playlist__item" data-id=${element.id}>${element.title} | ${element.artist}</li>`;
        playlist.querySelector('.playlist__item').classList.add('active__song');
    });
    //Функция смены метки на названии песни
    playlist.addEventListener('click', (e) => {
        if (e.target.classList.contains('playlist__item')) {
            let items = playlist.querySelectorAll('.playlist__item');
            items.forEach(element => {
                if (element.classList.contains('active__song')) {
                    element.classList.remove('active__song');
                }
            });
            e.target.classList.add('active__song');
            songIndex = songs.findIndex((element) => element.id == e.target.getAttribute('data-id'));
            loadSong(songs[songIndex]);
            playSong();
            imgSrc.src = 'src/img/audioPlayer/pause.png';
        }
    });

    function findSongInList(index) {
        let items = Array.from(playlist.querySelectorAll('.playlist__item'));
        currentIndex = items.findIndex((element) => element.getAttribute('data-id') == index + 1);
        items.forEach(element => {
            if (element.classList.contains('active__song')) {
                element.classList.remove('active__song');
            }
        });
        items[currentIndex].classList.add('active__song');
    }
    //Песня по умолчанию
    let songIndex = 0;

    //Init
    function loadSong(song) {
        title.innerHTML = song.title;
        audio.src = `src/audio/${song.id}.mp3`;
        artist.innerHTML = song.artist;
        cover.style.background = `url("src/img/audioPlayer/covers/${song.id}.png") center center no-repeat`;
        cover.style.backgroundSize = 'cover';
        setTimeout(() => {
            durationSong.innerHTML = `${getTime(audio.duration)}`;
        }, 1000);
    }
    loadSong(songs[songIndex]);

    //Play
    function playSong() {
        player.classList.add('active__player');
        audio.play();
        let intervalTime = setInterval(() => {
            currentTimeSong.innerHTML = `${getTime(audio.currentTime)}`;
        }, 1000);

    }

    //Pause
    function pauseSong() {
        player.classList.remove('active__player');
        audio.pause();
    }
    playBtn.addEventListener('click', () => {
        if (player.classList.contains('active__player')) {
            pauseSong();
            imgSrc.src = 'src/img/audioPlayer/play.png';

        } else {
            playSong();
            imgSrc.src = 'src/img/audioPlayer/pause.png';
        }
    })
    //Next Song
    function nextSong() {
        songIndex++;
        if (songIndex >= songs.length) {
            songIndex = 0;
        }
        loadSong(songs[songIndex]);
        findSongInList(songIndex);
    }
    nextBtn.addEventListener('click', () => {
        nextSong();
        if (player.classList.contains('active__player')) {
            playSong();
        }
    });
    //Prev Song
    function prevSong() {
        songIndex--;
        console.log(songIndex);
        if (songIndex < 0) {
            songIndex = 12;
        }
        loadSong(songs[songIndex]);
        findSongInList(songIndex);
    }
    prevBtn.addEventListener('click', () => {
        prevSong();
        if (player.classList.contains('active__player')) {
            playSong();
        }
    });

    //ProgressBar
    function updateProgress(e) {
        const { duration, currentTime } = e.srcElement;
        const progressPecent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPecent}%`;
    }
    audio.addEventListener('timeupdate', updateProgress);

    //Set Progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        audio.currentTime = (clickX / width) * duration;
    }

    progressContainer.addEventListener('click', setProgress);

    //Autoplay
    audio.addEventListener('ended', () => {
        nextSong();
        playSong();
    });

    //Get Time 
    function getTime(time) {
        let roundTime = Math.round(time);
        let minutes = Math.floor(roundTime / 60);
        let seconds = roundTime % 60;
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        return `${minutes}:${seconds}`;
    }
});


