/**
 * requires p5.js
 * try out at https://editor.p5js.org
 */

let score_belin = 0;
let score_train = 0;
let compt = 0;
let stop = 0;
let n = 0;
var belin;
var train;
var balledm;
var balletp;
var fond;

let ball = {
  x: 300,
  y: 150,
  radius: 10,
  speed: {
    x: 20,
    y: 0
  },
  draw: function() {
    if (n == 1){
      image(balledm,this.x,this.y,this.radius * 2, this.radius * 2);
      n = 0;
    }else{
      image(balletp,this.x,this.y,this.radius * 2, this.radius * 2);
      n++;
    }
    
    
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
    //line(this.x, this.y - this.radius, this.x, this.y + this.radius);
    animation(belin, this.x, this.y - this.radius);
    play();
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
    //line(this.x, this.y - this.radius, this.x, this.y + this.radius);
    animation(belin, this.x, this.y - this.radius);
    play();
  }
}

function setup() {
  createCanvas(900, 400);
  stroke(255);
  fill(0);

  game.reset();
  //animation(belin, 142, 64);
  //animation(train, 320, 96);
  image(balledm, 10, 10);
  image(balletp, 10, 10);
  image(fond, 900, 400);
}

function preload(){
  //une seule image pour les 2 sprites des players, loadanimation correspond pas
  //belin = loadAnimation('/Assets/Vendredi/900x400/Belin_Walking_Shadow.png');
  //train = loadAnimation('/Assets/Vendredi/900x400/Togetrain_Shadow.png');

  balledm = loadImage('/assets/Vendredi/900x400/BalleDM.png');  
  balletp = loadImage('/assets/Vendredi/900x400/BalleTP.png');
  fond = loadImage('/assets/Vendredi/900x400/Background_with_borders.png');

  //load des sons
  bonus = loadSound("assets/sons/Point_Gagne.wav");
  malus = loadSound("assets/sons/Point_Perdu.wav");
  victoire = loadSound("assets/sons/Win.wav");
  musique = loadSound("assets/sons/Son_Combat.mp3");
  rebond = loadSound("assets/sons/Ball.wav");
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
        rebond.play();
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
          rebond.play();

        } else {
          // player misses the ball
          this.over = true;
          score_belin++;
          rebond.play();
          bonus.play();
          n++;
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
          rebond.play();
          malus.play();
          n++;
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
  image(fond, 900, 400);
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
  if (score_train == 10){
    background(0);
    text("DEFAITE, peut être que jeter des sujets sur le train n'est pas la solution...", 300, 200);
    exit();
  }
  if (score_belin == 5) {
    background(0);
    text("VICTOIRE, apparament taper sur le train à coup de sujets était bien la bonne solution!", 300, 200);
    victoire.play();
    exit();
  }
}