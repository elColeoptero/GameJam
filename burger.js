var burger = function( p ) {
    let explode_sprite_sheet;

    let explode_animation;
    let canvaWidth = 900;
    let canvaHeight = 700
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
    let stop = 0;


    p.preload =function () {
        let prefix = "Assets/Lundi/900X700/";
        explode_sprite_sheet = p.loadSpriteSheet('Assets/Lundi/900X700/Belin_Idle_Assiette.png', 128, 190, 4);
        explode_sprite_sheet_rat = p.loadSpriteSheet(prefix + 'Rat.png', 128, 128, 3);
        explode_animation = p.loadAnimation(prefix+"Belin_Idle_One_Frame.png");
        ingredient.push(p.loadAnimation(prefix + 'Steak.png'));
        ingredient.push(p.loadAnimation(prefix + 'Salade.png'));
        ingredient.push(p.loadAnimation(prefix + 'Cheddar.png'));
        ingredient.push(p.loadAnimation(prefix + 'PainDessus.png'));
        ingredient.push(p.loadAnimation(prefix + 'PainDessous.png'));
        ingredient.push(p.loadAnimation(prefix + 'Eponge.png'));
        ingredient.push(p.loadAnimation(prefix + 'Isabelle.png'));
        ingredient.push(p.loadAnimation(prefix+"Rat_Idle_One_Frame.png"));
        background = p.loadImage(prefix + "Background.png");
        shadow = p.loadImage(prefix + "Item_Shadow.png")


    }

    p.setup =function () {

        let cnv = p.createCanvas(canvaWidth, canvaHeight);
        let x = (p.windowWidth - p.width) / 2;
        let y = (p.windowHeight - p.height) / 2;
        cnv.position(x, y);

        explode_animation.frameDelay = 10;
        ingredient[7].frameDelay = 30;
        stop=0;

        p.GenerateObject(20);

    }

    p.getRandomInt =function (max){
        return Math.floor(Math.random() * Math.floor(max));
    }

    p.GenerateObject =function(i) {
        for (let j = 0; j < i; j++) {
            let a = [p.getRandomInt(700 - 128) + 64, -128 * j, true, p.getRandomInt(8)];
            //let a = [100,-128*j,true,getRandomInt(8)];
            object1.push(a);
        }
    }

    p.AddgenerateObject =function (i) {
        last_y = object1[object1.length - 1][1] - 128
        for (let j = 0; j < i; j++) {
            let a = [p.getRandomInt(700 - 128) + 64, -128 * j + last_y, true, p.getRandomInt(8)];
            //let a = [100,-128*j,true,getRandomInt(8)];
            object1.push(a);
        }
    }

    p.draw = function()  {
        p.image(background, 0, 0);
        if (p.keyIsDown(p.LEFT_ARROW)) {
            if (x >= step) {
                x -= step;
            }
            sens = false;
        } else if (p.keyIsDown(p.RIGHT_ARROW)) {
            if (x <= canvaWidth - rectWidth - step) {
                x += step;
            }
            sens = true;
        }
        if (stop == 1) {
            p.animation(explode_animation, canvaWidth / 2 - 64, y + 95 - 18 - 140);
            p.textSize(100);
            p.textAlign(p.CENTER, p.CENTER);
            p.text("WIN", 410, 300);
        } else {
            let c = p.color('blue');
            p.fill(c);
            p.noStroke();
            //rect(x, y-140, rectWidth, rectHeight);
            p.animation(explode_animation, x + 64, y + 95 - 18 - 140);


            c = p.color('black');
            p.fill(c);
            p.noStroke();
            let borne_inf = indice - 20;
            if (borne_inf < 0) {
                borne_inf = 0
            }
            console.log(20 + Math.trunc(indice / 15) * 15, object1.length)
            for (let i = borne_inf; i < 20 + Math.trunc(indice / 15) * 15; i++) {
                if (object1[i][2]) {

                    //rect(object1[i][0],object1[i][1], objectWidth, objectHeight);
                    if (object1[i][1] > 0) {
                        if (object1[i][0] >= x + 11 && object1[i][0] <= x + rectWidth - 11 && object1[i][1] < 566 - objectHeight - 140) {
                            p.image(shadow, object1[i][0] - 64, canvaHeight - 135 - 140 - 104)

                        } else {
                            p.image(shadow, object1[i][0] - 64, 470)
                        }
                    }
                    p.animation(ingredient[object1[i][3]], object1[i][0], object1[i][1] - 49)
                    object1[i][1] += 5;
                    if (object1[i][1] > 470 + 108) {
                        object1[i][2] = false;
                    }
                }
            }

            if (object1[indice][1] >= 566 - objectHeight - 140) {

                if (object1[indice][0] >= x && object1[indice][0] <= x + rectWidth) {

                    object1[indice][2] = false;
                    if (object1[indice][3] == ingerdient_demande) {
                        score += 100;
                        if (score < objectif) {
                            if (objectif - score <= 100)
                                ingerdient_demande = 3
                            else
                                ingerdient_demande = p.getRandomInt(3);
                        } else {
                            stop = 1;
                        }

                    } else {
                        if (object1[indice][3] == 5 || object1[indice][3] == 7) {
                            score -= 50;
                        } else if (object1[indice][3] == 6) {
                            score = 0;
                        } else {
                            score -= 10;
                        }
                        if (score <= 0) {
                            score = 0
                            ingerdient_demande = 4
                        } else if (objectif - score > 100 && ingerdient_demande == 3)
                            ingerdient_demande = p.getRandomInt(3);
                    }
                }
                indice++;
                if (indice % 15 == 0) {
                    p.AddgenerateObject(15);
                }
            }

            p.textSize(32);
            p.text(score + " (Objectif = " + objectif + " )", 10, 30);


            c = p.color('red');
            p.fill(c);
            p.noStroke();
            //rect(0,canvaHeight-135-140, canvaWidth, 2);

            p.strokeWeight(4);
            p.stroke(255, 204, 100);
            p.fill(255, 255, 255, 100);
            p.rect(900 - 128 - 10, 10, 128, 70);
            p.animation(ingredient[ingerdient_demande], 900 - 128 - 10 + 64, 13, 10, 10)
        }
        if (stop==2)
            p.clear();
    }
    p.keyPressed = function(){
        if(stop && myp5.getjour()==0){
            myp5.nextDay("mardi")
            instance.noLoop();
            instance.clear();
            stop=2;

        }

    }
};