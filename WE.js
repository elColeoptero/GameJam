var touche = 0;
var tic = 0;
var secondes = 0;
var compt = 0;
var ref = 300;



function setup(){
  let chrono = createCanvas(900, 400)
	chrono.parent("canva");	//sélectionner la div où sera le jeu
  frameRate(60);
  smooth();
  strokeWeight(3);
  explode_animation.frameDelay = 10; // la rapidité
	textFont("Comic Sans MS");  
	background(128);
}

function preload(){
  //charger images et son pour le mini jeu
  let explode_sprite_sheet = loadSpriteSheet('/Assets/WE/900x400/Vacancelle1.png', Xsize, Ysize, 60);
  explode_animation = loadAnimation(explode_sprite_sheet);
}

function keyPressed() {
  touche = 1;
  
}

function draw(){
    frameRate(60);
    // Set the background color 
    background(220); 
    animation(explode_animation, 450, 200);
    
    strokeWeight(4);
    fill(55, 37, 84, 0);
    rect(10, 10, 80, 40);
      
  
    // incrémente de 1 tout les 60éme de secondes
    tic++;
  
    // on calcul le temps ens secondes correspondant
    secondes = floor(tic/60);
      
    // Set the font size 
    textSize(16); 
      
    // Set the font color 
    fill(color('red')); 
    if (touche == 0){
      // affichage chrono:
      let temps = ref - secondes;
      let min = floor(temps/60);
      let sec = temps%60;
      text("0"+min+":"+sec, 25, 35); 
    }
    if (touche == 1){
      //touche = 0;
      text("ON A DIT TU FAIS RIEN BATARD!", 300, 200);
      compt++;
      tic = 0;
      if (compt == 300)
        {
          touche = 0;
          compt=0;
        }
    }
    
}
