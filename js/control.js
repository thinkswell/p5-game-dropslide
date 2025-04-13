const colorDisable = "#bbb";
const colorEnable = "#222";

const keyboard = document.querySelector("#opt1");
const mouse = document.querySelector("#opt2");

const restart = document.querySelector(".btn");

function enableKeyboard() {
  keyboard.style.color = colorEnable;
}

function enableMouse() {
  mouse.style.color = colorEnable;
}

function disableKeybord() {
  keyboard.style.color = colorDisable;
}

function disableMouse() {
  mouse.style.color = colorDisable;
}

function noOverlay() {
  restart.style.visibility = "hidden";
}

function overlay() {
  restart.style.visibility = "visible";
}

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

noOverlay();

restart.addEventListener(
  "click",
  debounce(() => {
    loop();
    noOverlay();
  }, 300)
);
