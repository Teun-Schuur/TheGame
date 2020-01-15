let cols, rows;
let w = 50;
let grid = [];
let current;
let stack = [];
let worldCamera;

function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  worldCamera = createVector(width/2, height/2, 0);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }

  current = grid[0];
  for(var i = 0; i<5000; i++){
  current.visited = true;
  current.highlight();
  let next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    stack.push(current);
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }
}
}

function draw() {
  background(51);
  checkKey()
  translate(-worldCamera.x, -worldCamera.y, -worldCamera.z);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}


function checkKey(){
    console.log(key);
    if (keyIsPressed && key == 'w') worldCamera.y -= 5;
    if (keyIsPressed && key == 's') worldCamera.y += 5;
    if (keyIsPressed && key == 'a') worldCamera.x -= 5;
    if (keyIsPressed && key == 'd') worldCamera.x += 5;
    if (keyIsPressed && key == 'x') worldCamera.z -= 5;
    if (keyIsPressed && key == 'z') worldCamera.z += 5;
}
