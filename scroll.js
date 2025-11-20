const container = document.getElementById('container');
const panels = document.querySelectorAll('.panel');
const total = panels.length;
let index = 0;
let isScrolling = false;
let isScrollingPanel = false;

// Initialize slider currentSlide

// Update panel classes
function updatePanels() {
  panels.forEach((panel, i) => {
    panel.classList.remove('active', 'previous', 'next', 'fullscreen');
    if (i === index) panel.classList.add('active');
    else if (i < index) panel.classList.add('previous');
    else panel.classList.add('next');
  });
}

// Go to a panel
function goToPanel(i) {
  if (i < 0 || i >= total || isScrolling) return;
  isScrolling = true;
  index = i;
  updatePanels();
  setTimeout(() => (isScrolling = false), 1000); // match panel transition
}


// --- Initial state ---
updatePanels();

/* ----------------------------------------------------------
   🖱 Desktop: wheel scroll inside panels first, then page snap
----------------------------------------------------------- */
window.addEventListener(
  "wheel",
  (e) => {
    const activePanel = panels[index];
    const delta = e.wheelDelta || -e.deltaY;

    const atTop = activePanel.scrollTop === 0;
    const atBottom =
      Math.ceil(activePanel.scrollTop + activePanel.clientHeight) >=
      activePanel.scrollHeight;

    // scrolling down
    if (delta < 0) {
      if (!atBottom) return;
      e.preventDefault();
      goToPanel(index + 1);
    }
    // scrolling up
    else {
      if (!atTop) return;
      e.preventDefault();
      goToPanel(index - 1);
    }
  },
  { passive: false }
);

/* ----------------------------------------------------------
   ⌨ Keyboard
----------------------------------------------------------- */
window.addEventListener("keydown", (e) => {
  if (isScrolling) return;


  if (e.key === "ArrowDown") goToPanel(index + 1);
  else if (e.key === "ArrowUp") goToPanel(index - 1);
});

/* ----------------------------------------------------------
   📱 Mobile: touch swipe logic with internal scroll support
----------------------------------------------------------- */
let touchStartY = 0;
let touchEndY = 0;

window.addEventListener(
  "touchstart",
  (e) => (touchStartY = e.touches[0].clientY),
  { passive: true }
);
window.addEventListener(
  "touchmove",
  (e) => (touchEndY = e.touches[0].clientY),
  { passive: true }
);
window.addEventListener("touchend", () => {
  if (isScrolling) return;

  const diff = touchStartY - touchEndY;
  if (Math.abs(diff) < 50) return; // ignore small swipes

  const activePanel = panels[index];
  const atTop = activePanel.scrollTop === 0;
  const atBottom =
    Math.ceil(activePanel.scrollTop + activePanel.clientHeight) >=
    activePanel.scrollHeight;


  // Swipe down
  if (diff > 0) {
    if (!atBottom) return;
    goToPanel(index + 1);
  }
  // Swipe up
  else {
    if (!atTop) return;
    goToPanel(index - 1);
  }
});
