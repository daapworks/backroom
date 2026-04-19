// assets/js/cabinet.js
(() => {
  const fileEls = Array.from(
    document.querySelectorAll("#file1, #file2, #file3, #file4, #file5, #file6, #file7, #file8")
  );

  // Tune these numbers to taste
  const HOVER_LIFT = 14;     // px up on hover
  const OPEN_LIFT  = 260;    // px up on click (pull-out distance)

  // Track state
  let openEl = null;

  // Cache each file’s baseline info so we can always return cleanly
  const base = new Map();
  fileEls.forEach(el => {
    const z = parseInt(getComputedStyle(el).zIndex || "1", 10);
    base.set(el, { z });

    // Ensure a known starting transform for GSAP (important)
    gsap.set(el, { y: 0 });
  });

  function closeOpen() {
    if (!openEl) return;

    const { z } = base.get(openEl);
    openEl.classList.remove("is-open");

    gsap.to(openEl, {
      y: 0,
      duration: 0.38,
      ease: "power3.out",
      // onComplete: () => {
      //   openEl.style.zIndex = String(z);
      // }
    });

    openEl = null;
  }

  function openFile(el) {
    // Close any currently open file
    if (openEl && openEl !== el) closeOpen();

    openEl = el;
    el.classList.add("is-open");

    // Bring above everything (your front drawer is z=8)
    //el.style.zIndex = "20";

    gsap.to(el, {
      y: -OPEN_LIFT,
      duration: 0.52,
      ease: "power3.out"
    });
  }

  // Attach interactions
  fileEls.forEach(el => {
    el.addEventListener("mouseenter", () => {
      if (openEl === el) return; // ignore hover when open
      gsap.to(el, { y: -HOVER_LIFT, duration: 0.2, ease: "power2.out" });
    });

    el.addEventListener("mouseleave", () => {
      if (openEl === el) return;
      gsap.to(el, { y: 0, duration: 0.2, ease: "power2.out" });
    });

    el.addEventListener("click", (e) => {
      e.stopPropagation();

      // Toggle if clicking same one
      if (openEl === el) {
        closeOpen();
      } else {
        openFile(el);
      }
    });
  });

  // Click outside closes
  document.addEventListener("click", () => closeOpen());

  // ESC closes
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeOpen();
  });
})();

// Typing effect for title
const text = "THE BACKROOM";
const typedEl = document.getElementById("typed-text");
const cursorEl = document.getElementById("cursor");

let index = 0;
const TYPE_SPEED = 60; // ms per character

function typeNext() {
  if (index < text.length) {
    typedEl.textContent += text[index];
    index++;
    setTimeout(typeNext, TYPE_SPEED);
  } else {
    // optional: stop cursor blinking after finish
    // cursorEl.style.display = "none";
  }
}

// start typing after a short delay
setTimeout(typeNext, 500);

