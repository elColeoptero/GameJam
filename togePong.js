/**
 * requires p5.js
 * try out at https://editor.p5js.org
 */
var pong=function (p) {


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
    let playing = true
    let callback = false;
    let ball = {
        x: 300,
        y: 150,
        radius: 10,
        speed: {
            x: 20,
            y: 0
        },
        draw: function () {
            if (n == 1) {
                p.image(balledm, this.x, this.y, this.radius * 2, this.radius * 2);
                n = 0;
            } else {
                p.image(balletp, this.x, this.y, this.radius * 2, this.radius * 2);
                n++;
            }


        },
        reset: function () {
            this.x = p.width / 2;
            this.y = p.height / 2;
            this.speed.x = 10;
            this.speed.y = 0;
            this.play = true;
        }
    };

    let player1 = {
        x: 100,
        y: 150,
        radius: 60,
        reset: function () {
            this.y = p.height / 2;
        },
        position: function (y) {
            this.y = p.min(p.height, p.max(y, 0));
        },
        draw: function () {
            //line(this.x, this.y - this.radius, this.x, this.y + this.radius);
            p.animation(belin, this.x - 44 - 32, this.y - this.radius + 64);
            //play();
        }
    }

    let player2 = {
        x: 800 - 152,
        y: 150,
        radius: 60,
        reset: function () {
            this.y = p.height / 2;
        },
        position: function (y) {
            this.y = p.min(p.height, p.max(y, 0));
        },
        draw: function () {
            //line(this.x, this.y - this.radius, this.x, this.y + this.radius);
            p.animation(train, this.x + 120 + 32, this.y - this.radius);
            //play();
        }
    }

    p.setup = function(){
        cnv = p.createCanvas(900, 400);
        let x = (p.windowWidth - p.width) / 2;
        let y = (p.windowHeight - p.height) / 2;
        cnv.position(x, y);
        p.stroke(255);
        p.fill(0);

        game.reset();
        //animation(belin, 142, 64);
        //animation(train, 320, 96);
        p.image(balledm, 10, 10);
        p.image(balletp, 10, 10);
        p.image(fond, 900, 400);
    }

    p.preload = function(){
        //une seule image pour les 2 sprites des players, loadanimation correspond pas
        //exp1 = loadSpriteSheet('Assets/Vendredi/900x400/Belin_Walking_Shadow.png', 192, 128, 2);
        belin = p.loadAnimation('Assets/Vendredi/900x400/Belin_Walking_Shadow_2.png');
        //exp2 = loadSpriteSheet('Assets/Vendredi/900x400/Togetrain_Shadow.png', 320, 192, 2);
        train = p.loadAnimation('Assets/Vendredi/900x400/Togetrain_Shadow_1.png');

        balledm = p.loadImage('assets/Vendredi/900x400/BalleDM.png');
        balletp =p.loadImage('assets/Vendredi/900x400/BalleTP.png');
        fond = p.loadImage('assets/Vendredi/900x400/Background_Uni.png');
        fondWin = p.loadImage('assets/Vendredi/900x400/Background_Uni_Victoire.png');
        fondLoose = p.loadImage('assets/Vendredi/900x400/Background_Uni_Defaite.png');
        //load des sons
        bonus = p.loadSound("Sons/Vendredi/Point_Gagne.wav");
        malus = p.loadSound("Sons/Vendredi/Point_Perdu.wav");
        victoire = p.loadSound("Sons/Vendredi/Win.wav");
        musique = p.loadSound("Sons/Vendredi/Son_Combat.mp3");
        rebond = p.loadSound("Sons/Vendredi/Ball.wav");
    }

    let game = {
        over: false,
        reset: function () {
            this.over = false;
            ball.reset();
            player1.reset();
            player2.reset();
        },
        tick: function () {
            if (this.over === false) {
                // y: keep ball inside of vertical bounds
                if (ball.y < 10 || ball.y > p.height - 10) {
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
                        ball.speed.x = -2 * p.map(p.abs(angle), 0, player2.radius, 3, 9);
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
                        ball.speed.x = 2 * p.map(p.abs(angle), 0, player1.radius, 3, 9);

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

    p.draw = function(){
        p.frameRate(60);

        if (game.over === false) {
            p.background(0);
        } else {
            p.background(255, 0, 0);
        }p.image(fond, 0, 0);

        if (playing) {
            p.image(fond, 0, 0);
            p.textSize(45)
            p.text(score_belin + "  VS  " + score_train, 300, 300);

            player1.position(p.mouseY);
            player1.draw();

            if (stop == 0) {
                stop = p.random(1, 20);
            }

            if (stop == 15) {//arret aléatoire du train
                compt = 20;
                compt++;
                if (compt == 120) {
                    compt = 0;
                    stop = 0;
                }
            } else {
                stop = p.random(1, 20);
            }

            compt++;
            if (compt == 1) {
                player2.position(ball.y + stop - 10);
            }
            if (compt == 12) {
                compt = 0;
            }
            player2.draw();

            game.tick();
            if (score_train == 5) {
                console.log("FINI")
                fond = fondLoose;
                playing = false;
                setTimeout(() => {

                    myp5.nextDay("we");
                    callback = true;
                    instance.noLoop();
                    instance.clear(); }, 2000);

            }
            if (score_belin == 2) {
                victoire.play();
                fond = fondWin;
                playing = false;
                setTimeout(() => {

                    myp5.nextDay("we");
                    callback = true;
                    instance.noLoop();
                    instance.clear(); }, 2000);

            }

        }
       if (callback)instance.clear();
    }
}