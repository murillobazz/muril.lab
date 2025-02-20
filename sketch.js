const mainColor = "#ffba0d";
const bgColor = "#223631";
const cardTxt = {
  x: 120,
  y: 120,
};
const gameExe = {
  x: 240,
  y: 120,
};
// define rectangle center
const centerPoint = {
  x: 37,
  y: 46,
};
let anchorPoint = {
  x: 200,
  y: 200,
};
let ball = {
  x: 200,
  y: 200,
  direction: 'right'
}
// ball y modifier
let heightModifier = {
  value: 0,
  direction: 'neutral'
};

// game score
let score = 1;
let highScore = 0;

let businessCard = false;
let showDesktop = true;
let showGameWindow = false;
let isGameStarted = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(bgColor);

  // mouse coordinates
  noStroke();
  fill("white");
  textSize(10);
  textAlign(LEFT);
  text(`mouseX: ${mouseX} | mouseY: ${mouseY}`, 10, 30);

  textFont("Silkscreen");
  textSize(10);
  textAlign(CENTER);
  fill(mainColor);
  text("Muril.Lab", width / 2, 50);

 if (showDesktop) {
    drawCard(cardTxt.x, cardTxt.y, "card.txt");
    drawCard(gameExe.x, gameExe.y, "game.exe");
 } else if (businessCard) {
    showBusinessCard();
  } else if (showGameWindow) {
    showGame();
  }
}

const drawCard = (x, y, textToWrite) => {
  // draw bg card color
  fill(mainColor);
  rectMode(CORNER);
  rect(x, y, 74, 92);

  // draw card shape
  stroke(bgColor);
  strokeWeight(3);
  strokeCap(SQUARE);
  strokeJoin(MITER);
  line(x + 4, y + 12, x + 4, y + 86); //left
  line(x + 6, y + 88, x + 68, y + 88); //bottom
  line(x + 70, y + 6, x + 70, y + 86); //right
  line(x + 16, y + 4, x + 68, y + 4); //top
  // top-right fold
  line(x + 6, y + 10, x + 13, y + 4);
  line(x + 4, y + 22, x + 19, y + 22); //hor
  line(x + 22, y + 4, x + 22, y + 19); //vert

  // write card name
  noStroke();
  textAlign(CENTER);
  text(textToWrite, x + 37, y + 102);

  if (
    dist(cardTxt.x + centerPoint.x, cardTxt.y + centerPoint.y, mouseX, mouseY) <
    40
  ) {
    cursor(HAND);
  } else if (
    dist(gameExe.x + centerPoint.x, gameExe.y + centerPoint.y, mouseX, mouseY) <
    40
  ) {
    cursor(HAND);
  } else {
    cursor(ARROW);
  }
};

function doubleClicked() {
  if (
    dist(cardTxt.x + centerPoint.x, cardTxt.y + centerPoint.y, mouseX, mouseY) <
    40
  ) {
    businessCard = true;
    showDesktop = false;
  } else if (
    dist(gameExe.x + centerPoint.x, gameExe.y + centerPoint.y, mouseX, mouseY) <
    40
  ) {
    showGameWindow = true;
    showDesktop = false;
  }
}

const showBusinessCard = () => {
  // Draw the rectangle.
  fill(mainColor);
  rectMode(CENTER);
  rect(anchorPoint.x, anchorPoint.y, 300, 150);

  // close card text
  fill(bgColor);
  text("x", anchorPoint.x + 135, anchorPoint.y - 60);

  // card title
  textSize(12);
  text(`murillo\ncreative developer`, anchorPoint.x, anchorPoint.y - 50);
  // card text 
  textSize(10);
  text(`Currently taking a postgraduate program\nin UX Design with 4+ years of experience\nin js frontend development`, anchorPoint.x, anchorPoint.y - 20);

  // enables card dragging
  if (dist(mouseX, mouseY, anchorPoint.x, anchorPoint.y) < 40) {
    cursor("grab");

    if (mouseIsPressed) {
      anchorPoint.x = mouseX;
      anchorPoint.y = mouseY;
    }
  } else if (dist(mouseX, mouseY, anchorPoint.x + 135, anchorPoint.y - 60) <= 10) {
     // close card button
    cursor(HAND);

    if (mouseIsPressed) {
      businessCard = false;
      showDesktop = true;
    }
  } else cursor(ARROW);
};

