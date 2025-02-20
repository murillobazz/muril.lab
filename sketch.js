// regular colors
// const mainColor = "#ffba0d";
// const bgColor = "#223631";

// suplab skin
const mainColor = "#ffffff";
const bgColor = "#000000";

const cardTxt = {
  x: window.innerWidth / 2 - 74,
  y: 120,
};
const gameExe = {
  x: window.innerWidth / 2 + 30,
  y: 120,
};
// define rectangle center
const centerPoint = {
  x: 37,
  y: 46,
};
let showLinkedin = false;
let anchorPoint = {
  x: window.innerWidth / 2,
  y: 240,
};
let businessCardCoordinates = {
  x: anchorPoint.x,
  y: anchorPoint.y,
}
let ball = {
  x: window.innerWidth / 2,
  y: 240,
  direction: 'right',
  acceleration: 1
}
// ball y modifier
let heightModifier = {
  direction: 'neutral'
};

// game score
let score = 0;
let highScore = 0;

let businessCard = false;
let showDesktop = true;
let showGameWindow = false;
let isGameStarted = false;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
  background(bgColor);

  // mouse coordinates
  noStroke();
  // fill("white");
  // textSize(10);
  // textAlign(LEFT);
  // text(`mouseX: ${mouseX} | mouseY: ${mouseY}`, 10, 30);

  textFont("Silkscreen");
  textSize(16);
  textAlign(CENTER);
  fill(mainColor);
  text("Muril_Lab", window.innerWidth / 2, 50);
  // resets the text size for all the next text elements
  textSize(12);

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
  // top-left fold
  line(x + 6, y + 10, x + 13, y + 4);
  line(x + 4, y + 22, x + 19, y + 22); //hor
  line(x + 22, y + 4, x + 22, y + 19); //vert

  // write card name
  noStroke();
  textAlign(CENTER);
  text(textToWrite, x + 37, y + 110);

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
  rect(businessCardCoordinates.x, businessCardCoordinates.y, 400, 200);

  // close card text
  fill(bgColor);
  text("x", businessCardCoordinates.x + 180, businessCardCoordinates.y - 80);

  // card title
  textSize(16);
  text(`murillo\ncreative developer`, businessCardCoordinates.x, businessCardCoordinates.y - 70);
  // card text 
  textSize(12);
  text(`Frontend developer with 4+ years of\nexperience working with js, currently\ntaking a postgraduate program\nin UX Design as well\n\n\nkeep creating`, businessCardCoordinates.x, businessCardCoordinates.y - 20);

  // enables card dragging
  if (dist(mouseX, mouseY, businessCardCoordinates.x, businessCardCoordinates.y) < 100) {
    cursor("grab");

    if (mouseIsPressed) {
      businessCardCoordinates.x = mouseX;
      businessCardCoordinates.y = mouseY;
    }
  } else if (dist(mouseX, mouseY, businessCardCoordinates.x + 180, businessCardCoordinates.y - 80) <= 10) {
     // close card button
    cursor(HAND);

    if (mouseIsPressed) {
      businessCard = false;
      businessCardCoordinates = {
        x: anchorPoint.x,
        y: anchorPoint.y,
      }
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
  textSize(10);
  text("x", anchorPoint.x + 180, anchorPoint.y - 180);
  
  // close game button
  if (dist(mouseX, mouseY, anchorPoint.x + 180, anchorPoint.y - 180) <= 10) {
    cursor(HAND);

    if (mouseIsPressed) {
      showGameWindow = false;
      isGameStarted = false;
      showDesktop = true;
      removeElements();
    }
  } else cursor(ARROW);
  
  // start game text
  if (isGameStarted) {
    startGame();
    removeElements();
  } else {
    textSize(16);
    text(`Pressione o botão do mouse para\niniciar o joguinho\n\nHigh Score: ${highScore}`, anchorPoint.x, anchorPoint.y - 30);
    if (highScore > 5) {
      textSize(10);
      text(`Desbloqueou o meu Linkedin! Parabéns!`, anchorPoint.x, anchorPoint.y + 100);
      if (showLinkedin) {
        let a = createA(
          'https://www.linkedin.com/in/murillobazilio/',
          `<p style="font-family: 'Helvetica', 'Arial', sans-serif; text-align:center; letter-spacing: 1px;">🎖️ linkedin do Murillo</p>`,
          '_blank'
        );
        a.position(anchorPoint.x - 87.74, anchorPoint.y + 120);
      }
      showLinkedin = false;
    } else {
      textSize(10);
      text(`Supere meu recorde de 5 pontos para\ndesbloquear uma recompensa especial`, anchorPoint.x, anchorPoint.y + 150);
    }
    textSize(10);
    text(`Left click to start game`, anchorPoint.x, anchorPoint.y - 150);
  }
}

// start game if mouse is clicked and game window is shown
function mouseClicked() {
  if (showGameWindow && !isGameStarted) {
    isGameStarted = true;
    // ball random start
    ball.y = round(random(anchorPoint.y - 100, anchorPoint.y + 100));
  }
}

const startGame = () => {
  fill(bgColor);
  rectMode(CENTER);
  let leftPad = {
    x: anchorPoint.x - 170,
    y: mouseY,
  }
  let rightPad = {
    x: anchorPoint.x + 170,
    y: mouseY,
  }
  rect(leftPad.x, mouseY, 20, 50, 5);
  rect(rightPad.x, mouseY, 20, 50, 5);
  
  // pads treshold

  // ball movement
  if (ball.direction === 'right') {
    // adds the score amount to the ball 'acceleration'
    ball.x = ball.x + ball.acceleration;
    
    // increments heightModifier value based on direction
    if (heightModifier.direction === 'up') {
      ball.y = ball.y - ball.acceleration;
    } else if (heightModifier.direction === 'down') {
      ball.y = ball.y + ball.acceleration;
    } else ball.y = ball.y;
    
    // if ball touches the pad goes to opposite direction, accelerates and player scores
    if (dist(ball.x, ball.y, rightPad.x, rightPad.y) < 20) {
      ball.direction = 'left';
      score++;
      if (ball.acceleration < 6) {
        ball.acceleration++;
      } else if (score > 30 && score < 90) {
        ball.acceleration++;
      }
      
      // changes ball height based on where it touches on the pad
      if (ball.y > rightPad.y) {
          heightModifier.direction = 'down';
        } else if (ball.y < rightPad.y) {
          heightModifier.direction = 'up';
        } else heightModifier.direction = 'neutral';
    }
  } 
  
  if (ball.direction === 'left') {
    ball.x = ball.x - ball.acceleration;
    
    // increments heightModifier value based on direction
    if (heightModifier.direction === 'up') {
      ball.y = ball.y - ball.acceleration;
    } else if (heightModifier.direction === 'down') {
      ball.y = ball.y + ball.acceleration;
    } else ball.y = ball.y;
        
    // if ball touches the pad goes to opposite direction, accelerates and player scores
    if (dist(ball.x, ball.y, leftPad.x, leftPad.y) < 20) {
      ball.direction = 'right';
      score++;
      if (ball.acceleration < 6) {
        ball.acceleration++;
      }
      
      // changes ball height based on where it touches on the pad
      if (ball.y > leftPad.y) {
          heightModifier.direction = 'down';
        } else if (ball.y < leftPad.y) {
          heightModifier.direction = 'up';
        } else heightModifier.direction = 'neutral';
    }
  }
  
  // if ball touches vertical edge, game is reset
  if (ball.x > anchorPoint.x + 185 || ball.x < anchorPoint.x - 185) {
    isGameStarted = false;
    ball.x = anchorPoint.x;
    ball.y = anchorPoint.y;
    if (score > highScore) {
      highScore = score;
    }
    if (highScore > 5) {
      showLinkedin = true;
    }
    score = 0;
    ball.acceleration = 1;
    ball.direction = 'right';
    heightModifier.direction = 'neutral';
  }
  
  // if ball touches horizontal edge, changes vertical orientation
  if (ball.y > anchorPoint.y + 180) heightModifier.direction = 'up';
  if (ball.y < anchorPoint.y - 180) heightModifier.direction = 'down';
  
  // draw ball
  noStroke();
  circle (ball.x, ball.y, 20);
  
  // score on top
  textSize(12);
  text (`Score: ${score}`, anchorPoint.x, anchorPoint.y - 150);
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
