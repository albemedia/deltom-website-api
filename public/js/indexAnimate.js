document.addEventListener('load', animateLinks());

function animateLinks() {
  const linkAnim = anime({
    targets: '#navLinks div',
    duration: 1000,
    opacity: [0, 1],
    translateY: [-40, 0],
    elasticity: 100,
    delay(el, i, l) {
      return i * 100;
    },
  });
  linkAnim.finished.then(isReady());
}

function isReady() {
  const elem = document.querySelector('#welcome');
  const animation = anime({
    targets: elem,
    delay: 500,
    opacity: [0, 1],
    translateY: [-90, 0],
    easing: 'easeOutCubic',
  });
}