const showGame = () => {
  // Draw the rectangle.
  fill(mainColor);
  rectMode(CENTER);
  rect(anchorPoint.x, anchorPoint.y, 400, 400);
  noFill();
  stroke(bgColor);
  rect(anchorPoint.x, anchorPoint.y, 380, 380);
  
  // close game text
  fill(bgColor);
  noStroke();
  text("x", anchorPoint.x + 180, anchorPoint.y - 180);
  
  // close game button
  if (dist(mouseX, mouseY, anchorPoint.x + 180, anchorPoint.y - 180) <= 10) {
    cursor(HAND);

    if (mouseIsPressed) {
      showGameWindow = false;
      isGameStarted = false;
      showDesktop = true;
    }
  } else cursor(ARROW);
  
  // start game text
  if (isGameStarted) {
    startGame();
  } else {
    text(`Pressione um tecla para iniciar o joguinho\n\nHigh Score: ${highScore}`, anchorPoint.x, anchorPoint.y);
  }
}

function keyPressed() {
  if (showGameWindow) {
    isGameStarted = true;
  }
}

const startGame = () => {
  fill(bgColor);
  rectMode(CENTER);
  let leftPad = {
    x: anchorPoint.x - 150,
    y: mouseY,
  }
  let rightPad = {
    x: anchorPoint.x + 150,
    y: mouseY,
  }
  rect(leftPad.x, mouseY, 20, 50, 5);
  rect(rightPad.x, mouseY, 20, 50, 5);
  
  // pads treshold
  
  // ball movement
  if (ball.direction === 'right') {
    // adds the score amount to the ball 'acceleration'
    ball.x = ball.x + score;
    
    // increments heightModifier value based on direction
    if (heightModifier.direction === 'up') {
      ball.y = ball.y - score;
    } else if (heightModifier.direction === 'down') {
      ball.y = ball.y + score;
    } else ball.y = ball.y;
    
    // if ball touches the pad goes to opposite direction, accelerates and player scores
    if (dist(ball.x, ball.y, rightPad.x, rightPad.y) < 25) {
      ball.direction = 'left';
      score++;
      
      // changes ball height based on where it touches on the pad
      if (ball.y > rightPad.y) {
          heightModifier.direction = 'down';
        } else if (ball.y < rightPad.y) {
          heightModifier.direction = 'up';
        } else heightModifier.direction = 'neutral';
    }
  } 
  
  if (ball.direction === 'left') {
    ball.x = ball.x - score;
    
    // increments heightModifier value based on direction
    if (heightModifier.direction === 'up') {
      ball.y = ball.y - score;
    } else if (heightModifier.direction === 'down') {
      ball.y = ball.y + score;
    } else ball.y = ball.y;
        
    // if ball touches the pad goes to opposite direction, accelerates and player scores
    if (dist(ball.x, ball.y, leftPad.x, leftPad.y) < 25) {
      ball.direction = 'right';
      score++;
      
      // changes ball height based on where it touches on the pad
      if (ball.y > leftPad.y) {
          heightModifier.direction = 'down';
        } else if (ball.y < leftPad.y) {
          heightModifier.direction = 'up';
        } else heightModifier.direction = 'neutral';
    }
  }
  
  // if ball touches vertical edge, game is reset
  if (ball.x > 385 || ball.x < 15) {
    isGameStarted = false;
    ball.x = 200;
    ball.y = 200;
    if (score > highScore) {
      highScore = score;
    }
    score = 1;
    ball.direction = 'right';
    heightModifier.direction = 'neutral';
  }
  
  // if ball touches horizontal edge, changes vertical orientation
  if (ball.y > 380) heightModifier.direction = 'up';
  if (ball.y < 20) heightModifier.direction = 'down';
  
  // draw ball
  noStroke();
  circle (ball.x, ball.y, 20);
  text (`x: ${ball.x} y: ${ball.y}`, ball.x, ball.y + 20);
  text (`${heightModifier.direction}`, ball.x, ball.y + 40);
  
  // score on top left corner
  text (`Score: ${score - 1}`, anchorPoint.x, anchorPoint.y - 150);
}
