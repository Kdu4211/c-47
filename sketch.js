
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
let nave, naveImg;
let asteroide, asteroideImg, asteroideImg2;
let parede1, parede2, parede3, parede4;
let score = 0;
let gameover = false;
let fase = 1;


var asteroides = [];

function preload(){
	naveImg = loadImage("img/nave.png");
	asteroideImg = loadImage("img/asteroide.png");
	asteroideImg2 = loadImage("img/asteroide.png");
}

function setup() {
	createCanvas(800, 700);


	engine = Engine.create();
	world = engine.world;

	nave = createSprite(350,500,20,20);
	nave.addImage(naveImg);
	nave.scale = 0.2;
	nave.setCollider("circle", 0, 0, 50);

	parede1 = createSprite(400,1,900,20);
	parede2 = createSprite(400,700,900,20);
	parede3 = createSprite(1,350,20,900);
	parede4 = createSprite(800,350,20,900);
	parede1.visible = false;
	parede2.visible = false;
	parede3.visible = false;
	parede4.visible = false;

	
	asteroide = createSprite(1000,20,20,20);
	asteroide.addImage(asteroideImg);
	asteroide.scale = 0.3;

	score = 0;

	Engine.run(engine);
  
}


function draw() {
  rectMode(CENTER);
  
  if (score % 10 === 0 && score > 0) {
    fase++;
    score++;
    changeBackground();
  }
  
  background(0);

  fill(255);
  textSize(20);
  text("Score: " + score, 20, 30);
  text("Fase " + fase, width - 100, 30);

  if (gameover) {
    fill(255, 0, 0);
    textSize(50);
    text("Game Over!", width / 2 - 150, height / 2);
  } else {
  
  nave.collide(parede1);
  nave.collide(parede2);
  nave.collide(parede3);
  nave.collide(parede4);

  moviment();

  destroyNave();

  drawMeteors() 
  createMeteor();
  moveMeteors();

  drawSprites();
}

function moviment(){
	if(keyDown(UP_ARROW)){
		nave.y -=10;
	}
	if(keyDown(DOWN_ARROW)){
		nave.y +=10;
	}
	if(keyDown(LEFT_ARROW)){
		nave.x -=10;
	}
	if(keyDown(RIGHT_ARROW)){
		nave.x +=10;
	}
}



function createMeteor() {
	if (frameCount % 60 === 0) {

	  let asteroide = createSprite(
		Math.random() * (width - 30),
		-30,
		30,
		30
	  );

	  asteroide.addImage(loadImage("img/asteroide.png"));
	  asteroide.scale = 0.3;

	  asteroide.speed = Math.random() * 3 + 1;

	  asteroides.push(asteroide);
	}
  }
  

  function moveMeteors() {
	for (let i = asteroides.length - 1; i >= 0; i--) {
	  let asteroide = asteroides[i];
	  asteroide.position.y += asteroide.speed;
  

	  if (asteroide.position.y > height) {
		asteroides.splice(i, 1);
		score++;
	  }

	  if (asteroide.collide(parede2)) {
		asteroide.remove();
		score++;
	  }

	}
  }
  

  function drawMeteors() {
	for (const asteroide of asteroides) {
	  drawSprite(asteroide);
	}
  }

  function destroyNave() {
	for (let i = asteroides.length - 1; i >= 0; i--) {
	  let asteroide = asteroides[i];
  

	  if (nave.collide(asteroide)) {

		console.log("Game Over!");

		resetGame();
	  }
	}
  }
  

  function resetGame() {

	nave.position.x = 350;
	nave.position.y = 500;
	score = 0;
	gameover = true;
	background(0);
	for (let i = asteroides.length - 1; i >= 0; i--) {
		asteroides[i].remove();
		asteroides.splice(i, 1);
	}
  }

  function changeBackground() {
	background(random(255), random(255), random(255));
  }
}
