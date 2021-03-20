/**
 * requires p5.js
 * try out at https://editor.p5js.org
 */

let score_belin = 0;
let score_train = 0;
let compt = 0;
let stop = 0;

let ball = {
  x: 300,
  y: 150,
  radius: 10,
  speed: {
    x: 20,
    y: 0
  },
  draw: function() {
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  },
  reset: function() {
    this.x = width / 2;
    this.y = height / 2;
    this.speed.x = 10;
    this.speed.y = 0;
    this.play = true;
  }
};

let player1 = {
  x: 100,
  y: 150,
  radius: 30,
  reset: function() {
    this.y = height / 2;
  },
  position: function(y) {
    this.y = min(height, max(y, 0));
  },
  draw: function() {
    line(this.x, this.y - this.radius, this.x, this.y + this.radius);
  }
}

let player2 = {
  x: 800,
  y: 150,
  radius: 30,
  reset: function() {
    this.y = height / 2;
  },
  position: function(y) {
    this.y = min(height, max(y, 0));
  },
  draw: function() {
    line(this.x, this.y - this.radius, this.x, this.y + this.radius);
  }
}

function setup() {
  createCanvas(900, 400);
  stroke(255);
  fill(255);

  game.reset();
}

let game = {
  over: false,
  reset: function() {
    this.over = false;
    ball.reset();
    player1.reset();
    player2.reset();
  },
  tick: function() {
    if( this.over === false ){
      // y: keep ball inside of vertical bounds
      if (ball.y < 10 || ball.y > height - 10) {
        ball.speed.y *= -1;
      }
      ball.y += ball.speed.y;

      // x: player 2
      if (ball.x + ball.radius >= player2.x) {
        if (ball.y > player2.y - player2.radius &&
            ball.y < player2.y + player2.radius) {
          // player 1 hits the ball

          // bounce back
          ball.speed.x *= -1;
          // get ball-paddle angle
          let angle = ball.y - player2.y;
          ball.speed.y = angle / 9;
          ball.speed.x = -2*map(abs(angle), 0, player2.radius, 3, 9);

        } else {
          // player misses the ball
          this.over = true;
          score_belin++;
        }
      }
      
      // x: player 1
      if (ball.x - ball.radius <= player1.x) {
        if (ball.y > player1.y - player1.radius &&
            ball.y < player1.y + player1.radius) {
          // player 1 hits the ball

          // bounce back
          ball.speed.x *= -1;
          // get ball-paddle angle
          let angle = ball.y - player1.y;
          ball.speed.y = angle / 9;
          ball.speed.x = 2*map(abs(angle), 0, player1.radius, 3, 9);

        } else {
          // player misses the ball
          this.over = true;
          score_train++;
        }
      }
    }
    if (ball.x < -100 || ball.x > 1000) {
      game.reset();
    }    
    ball.x += ball.speed.x;

    ball.draw();
  }

};

function draw() {
  frameRate(60);
  if(game.over === false){
    background(0);
  } else {
    background(255,0,0);
  }
    text(score_belin + "  VS  " + score_train, 300, 300);
  
  player1.position(mouseY);
  player1.draw();
  
  if (stop == 0){
    stop = random(1,20);
  }
  
  if (stop == 15){//arret aléatoire du train
    compt = 20;
    compt++;
    if (compt == 60){
      compt = 0;
      stop=0;
    }
  }else{
    stop = random(1,20);
  }
  
  compt++;
  if (compt == 1){
    player2.position(ball.y+stop-10);
  }
  if (compt == 12){
    compt = 0;
  }
  player2.draw();

  game.tick();
  if (score_train == 5){
    background(0);
    text("DEFAITE, peut être que jeter des DM sur le train n'est pas la solution...", 300, 200);
    exit();
  }
  if (score_belin == 10) {
    background(0);
    text("VICTOIRE, apparament taper sur le train à coup de DMs était bien la bonne solution!", 300, 200);
    exit();
  }
}