let trombaIcon, tscuraIcon, tut1Icon, tut2Icon, logor,freccia; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s=0;//ellisse BONUS

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione

let n_trombetta = 0; //var piattaforma: quando alt!=1 viene incrementata
let n_interazione = 0; //var utente usa la trobetta, preme bottone
//se faccio ntrombetta/niterazione trovo la coordinazione

/////////////////////////////////////////////////////////////////////////

function preload() {
  trombaIcon = loadImage("./assets/immagini/trombettaBianca.png"); //trombetta chiara
  tscuraIcon = loadImage("./assets/immagini/tscura.png"); //trombetta chiara
  tut1Icon = loadImage("./assets/immagini/Trombetta_tut_1.png");//trombetta tutorial 1
  tut2Icon = loadImage("./assets/immagini/Trombetta_tut_2.gif");//trombetta tutorial 2
  logor = loadImage("./assets/immagini/logopiccolo.png");//logo ridotto
  freccia = loadImage("./assets/immagini/freccia.png");
}

/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta
}

/////////////////////////////////////////////////////////////////////////
function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

  w = width/2;
  h = height/8;

  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(16);
  fill('#877B85'); //4° colore PALETTE
  text('PARTITA COOD O1', w, height / 11);
  fill('#B7AEB5'); //3° PALETTE
  text('SQUADRA1-SQUADRA2', w, h);

  //logo a destra
  image(logor, width/11*9.8, height /9,logor.width/4.5,logor.height/4.5);
  //freccia
  image(freccia, width/11, height /9,freccia.width/6,freccia.height/6);

  //testo sotto
  textSize(14);
  text('COORDINAZIONE', w-30, h*6.5);
  text('BONUS', width/11+15, h*6.5);

  //BARRA
  fill('#D5D0D3'); //barre grige
  rectMode(CENTER);
  rect(w, h*7 ,width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  push();
  rectMode(CORNER);
  fill('#877B85');//barre viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w-width/7, h*7-7.5, xBarra ,15, 20);
  pop();

//pallini BONUS
  for(let i=0; i<6;i++){
    ellipse(width/11 + s , h*7 , 15);
    s =25*i;
    }



//BARRE DEL SUONO TROMBETTA
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++
  }
  //barrette lato sinistro
  for (var x = width / 6 * 1.5; x < width / 2.2; x += 40) {
    if (i % 2 != 0) { //quando i è dispari altezza deve diventare 1*random
      alt = 1 * random(2, 10);
      n_trombetta++;
    } else {
      alt = 1;
      n_trombetta = 0.1;
    }
    //liniette suono della trombetta
    noStroke();
    fill(135, 123, 133);
    rectMode(CENTER);
    rect(x, height / 2, 15, 15 * alt, 20);
    rect(x + width / 3.15, height / 2, 15, 15 * alt, 20);
  }

  //PERCENTUALE
    text(p_coord + '%',w+(width/28), h*6.5 ); //w, height / 5 * 4.5
    // console.log(' interazione ' + n_interazione);
    // console.log(' trombetta ' + n_trombetta);
  //PER LA BARRA DELLA PERCENTUALE
  //interazione utente, temporaneamente tasto ENTER
  if (alt != 1 & keyIsDown(ENTER)) {
    n_interazione += 4; // per far tornare la percentuale in pai alla trombetta
    p_coord = round((n_interazione / n_trombetta) * 100) * 2;
  } else if (alt = 1) {
    n_interazione = 0;
    p_coord = 0;
  }

  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
//TUTORIAL TROMBETTA
if(i== 0 || i==2){
image(tut1Icon, width / 2, height / 2, tut1Icon.width / 7, tut1Icon.height / 7);
text('TUTORIAL', width / 2, height / 6*3.5);
} else if (i==1 || i==3){
image(tut2Icon, width / 2, height / 2, tut2Icon.width / 7, tut2Icon.height / 7);
text('TUTORIAL', width / 2, height / 6*3.5);
}

//ICONE NORMALI
if (keyIsDown(ENTER) && i>3) {
    push();
    fill('#877B85');
    noStroke();
    strokeWeight(5);
    ellipse(width / 2, height / 2, 100); //cerchio centrale
    image(trombaIcon, width / 2, height / 2, trombaIcon.width / 7, trombaIcon.height / 7);
    pop();
  }else if (keyIsDown(ENTER)==false && i>3){//cambio colore dle bottone centrale: feedback utente
  push();
  noFill();
  stroke('#877B85');
  strokeWeight(5);
  ellipse(width / 2, height / 2, 100); //cerchio centrale
  image(tscuraIcon, width / 2, height / 2, tscuraIcon.width / 7, tscuraIcon.height / 7); // trombetta scura
  pop();}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
