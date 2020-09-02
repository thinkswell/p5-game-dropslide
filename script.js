class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 100;
    this.h = 20;
  }

  show() {
    fill(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h);
  }

  moveTo(x) {
    this.x = x;
  }

  color(x) {}
}

let platform;
let drops = [];

let score = 0;
let high = score;
let velocity = 3;
let updateVel = false;
let locked = false;
let newX;
let plateformVelocity = 0;
let level = 0;

function setup() {
  let canvaWidth = 500;
  let canvaHeight = 560;
  if (window.innerWidth <= 500) {
    canvaWidth = window.innerWidth;
  }
  if (window.innerHeight <= 560) {
    canvaHeight = window.innerHeight;
  }
  createCanvas(canvaWidth, canvaHeight);
  platform = new Platform(width / 2 - 50, height - 80);
  newX = width / 2;
}
function draw() {
  background(0);
  // drop.update();
  noStroke();

  fill(255);
  textSize(17);
  text(`Highest: ${high}`, 5, 20);
  textSize(25);
  let number = score >= 0 ? score : 0;
  text(`Score: ${number}`, 5, 50);
  text(`Level: ${level}`, width - 100, 50);

  if (frameCount % (94 - Math.floor(Math.pow(8, 1.3))) == 0) {
    let drop = new Drop(random(5, width - 5), 0, 50, velocity);
    drops.push(drop);
  }

  let top = height - 80;
  fill(255);
  rect(0, top - 10, width, 20);

  if (!locked) {
    newX = mouseX;
  }

  if (keyIsPressed) {
    exitPointerLock();
    if (keyCode === 37) {
      // newX = platform.x - plateformVelocity;
      newX = platform.x - 10;
      // plateformVelocity += 0.5;
    }
    if (keyCode === 39) {
      // newX = platform.x + 1 + plateformVelocity;
      newX = platform.x + 10;
      // plateformVelocity += 0.5;
    }
  }

  // pause(2000);

  platform.moveTo(newX);
  platform.show();
  rectMode(CORNER);

  for (let i = drops.length - 1; i >= 0; i--) {
    drops[i].update();
    drops[i].show();

    if (drops[i].hits(platform)) {
      if (score > high) {
        high = score;
        handleHit(score);
      }
      overlay();
      console.log("Hit!!");

      fill(255, 0, 0);
      rect(0, top - 10, width, 20);
      platform.moveTo(newX);
      platform.show();
      score = 0;
      drops.splice(0, drops.length);
      velocity = 3;
      level = 0;
      noLoop();
    }

    if (drops.length > 0 && drops[i].offPlateform(platform)) {
      drops.splice(i, 1);
      if (score > 1 && score % 10 == 0) {
        velocity += 1;
        level += 1;
      }
      score += 1;
    }
  }

  // if (updateVel) {
  //   updateVel = false;
  // }

  // console.log(updateVel);
  // console.log(velocity);

  // console.log(score);
}

function keyPressed() {
  if (!locked && (keyCode === 37 || keyCode === 39)) {
    enableKeyboard();
    disableMouse();
    requestPointerLock();
    locked = true;
  }
}

function mouseClicked() {
  if (locked) {
    disableKeybord();
    enableMouse();
    exitPointerLock();
    locked = false;
  }
}

function keyReleased() {
  plateformVelocity = 0;
}
