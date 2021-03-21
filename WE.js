var WE = function (p) {
    var touche = 0;
    var tic = 0;
    var secondes = 0;
    var compt = 0;
    var ref = 300;
    var frame =0



    p.setup = function(){
        let cnv = p.createCanvas(900, 400)
        let x = (p.windowWidth - p.width) / 2;
        let y = (p.windowHeight - p.height) / 2;
        cnv.position(x, y);
        //chrono.parent("canva");
        p.frameRate(60);
        p.smooth();
        p.strokeWeight(3);
        explode_animation.frameDelay = 10; // la rapidité
        p.textFont("Comic Sans MS");
        p.animation(explode_animation, 900, 400);
    }

    p.preload = function(){
        //charger images et son pour le mini jeu
        explode_animation = p.loadAnimation('Assets/WE/900x400/Vacancelle1.png' );
        explode_animation2 = p.loadAnimation('Assets/WE/900x400/Vacancelle2.png' );
        background = explode_animation;
    }

    p.keyPressed = function(){
        touche = 1;

    }
    p.annim = function()  {
        frame++;
        if (frame  %30 == 0) {
            if (frame==60){
                frame = 0
                background = explode_animation
            }
            else {
                background = explode_animation2
            }

        }

    }

    p.draw = function(){
        p.annim();
        p.frameRate(60);
        // Set the background color
        p.background(0);
        p.animation(background, 450, 200);



        // incrémente de 1 tout les 60éme de secondes
        tic++;

        // on calcul le temps ens secondes correspondant
        secondes = p.floor(tic / 60);

        // Set the font size
        p.textSize(16);

        // Set the font color
        p.fill(p.color('red'));
        if (touche == 0) {
            // affichage chrono:
            let temps = ref - secondes;
            let min = p.floor(temps / 60);
            let sec = temps % 60;
            p.text("0" + min + ":" + sec, 25, 35);
        }
        if (touche == 1) {
            //touche = 0;
            p.text("ON A DIT TU FAIS RIEN BATARD!", 300, 200);
            compt++;
            tic = 0;
            if (compt == 300) {
                touche = 0;
                compt = 0;
            }
        }
        if (tic == 1800) {
            p.text("bon ok c'est chiant, vas y, fuis!", 300, 300);

        }

    }
}