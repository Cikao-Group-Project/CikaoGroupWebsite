/* ------- CONFIG -------- */
const AUTOPLAY_DELAY = 3000;   // 3s

/* ------- SETUP -------- */
const mainImg   = document.querySelector('#main-slide img');
const thumbs    = Array.from(document.querySelectorAll('.thumb'));
const strip     = document.getElementById('thumb-strip');
const btnPrev   = document.getElementById('nav-prev');
const btnNext   = document.getElementById('nav-next');

let current     = 0;
let autoplayId  = startAutoplay();

/* ------- FUNCTIONS -------- */
function showSlide(idx){
  current = (idx + thumbs.length) % thumbs.length;
  mainImg.src = thumbs[current].src;
  thumbs.forEach(t=>t.classList.toggle('active', +t.dataset.index === current));
}

function nextSlide(step=1){
  showSlide(current + step);
}

function scrollStrip(px){
  strip.scrollBy({left:px, behavior:'smooth'});
}

/* ------- EVENT LISTENERS -------- */
// Arrow buttons scroll thumb strip
btnPrev.addEventListener('click', ()=>scrollStrip(-thumbs[0].offsetWidth*3));
btnNext.addEventListener('click', ()=>scrollStrip( thumbs[0].offsetWidth*3));

// Thumbnail click: show slide + stop autoplay
thumbs.forEach(t=>{
  t.addEventListener('click', ()=>{
    stopAutoplay();
    showSlide(+t.dataset.index);
  });
});

// Thumb strip swipe/scroll stops autoplay *once*
strip.addEventListener('scroll', stopAutoplay, {once:true});

/* ------- AUTOPLAY -------- */
function startAutoplay(){
  return setInterval(()=>nextSlide(1), AUTOPLAY_DELAY);
}
function stopAutoplay(){
  if(autoplayId){ clearInterval(autoplayId); autoplayId = null; }
}