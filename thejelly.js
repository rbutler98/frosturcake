// Reveal effect on scroll
  window.addEventListener('scroll', () => {
    const image = document.querySelector('.parties-image');
    const rect = image.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      image.classList.add('reveal');
    }
  });
    
  const dripPath = document.getElementById("dripPath");

  const baseY = 80;
  const amplitude = 20;
  const frequency = 0.002;

  function generateDripPath(time) {
    const points = [];
    const width = 1440;
    const segments = 30;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      const y = baseY + Math.sin(time * 0.001 + i * frequency * 500) * amplitude;
      points.push([x, y]);
    }

    let path = `M0,0 `;
    for (let i = 0; i < points.length - 1; i++) {
      const [x1, y1] = points[i];
      const [x2, y2] = points[i + 1];
      const xc = (x1 + x2) / 2;
      const yc = (y1 + y2) / 2;
      path += `Q ${x1},${y1} ${xc},${yc} `;
    }
    path += `L1440,0 L1440,150 L0,150 Z`;

    return path;
  }

  function animateDrip(time) {
    dripPath.setAttribute("d", generateDripPath(time));
    requestAnimationFrame(animateDrip);
  }

  requestAnimationFrame(animateDrip);

    // Fade-in on scroll
    const partyImage = document.getElementById('partyImage');
    function handleScroll() {
      const rect = partyImage.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        partyImage.classList.add('visible');
        window.removeEventListener('scroll', handleScroll);
      }
    }
    window.addEventListener('scroll', handleScroll);
    // Trigger check on load in case already in view
    handleScroll();

    // Footer Slideshow
   const slideshow = document.getElementById("slideshow");
  const images = slideshow.querySelectorAll("img");
  const dots = document.querySelectorAll(".dot");
  let index = 0;
  let interval;

  function updateSlide(i) {
    images.forEach(img => img.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    images[i].classList.add("active");
    dots[i].classList.add("active");
    const imageWidth = images[i].getBoundingClientRect().width + 40; // includes gap
    const totalShift = (imageWidth + 40) * i;
    slideshow.style.transform = `translateX(calc(50% - ${(imageWidth / 2) + (i * imageWidth)}px))`;
    index = i;
  }

  function autoScroll() {
    const nextIndex = (index + 1) % images.length;
    updateSlide(nextIndex);
  }

  function startSlideshow() {
    interval = setInterval(autoScroll, 4000); // wait 4s between slides
  }

  slideshow.addEventListener("mouseenter", () => clearInterval(interval));
  slideshow.addEventListener("mouseleave", startSlideshow);

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      updateSlide(i);
      clearInterval(interval);
      startSlideshow();
    });
  });
  // Initial state
  updateSlide(0);
  startSlideshow();
