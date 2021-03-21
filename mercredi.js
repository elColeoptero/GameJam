var LONG = 900;
var LARG = 400;
var valid = false;
var test = 0;
let img;
let compt = 0;
let faux = 0;

function setup(){
	let myCanvas = createCanvas(LONG,LARG);	//créer le canvas
	myCanvas.parent("canva");	//sélectionner la div où sera le jeu
	frameRate(60);		//définition du nombre de FPS
	noStroke();
	textFont("Comic Sans MS");

	inp = createInput('');
  inp.input(myInputEvent);
	inp.position(300, 300);
	background(128);
  image(img, 900, 400);
	
}
function preload(){
  img = loadImage('/Assets/Mercredi/900x400/Enigme.png', réussite, echec);
  
}

function keyPressed() {
	switch(keyCode){
		case 13:	valid = true;	break;
	}
}

function myInputEvent(){
	console.log("salut");

}


function echec(){
	background(255);
	textAlign(LEFT,BASELINE);
  text("echec", 300, 200);

}

function draw(){
  frameRate(60);
	background(0);
	textAlign(LEFT,BASELINE);
  image(img,0,0,900,400);
  fill("red"); 
  text(keyCode, 160, 110);
  text(test, 160, 330);

  //vérification de la réponse:
  if (test == 4){
    text("DEFAITE!!!", 300, 220);
    exit();
  }

  if (compt == 120){
    compt = 0;
    faux = 0;
  }

  if (faux == 1){//mauvaise réponse
    compt++;
    text("mauvaise réponse, penses mieux!", 600, 220);

  }

  if (valid == true && faux == 0){
    if (inp.value() == "0%"){//bonne réponse
      text("VICTOIRE!!!", 300, 220);
      exit();
    }else{
      test++;
      faux = 1;
      
    }
    valid = false;
  }
    

}