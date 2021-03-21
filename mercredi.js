var LONG = 900;
var LARG = 400;
var valid = false;
var test = 0;
var img;
var reso_1;
var reso_2;
var reso_3l;
var reso_3w;
var win;
var loose;
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
  image(fond, 900, 400);
  image(reso_1, 700, 300);
  image(reso_2, 800, 350);
  image(reso_3l, 900, 400);
  image(reso_3w, 900, 400);
  image(win, 900, 400);
  image(loose, 900, 400);
}

function preload(){
  fond = loadImage('/Assets/Mercredi/900x400/Enigme_Avec_Texte.png');
  reso_1 = loadImage('/Assets/Mercredi/900x400/Reso_1.png');
  reso_2 = loadImage('/Assets/Mercredi/900x400/Reso_2.png');
  reso_3l = loadImage('/Assets/Mercredi/900x400/Reso_3_Loose.png');
  reso_3w = loadImage('/Assets/Mercredi/900x400/Reso_3_Win.png');
  win = loadImage('/Assets/Mercredi/900x400/Enigme_win.png');
  loose = loadImage('/Assets/Mercredi/900x400/Enigme_loose.png');
  
}

function keyPressed() {
	switch(keyCode){
		case 13:	valid = true;	break;
	}
}

function myInputEvent(){
	console.log("salut");

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


  if (valid == true){
    compt++;
    if (compt < 240){
      image(reso_1, 100, 150);
      compt++;
    }
    if (compt >= 240 && compt < 480 ){
      image(reso_2, 50, 125);
      compt++;
    }
    if (compt >= 480 && compt < 720 && inp.value() == "0%"){//bonne réponse
      image(reso_3w, 0, 0);
      compt++;
    }
    if (compt >= 480 && compt < 720 && inp.value() != "0%"){//mauvaise réponse
      image(reso_3w, 0, 0);
      compt++;   
      faux = 1;
    }
    if (compt >= 720 && faux == 0){
      image(loose, 0, 0);
      compt = 0;
    }
    if (compt >= 720 && faux == 1){
      image(win, 0, 0);
      exit();
    }
    if (compt == 960){
      compt = 0;
      test++;
    }
    valid = false;
  }
    

}