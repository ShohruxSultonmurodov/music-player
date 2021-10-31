let dropdownBtns = document.querySelectorAll('.drop-btn');
let dropdownBodys = document.querySelectorAll('.dropdown-body');
let previous = document.querySelector('#prev')
let next = document.querySelector('#next');
let play = document.querySelector('#play');
let title = document.querySelector('#title');
let volume = document.querySelector('#volume');
let volumeShow = document.querySelector('#volm');
let volumeBtn = document.querySelector('#volm-btn')
let musicPosition = document.querySelector('#position');
let showTime = document.querySelector('#show-time');
let autoPlay = document.querySelector('#auto');
let artist = document.querySelector('#artist');
let btns = document.querySelectorAll('.btn');
let respBtns = document.querySelectorAll('.resp-music-btn');
let menuBtn = document.querySelector('.menu-btn');
let respMenu = document.querySelector('.resp-menu');

let timer;
let autoplay=0;
let index_no=0;
let playingSong = false;
let track = document.createElement('audio');
play.addEventListener('click', justPlay);
previous.addEventListener('click', previusSong);
next.addEventListener('click', nextSong);
volume.addEventListener('change', volumeChange);
musicPosition.addEventListener('change', changPosition);
volumeBtn.addEventListener('click', muteSound);
autoPlay.addEventListener('click', autoplaySwitch);
menuBtn.addEventListener('click', showMenu);

let allMusic=[
    {
        name:'Lilovaya',
        path:'musics/music1.mp3',
        singer:'Jah Khalib'
    },
    {
        name:'Medina',
        path:'musics/music2.mp3',
        singer:'Jah Khalib'
    },
    {
        name:'Искал-нашёл',
        path:'musics/music3.mp3',
        singer:'Jah Khalib'
    },
    {
        name:'Leyla',
        path:'musics/music4.mp3',
        singer:'Jah Khalib'
    },
    {
        name:'Колыбельная',
        path:'musics/music5.mp3',
        singer:'Jah Khalib'
    },
    {
        name:'Люби меня',
        path:'musics/music6.mp3',
        singer:'Miyagi & Эндшпиль'
    },
    {
        name:'Не жаль',
        path:'musics/music7.mp3',
        singer:'Miyagi & Скриптонит'
    },
    {
        name:'Самурай',
        path:'musics/music8.mp3',
        singer:'Miyagi'
    },
    {
        name:'Minor',
        path:'musics/music9.mp3',
        singer:'Miyagi & Andy Panda '
    },
    {
        name:'Не грусти родная',
        path:'musics/music10.mp3',
        singer:'Miyagi'
    },
    {
        name:'Горишь огнём',
        path:'musics/music11.mp3',
        singer:'Jony'
    },
    {
        name:'Босс',
        path:'musics/music12.mp3',
        singer:'Jony, The Limba'
    },
    {
        name:'Комета',
        path:'musics/music13.mp3',
        singer:'Jony'
    },
    {
        name:'Ты меня не помнишь',
        path:'musics/music14.mp3',
        singer:'Jony'
    },
    {
        name:'Без тебя я не я',
        path:'musics/music15.mp3',
        singer:'Jony, HammAli & Navai'
    },
]
function showMenu() {
    respMenu.classList.toggle('show-menu');
}

function loadTrack(index_no) {
    clearInterval(timer);
    resetSlider();
    track.src = allMusic[index_no].path;
    title.innerHTML = allMusic[index_no].name;
    artist.innerHTML = allMusic[index_no].singer;
    track.load();
    timer = setInterval(rangeSlider, 1000);
}
loadTrack(index_no);

function resetSlider() {
    musicPosition.value = 0;
}

function muteSound() {
    track.volume=0;
    volume.value=0;
    volumeShow.innerHTML=0;
    volumeBtn.innerHTML = "<i class='bx bx-volume-mute'></i>";
}

function justPlay() {
    if(playingSong==false) {
        playSong();
    }else {
        pauseSong();
    }
}
function playSong() {
    track.play();
    playingSong=true;
    play.innerHTML ='<i class="bx bx-pause"></i>'
}
function pauseSong() {
    track.pause();
    playingSong=false;
    play.innerHTML = '<i class="bx bx-play"></i>'
}
function nextSong() {
    if(index_no<allMusic.length-1){
        index_no+=1;
        loadTrack(index_no);
        playSong();
    }else {
        index_no=0;
        loadTrack(index_no);
        playSong();
    }
}
function previusSong() {
    if(index_no>0) {
        index_no-=1;
        loadTrack(index_no);
        playSong();
    }else {
        index_no=allMusic.length-1;
        loadTrack(index_no);
        playSong();
    }
}
function volumeChange() {
    volumeShow.innerHTML = volume.value;
    if(volume.value>=50) {
        volumeBtn.innerHTML="<i class='bx bx-volume-full' ></i>"
    }else if(volume.value>0 && volume.value<50) {
        volumeBtn.innerHTML="<i class='bx bx-volume-low' ></i>"
    }else {
        volumeBtn.innerHTML="<i class='bx bx-volume-mute' ></i>"
    }
    track.volume = volume.value / 100;
}
volumeShow.innerHTML = volume.value;

function changPosition() {
    slider_position = track.duration*(musicPosition.value/100);
    track.currentTime = slider_position;
}

function rangeSlider() {
    let position = 0;
    if(!isNaN(track.duration)) {
        position = track.currentTime*(100/track.duration);
        musicPosition.value = position;
    }
    if(track.ended) {
        play.innerHTML = '<i class="bx bx-play"></i>';
        if(autoplay==1) {
            index_no+=1;
            loadTrack(index_no);
            playSong();
        }
    }
    let minute = Math.floor(track.currentTime/60);
    let second = Math.floor(track.currentTime%60) ;
    showTime.innerHTML = `${minute<10?"0"+minute:minute}:${second<10?"0"+second:second}`;
}
function autoplaySwitch() {
    if(autoplay==1) {
        autoplay=0;
        autoPlay.classList.remove('active-btn');
    }else {
        autoplay=1;
        autoPlay.classList.add('active-btn');
    }
}
dropdownBtns.forEach((element, i) => {
    element.addEventListener('click',()=>showDropBody(i))
});
function showDropBody(i) {
    for(let k in dropdownBodys) {
        if(dropdownBodys[k]!=dropdownBodys[i]) {
            dropdownBodys[k].classList.remove('show-body');
        }else {
            dropdownBodys[i].classList.toggle('show-body');
        }
    }
}
respBtns.forEach((element, i) => {
    element.addEventListener('click', ()=>{
        currentTrack(i);
        showMenu();
    });

});
btns.forEach((element, i) => {
    element.addEventListener('click', ()=>currentTrack(i))
});
function currentTrack(i) {
    index_no=Number(i);
    loadTrack(index_no);
    playSong();
}