console.log("Swag")
const currentTime = document.getElementById('current-time');
const totalTime = document.getElementById('total-time');
const playPauseButton = document.getElementById('play-pause-button');
const seekbar = document.getElementById('seek-bar');
const audio = new Audio("audio/Soft-Background-for-Interview.webm")
let isSeeking= false;

playPauseButton.onclick = function(){
    if (audio.paused){
        audio.play();
    }else{
        audio.pause();
    }
}
// audio event listeners
//event triggered once audio loaded
audio.oncanplaythrough = function(){
    seekbar.disabled = false;
}
//event triggered when audio played
audio.onplay = function(){
    playPauseButton.src="images/pause.svg"
}
audio.onpause = function(){
    playPauseButton.src="images/play.svg"
}
// event triggered by meta data
audio.onloadedmetadata = function(){
    totalTime.innerHTML = formatTime(audio.duration);
    currentTime.innerHTML = formatTime(0)
    seekbar.max = Math.floor(audio.duration);
}
// event triggered when time updates
audio.ontimeupdate = function(){
    currentTime.innerHTML = formatTime(audio.currentTime)
    if(!isSeeking){
        seekbar.value = Math.floor(audio.currentTime)
    }

}
// event triggered when audio ends
audio.onended = function(){
    currentTime.innerHTML = formatTime(0);
    seekbar.value = 0;
    playPauseButton.src = "images/play.svg";
}
// seek bar listeners
//event triggered on interaction with seeker
seekbar.oninput = function(){
    isSeeking = true;
}
// event triggered when seek bar is changed
seekbar.onchange = function(){
    audio.currentTime = seekbar.value;
    isSeeking = false;
}   
//UTILLITY FUNCTIONS
// takes total seconds (number) and returns a formatted string 
function formatTime(secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - (hours * 3600)) / 60);
    let seconds = Math.floor((secs - (hours * 3600)) - minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (hours > 0) {
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        return hours + ":" + minutes + ":" + seconds;
    } else {
        return minutes + ":" + seconds;
    }
}