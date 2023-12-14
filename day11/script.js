const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const prgressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skips = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');


function togglePlay() {
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }
    const method = video.paused ? 'play' : 'pause';
    video[method]();
}

video.addEventListener('click' ,togglePlay);
toggle.addEventListener('click' ,togglePlay);

function changeIcon() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

video.addEventListener('play' ,changeIcon);
video.addEventListener('pause' ,changeIcon);

function skipHandler() {
    const skip = this.dataset.skip;
    console.log(skip);
    video.currentTime += parseInt(skip);
}

skips.forEach(skip => skip.addEventListener('click' ,skipHandler));

function rangeHandler() {
    video[this.name] = this.value;
}

ranges.forEach(range => range.addEventListener('change' ,rangeHandler));
ranges.forEach(range => range.addEventListener('mousemove' ,rangeHandler));

function handleProgress() {
    const percent = (video.currentTime/video.duration) * 100;
    prgressBar.style.flexBasis = `${percent}%`;
}

video.addEventListener('timeupdate' ,handleProgress);

function scrub(e) {
    const scrubTime = (e.offsetX/progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

let mousedown = false;
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('click', scrub);









