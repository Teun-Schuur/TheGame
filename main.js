let rain = [];
let lines = [];

function setup() {
  createCanvas(displayWidth, displayHeight);
  frameRate(60);
}

function draw() {
  background(30, 20, 0);
  fill(245, 245, 202);
  circle(width/2-width/4, 120, 180);
  if(rain.length < 1200){
    for(var i = 0; i < 4; i++){
      append(rain, new Drup());
    }
  }

  for (var i = 0; i < rain.length; i++){
    rain[i].update()
    rain[i].draw()
  }
  if(lines.length>300){
    for(var i = 300; i < lines.length; i++){
      lines.shift()
    }
  }
  for(var i = 0; i < lines.length; i++){
    push()
    strokeWeight(lines[i][2]*2);
    stroke(255, 100, 255);
    point(lines[i][0], lines[i][1])
    pop()
  }


}


class Drup{
  constructor(){
    this.x = random(0, width);
    this.y = 0;
    this.size = random(1, random(1, random(1, random(1, random(1, 10)))))*(Math.random()+1);
    this.speed = this.size*2;
    this.color = map(this.size, 1, 15, 75, 255);
    this.ground = 100;
    }

  update(){
    this.y += this.speed;
    this.ground -= 0.6
    if (this.y > height+this.size*5 || this.ground < 0){
      append(lines, [this.x, this.y, this.size])
      this.y = 0;
      this.x = random(0, width)
      this.ground = 100
    }
  }

  draw(){
    strokeWeight(this.size);
    stroke(this.color, 0, this.color);
    var nx = this.y+this.size*5
    line(this.x, this.y, this.x, nx)
  }
}
