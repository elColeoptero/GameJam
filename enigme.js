var enigme = function( p ) {
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
  let alerte = 0;

  p.setup = function() {
    let cnv = p.createCanvas(LONG, LARG);
    let x = (p.windowWidth - p.width) / 2;
    let y = (p.windowHeight - p.height) / 2;
    cnv.position(x, y);
    //myCanvas.parent("canva");	//sélectionner la div où sera le jeu
    p.frameRate(60);		//définition du nombre de FPS
    p.noStroke();
    p.textFont("Comic Sans MS");

    inp = p.createInput('');
    inp.input(p.myInputEvent);
    inp.position(300+(p.windowWidth - p.width)/2, 300+(p.windowHeight - p.height)/2);
    p.background(128);
    begin.play();
    ost.play();

  }

  p.preload = function() {
    fond = p.loadImage('Assets/Mercredi/900x400/Enigme_Avec_Texte.png');
    reso_1 = p.loadImage('Assets/Mercredi/900x400/Reso_1.png');
    reso_2 = p.loadImage('Assets/Mercredi/900x400/Reso_2.png');
    reso_3l = p.loadImage('assets/Mercredi/900x400/Reso_3_Loose.png');
    reso_3w = p.loadImage('Assets/Mercredi/900x400/Reso_3_Win.png');
    win = p.loadImage('Assets/Mercredi/900x400/Enigme_win.png');
    loose = p.loadImage('Assets/Mercredi/900x400/Enigme_loose.png');

    resolut = p.loadSound('Sons/Mercredi/Resolution_Enigme.wav');
    res_w = p.loadSound('Sons/Mercredi/Resolution_Enigme_Win.wav');
    res_l = p.loadSound('Sons/Mercredi/Resolution_Enigme_Loose.wav');
    ost = p.loadSound('Sons/Mercredi/OST_Enigme_professeur-layton-et-letrange-village-ost-05-puzzle.mp3');
    begin = p.loadSound('Sons/Mercredi/Entree_Enigme.wav');
  }

  p.keyPressed =function() {
    switch (p.keyCode) {
      case 13:
        valid = true;
        break;
    }
  }

  p.myInputEvent = function() {
    console.log("salut");

  }

  p.draw = function () {
    p.frameRate(60);
    p.background(0);
    p.textAlign(p.LEFT, p.BASELINE);
    p.image(fond, 0, 0, 900, 400);
    p.fill("red");


    if (alerte == 1) {
      resolut.play();
    }


    if (valid == true) {
      alerte++;
      compt++;
      if (compt < 240) {
        p.image(reso_1, 100, 150);
        compt++;
      }
      if (compt >= 240 && compt < 480) {
        p.image(reso_2, 50, 125);
        compt++;
      }
      if (compt >= 480 && compt < 720 && (inp.value() == "0%" || inp.value() == 0)) {//bonne réponse
        inp.remove();
        p.image(reso_3w, 0, 0);
        res_w.play();
        compt++;
      }
      if (compt >= 480 && compt < 720 && inp.value() != "0%") {//mauvaise réponse
        p.image(reso_3l, 0, 0);
        res_l.play();
        compt++;
        faux = 1;
      }
      if (compt >= 720 && faux == 0) {
        p.image(win, 0, 0);
        ost.stop(0);
        setTimeout(() => {

          myp5.nextDay("mercredi");
          instance.noLoop();
          instance.clear(); }, 3000);


      }
      if (compt >= 720 && faux == 1) {
        p.image(loose, 0, 0);
        compt = 0;
        valid = false;
        faux = 0
      }
      if (compt == 960) {
        compt = 0;
        test++;
        valid = false;
        alerte = 0;
      }
    }
  }
}
