//Terminal pop up
const secretFile = document.getElementById('file2');
const terminal = document.getElementById('terminal');


function showPopup() {
    terminal.classList.add('show');
    setTimeout(type, 2000);
}

secretFile.addEventListener('click', showPopup)

//Typing effect
//const text = "Initializing system...\nAccess granted.\nWelcome.";
//const text = "If you are justice, please do not lie. What is the price for your blind eye?"
const text = "I bend the truth with practiced grace, Yet earn belief in every face. The more untrue my tales may be, The more the world puts faith in me. I am a …"
const hint = document.getElementById('hint');

let i = 0;

function type() {
    if (i < text.length) {
        hint.textContent += text.charAt(i);
        i++;
        setTimeout(type, 80); // typing speed (ms)
    }
}

//Drag terminal
const topBar = document.getElementById("topBar");

let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let passwordCtr = 0;

terminal.addEventListener("pointerdown", (e) => {
    isDragging = true;
    terminal.setPointerCapture(e.pointerId);

    offsetX = e.clientX - terminal.offsetLeft;
    offsetY = e.clientY - terminal.offsetTop;
});

terminal.addEventListener("pointermove", (e) => {
    if (!isDragging) return;

    terminal.style.left = e.clientX - offsetX + "px";
    terminal.style.top = e.clientY - offsetY + "px";
});

terminal.addEventListener("pointerup", () => {
    isDragging = false;
});

//Password check and navigation
const input = document.getElementById("passwordInput");
// const correctPassword = "abribe";
const correctPasswords = ["apolitician", "politician" , "a politician"];


input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (correctPasswords.includes(input.value.toLowerCase()) || passwordCtr >= 3) {
            window.location.href = "cabinet.html";
        } else {
            input.value = "";
            input.placeholder = "Wrong password";
            //input.classList.add("error");
            passwordCtr++;
        }
    }
});

input.addEventListener("animationend", () => {
    input.classList.remove("error");
});


//Error effect
const template = document.getElementById("errorTemplate");
const btn = document.getElementById("file1");
const btn2 = document.getElementById("file3");

const MAX = 18;           // how many to spawn total
const SPAWN_EVERY = 250;  // ms between spawns
const CLOSE_EVERY = 350;  // ms between closes

let spawned = [];
let spawnTimer = null;
let closeTimer = null;

function rand(min, max){ return Math.random() * (max - min) + min; }

function spawnOne(){
  const el = template.cloneNode(true);
  el.hidden = false;
  el.removeAttribute("id"); // avoid duplicate IDs
  document.body.appendChild(el);

  // Measure so we can keep it inside the viewport
  const rect = el.getBoundingClientRect();
  const x = rand(0, Math.max(0, window.innerWidth - rect.width));
  const y = rand(0, Math.max(0, window.innerHeight - rect.height));

  el.style.left = `${x}px`;
  el.style.top  = `${y}px`;

  spawned.push(el);
}

function start(){
  // reset if running
  stop();

  spawned = [];

  spawnTimer = setInterval(() => {
    spawnOne();

    if (spawned.length >= MAX){
      clearInterval(spawnTimer);
      spawnTimer = null;

      // start closing after a brief pause
      setTimeout(beginClosing, 600);
    }
  }, SPAWN_EVERY);
}

function beginClosing(){
  let i = 0;
  closeTimer = setInterval(() => {
    if (i >= spawned.length){
      clearInterval(closeTimer);
      closeTimer = null;
      return;
    }

    const el = spawned[i];
    el.classList.add("closing");

    // remove after transition ends
    setTimeout(() => el.remove(), 950);

    i++;
  }, CLOSE_EVERY);
}

function stop(){
  if (spawnTimer) clearInterval(spawnTimer);
  if (closeTimer) clearInterval(closeTimer);
  spawnTimer = null;
  closeTimer = null;

  // remove any existing instances immediately
  spawned.forEach(el => el.remove());
  spawned = [];
}

btn.addEventListener("click", start);
btn2.addEventListener("click", start);
