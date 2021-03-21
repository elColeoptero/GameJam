var pricipale = function( p ) {
    let explode_sprite_sheet;
    let explode_animation;
    let canvaWidth = 900;
    let canvaHeight = 400
    let rectWidth = 128;
    let rectHeight = 190 - 18;
    let x = canvaWidth / 2;
    let y = canvaHeight - rectHeight;
    let step = 10;
    let sens = true
    let object1 = [];
    let objectWidth = 10;
    let objectHeight = 15;
    let img;
    let indice = 0;
    let score = 0;
    let ingredient = [];
    let rat_anim;
    let explode_sprite_sheet_rat;
    let background;
    let shadow;
    let ingerdient_demande = 4;
    let objectif = 1000;
    let stop = false;
    let lundi1, lundi2,mardi1,mardi2;
    let frame = 0;
    let jour =0;
    let semaine = [];
    let ig2i;let click=false;
    p.preload = function(){
        let prefix = "Assets/Menu/900x400";
        let lundi = [p.loadImage(prefix + "/Lundi/MainScreenLundi_1.png"),p.loadImage(prefix + "/Lundi/MainScreenLundi_2.png")]
        let mardi = [p.loadImage(prefix + "/Mardi/MainScreenMardi_1.png"),p.loadImage(prefix + "/Mardi/MainScreenMardi_2.png")]
        let mercredi = [p.loadImage(prefix + "/Mercredi/MainScreenMercredi_1.png"),p.loadImage(prefix + "/Mercredi/MainScreenMercredi_2.png")]
        let jeudi = [p.loadImage(prefix + "/Jeudi/MainScreenJeudi_1.png"),p.loadImage(prefix + "/Jeudi/MainScreenJeudi_2.png")]
        let vendredi = [p.loadImage(prefix + "/Vendredi/MainScreenVendredi_1.png"),p.loadImage(prefix + "/Vendredi/MainScreenVendredi_2.png")]
        let we = [p.loadImage(prefix + "/WE/MainScreenWE_1.png"),p.loadImage(prefix + "/WE/MainScreenWE_2.png")]
        ig2i  = p.loadImage('Assets/Vendredi/900x400/Background.png');
        semaine.push(lundi);
        semaine.push(mardi);
        semaine.push(mercredi);
        semaine.push(jeudi);
        semaine.push(vendredi);

        semaine.push(we);
    }

    p.annim = function()  {
        frame++;
        if (frame  %30 == 0) {
            if (frame==60){
                frame = 0
                background = semaine[jour][0]
            }
            else {
                background = semaine[jour][1]
            }

        }
        if (jour ==4 && click){
            background = ig2i
        }

    }

    p.setup = function() {

        let cnv = p.createCanvas(canvaWidth, canvaHeight);
        let x = (p.windowWidth - p.width) / 2;
        let y = (p.windowHeight - p.height) / 2;
        cnv.position(x, y);
        background = semaine[jour][0];


    }

    p.draw = function() {
        p.annim();
        p.image(background, 0, 0);


    }

    p.mouseClicked = function() {
        if (p.mouseX > 710 && p.mouseX < 880 && p.mouseY > 180 && p.mouseY < 300) {


            if (jour==4){
                click=true;
                setTimeout(() => {
                    instance = new p5(class_list[jour], "c2");
                },2000)
            }
            else {
                instance = new p5(class_list[jour], "c2");
                if (jour==2){
                    p.nextDay("jeudi")
                }
            }

        }


    }
    p.getjour = function(){
        return jour;
    }

    p.nextDay = function (day){
        switch (day){
            case "mardi" : jour =1;break;
            case "mercredi" : jour =2;break;
            case "jeudi" : jour =3;break;
            case "vendredi" : jour =4;break;
            case "we" : jour =5;break;

        }
        instance.get
    }
}

var myp5 = new p5(pricipale, "c2");
var class_list = [burger,enigme,null,Trex,pong,WE];
var instance ;
