document.addEventListener('DOMContentLoaded', ()=>{
  const track = document.getElementById('outlet-track');
  track.innerHTML += track.innerHTML; // clone children sekali
});