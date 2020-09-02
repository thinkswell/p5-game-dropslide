class Drop {
  constructor(x, y, h, v) {
    this.x = x;
    this.y = -h;
    this.w = 10;
    this.h = h;
    this.velocity = v;
  }

  show() {
    fill(255);
    rectMode(CORNER);
    rect(this.x, this.y, this.w, this.h);
  }

  update() {
    this.y += this.velocity;
  }

  offPlateform(platform) {
    return this.y > platform.y + platform.h / 2;
  }

  offScreen() {
    return this.y > height;
  }

  hits(platform) {
    if (
      this.x < platform.x - platform.w / 2 ||
      this.x > platform.x + platform.w / 2
    ) {
      if (this.y + this.h > platform.y && this.y < platform.y) {
        return true;
      }
    }
  }
}
