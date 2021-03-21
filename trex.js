var Trex = function( p ) {
    var PLAY = 1;
    var END = 0;
    var gameState = PLAY;

    var trex, trex_running, trex_collided;
    var ground, invisibleGround, groundImage;

    var cloudsGroup, cloudImage;
    var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, pomme;
    var appleGroup;
    var bgcolor = 180;

    var score;
    var gameOverImg, restartImg,startImg
    var jumpSound, checkPointSound, dieSound

    var STOP =0

    p.preload = function() {

        let prefix = "Assets/T-Rex/900x400/"
        //trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
        trex_collided = p.loadAnimation(prefix + "Belin_KO.png");
        let a = prefix + "Belin_TREX_Walking_1.png"
        let b = prefix + "Belin_TREX_Walking_2.png"
        trex_running = p.loadAnimation(a);
        groundImage = p.loadImage(prefix + "ground2.png");

        cloudImage = p.loadImage(prefix + "cloud.png");

        obstacle1 = p.loadImage(prefix + "obstacle1.png");
        obstacle2 = p.loadImage(prefix + "obstacle2.png");
        obstacle3 = p.loadImage(prefix + "obstacle3.png");


        pomme = p.loadImage(prefix + "Pomme.png")
        restartImg = p.loadImage(prefix + "restart.png")
        startImg = p.loadImage(prefix + "start.png")
        gameOverImg = p.loadImage(prefix + "gameOver.png")

        jumpSound = p.loadSound("Sons/T-Rex/jump.mp3")
        dieSound = p.loadSound("Sons/T-Rex/die.mp3")
        checkPointSound = p.loadSound("Sons/T-Rex/checkPoint.mp3")
    }

    p.setup= function() {
        let cnv = p.createCanvas(700+200, 400);
        let x = (p.windowWidth - p.width) / 2;
        let y = (p.windowHeight - p.height) / 2;
        cnv.position(x, y);


        trex = p.createSprite(50, 160, 128, 128);
        trex.addAnimation("running", trex_running);
        trex.addAnimation("collided", trex_collided);


        trex.scale = 0.5;

        ground = p.createSprite(200, 180 + 200, 400, 20);
        ground.addImage("ground", groundImage);
        ground.x = ground.width / 2;

        gameOver = p.createSprite(300 + 50+100, 100 + 100);
        gameOver.addImage(gameOverImg);

        restart = p.createSprite(300 + 50+100, 140 + 100);
        restart.addImage(restartImg);


        start = p.createSprite(300 + 50+100, 140 + 100+50);
        start.addImage(startImg);

        gameOver.scale = 0.5;
        restart.scale = 0.5;
        start.scale = 0.5;
        invisibleGround = p.createSprite(200, 190 + 200, 400, 10);
        invisibleGround.visible = false;

        //create Obstacle and Cloud Groups
        obstaclesGroup = p.createGroup();
        cloudsGroup = p.createGroup();
        appleGroup = p.createGroup();

        trex.setCollider("rectangle", 0, 0, trex.width, trex.height);


        score = 0;

    }

    p.draw = function() {

        p.background(bgcolor);
        //displaying score
        p.text("Score: " + score, 500 + 100, 50);


        if (gameState === PLAY) {
            gameOver.visible = false;
            restart.visible = false;
            start.visible = false;

            ground.velocityX = -(4 + 3 * score / 100)
            //scoring
            score = score + Math.round(p.getFrameRate() / 60);

            if (score > 0 && score % 250 === 0) {
                checkPointSound.play()
                bgcolor = 180;
            }

            if (score > 0 && score % 350 === 0) {
                bgcolor = 180;

            }

            if (ground.x < 0) {
                ground.x = ground.width / 2;
            }


            //add gravity
            trex.velocityY = trex.velocityY + 0.8

            //spawn the clouds
            p.spawnClouds();

            //spawn obstacles on the ground
            p.spawnObstacles();
            p.spawnApple();

            if (obstaclesGroup.isTouching(trex)) {
                //trex.velocityY = -12;
                jumpSound.play();
                gameState = END;
                dieSound.play()

            }
            appleGroup.overlap(trex, p.explosion);

        } else if (gameState === END) {
            gameOver.visible = true;
            restart.visible = true;
            start.visible = true;
            //change the trex animation
            trex.changeAnimation("collided", trex_collided);


            ground.velocityX = 0;
            trex.velocityY = 0

            if (p.mousePressedOver(restart) || p.keyDown("space")) {
                p.reset();
            }
            if (p.mousePressedOver(start) ) {
                myp5.nextDay("vendredi")
                instance.noLoop();

                instance.clear();
                STOP=1;
            }


            //set lifetime of the game objects so that they are never destroyed
            obstaclesGroup.setLifetimeEach(-1);
            cloudsGroup.setLifetimeEach(-1);
            appleGroup.setLifetimeEach(-1);


            obstaclesGroup.setVelocityXEach(0);
            cloudsGroup.setVelocityXEach(0);
            appleGroup.setVelocityXEach(0);
        }


        //stop trex from falling down
        trex.collide(invisibleGround);


        p.drawSprites();
        if (STOP ==1)p.clear();
    }


    p.explosion = function(spriteA, spriteB) {
        spriteA.remove();
        checkPointSound.play()
        score += 100

    }

    p.reset = function() {
        gameState = PLAY;
        obstaclesGroup.destroyEach();
        cloudsGroup.destroyEach();
        appleGroup.destroyEach();
        score = 0;
        trex.changeAnimation("running", trex_running);

    }


    p.spawnObstacles = function() {
        if (p.frameCount % 60 === 30) {
            var obstacle = p.createSprite(600 + 300, 165 + 200, 10, 40);
            obstacle.velocityX = -(6 + score / 100);

            //generate random obstacles
            var rand = Math.round(p.random(1, 3));
            switch (rand) {
                case 1:
                    obstacle.addImage(obstacle1);
                    break;
                case 2:
                    obstacle.addImage(obstacle2);
                    break;
                case 3:
                    obstacle.addImage(obstacle3);
                    break;
                default:
                    break;
            }

            //assign scale and lifetime to the obstacle
            obstacle.scale = 0.5;
            obstacle.lifetime = 300;

            //add each obstacle to the group
            obstaclesGroup.add(obstacle);
        }
    }

    p.spawnApple = function() {
        if (p.frameCount % 60 === 0) {
            var rand = Math.round(p.random(0, 3));
            if (rand == 0) {
                var obstacle = p.createSprite(600 + 300, 165 + 200 - 10, 10, 40);
                obstacle.velocityX = -(6 + score / 100);

                obstacle.addImage(pomme);
                //generate random obstacles


                //assign scale and lifetime to the obstacle
                obstacle.scale = 0.5;
                obstacle.lifetime = 300;
                appleGroup.add(obstacle);

                //add each obstacle to the group
            }
        }
    }

    p.spawnClouds = function() {
        //write code here to spawn the clouds
        if (p.frameCount % 60 === 0) {
            var cloud = p.createSprite(600 + 300, 120 + 200, 40, 10);
            cloud.y = Math.round(p.random(80, 120 + 200));
            cloud.addImage(cloudImage);
            cloud.scale = 0.5;
            cloud.velocityX = -3;

            //assign lifetime to the variable
            cloud.lifetime = 200;

            //adjust the depth
            cloud.depth = trex.depth;
            trex.depth = trex.depth + 1;

            //add each cloud to the group
            cloudsGroup.add(cloud);
        }
    }

    p.keyPressed = function() {
        if (p.key == ' ' && gameState === PLAY) {
            if (trex.y >= 152 + 200) {
                trex.velocityY = -12;
                jumpSound.play();
            }
        }
    }

}