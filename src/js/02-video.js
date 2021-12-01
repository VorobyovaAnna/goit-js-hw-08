import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY_VIDEOPLAYER = 'videoplayer-current-time';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onTimeUpDate(data) {
    localStorage.setItem(STORAGE_KEY_VIDEOPLAYER, data.seconds);
};

player.on('timeupdate', throttle(onTimeUpDate, 1000));

const currentTime = localStorage.getItem(STORAGE_KEY_VIDEOPLAYER);
    if (currentTime) {
        player.setCurrentTime(currentTime);
    }
    
player.getVideoTitle().then(function(title) {
    console.log('title:', title);
});