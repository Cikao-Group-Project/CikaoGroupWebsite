/* ------- CONFIG -------- */
const AUTOPLAY_DELAY = 2000; // 2s

/* ------- INIT FOR EACH SECTION -------- */
document.querySelectorAll('.section-a').forEach(section => {
  const mainImg   = section.querySelector('#main-slide img');
  const thumbs    = Array.from(section.querySelectorAll('.thumb'));
  const strip     = section.querySelector('#thumb-strip');
  const btnPrev   = section.querySelector('#nav-prev');
  const btnNext   = section.querySelector('#nav-next');

  if (!mainImg || thumbs.length === 0) return; // Skip if invalid

  let current = 0;
  let autoplayId = startAutoplay();

  // Show selected slide
  function showSlide(idx) {
    current = (idx + thumbs.length) % thumbs.length;
    mainImg.src = thumbs[current].src;
    thumbs.forEach(t =>
      t.classList.toggle('active', +t.dataset.index === current)
    );
  }

  function nextSlide(step = 1) {
    showSlide(current + step);
  }

  function scrollStrip(px) {
    strip.scrollBy({ left: px, behavior: 'smooth' });
  }

  // Event listeners
  btnPrev?.addEventListener('click', () => scrollStrip(-thumbs[0].offsetWidth * 3));
  btnNext?.addEventListener('click', () => scrollStrip(thumbs[0].offsetWidth * 3));

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      stopAutoplay();
      showSlide(+t.dataset.index);
    });
  });

  strip?.addEventListener('scroll', stopAutoplay, { once: true });

  // Autoplay functions
  function startAutoplay() {
    return setInterval(() => nextSlide(1), AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayId) {
      clearInterval(autoplayId);
      autoplayId = null;
    }
  }

  // Initial render
  showSlide(0);
});
