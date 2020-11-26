// let SERIAL
let serial; // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem14101'; // fill in your serial port name here
// let options = {baudrate: 9600}; // change the data rate to whatever you wish
// serial.open(portName, options);
let inData; // for incoming serial data

//trombetta ICONE
let trombaIcon, tscuraIcon, tut1Icon, tut2Icon, logor, freccia; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s = 0; //ellisse BONUS

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione
let contBonus = 0; //conta quando p_coord arriva a 100

let feed_piattaforma = 0 ; //n_trombetta = 0; //var piattaforma: quando alt!=1 viene incrementata
let input_utente = 200 //n_interazione = 0; //var utente usa la trobetta, preme bottone
//se faccio ntrombetta/niterazione trovo la coordinazione

/////////////////////////////////////////////////////////////////////////

function preload() {
  trombaIcon = loadImage("./assets/immagini/trombettaB.png"); //trombetta chiara
  tscuraIcon = loadImage("./assets/immagini/trombetta.png"); //trombetta scura
  tut1Icon = loadImage("./assets/immagini/Tutorial_Trombetta1.png"); //trombetta tutorial 1
  tut2Icon = loadImage("./assets/immagini/Tutorial_Trombetta2.gif"); //trombetta tutorial 1
  logor = loadImage("./assets/immagini/logopiccolo.png"); //logo ridotto
  freccia = loadImage("./assets/immagini/freccia.png");
}

/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(15); //rallenta

  // setup SERIAL
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port
}

/////////////////////////////////////////////////////////////////////////
function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

  w = width / 2;
  h = height / 8;

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
  image(logor, width / 11 * 9.8, height / 9, logor.width / 4.5, logor.height / 4.5);
  //freccia
  image(freccia, width / 11, height / 9, freccia.width / 6, freccia.height / 6);

  //testo sotto
  textSize(14);
  text('COORDINAZIONE', w - 30, h * 6.5);
  text('BONUS', width / 11 + 15, h * 6.5);

  //BARRA
  fill('#D5D0D3'); //barre grige
  rectMode(CENTER);
  rect(w, h * 7, width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  push();
  rectMode(CORNER);
  fill('#877B85'); //barre viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w - width / 7, h * 7 - 7.5, xBarra, 15, 20);
  pop();


  ///////////////BONUS//////////////////////////////////////////////////////////////
  if (p_coord === 80) {
    contBonus++;
  }
  console.log('BONUS CONTATOR:' + contBonus);

  //pallini BONUS
  for (let i = 0; i < 6; i++) {
    if (contBonus === 2 || contBonus === 3) {
      push();
      fill('#877B85');
      ellipse(width / 11, h * 7, 15);
      pop();
    } else if (contBonus === 4 || contBonus === 5 || contBonus === 6 || contBonus === 7) {
      push();
      fill('#877B85');
      ellipse(width / 11, h * 7, 15);
      ellipse(width / 11 + 25, h * 7, 15);
      pop();
    } else if (contBonus === 8 || contBonus === 9) {
      push();
      fill('#877B85');
      ellipse(width / 11, h * 7, 15);
      ellipse(width / 11 + 25, h * 7, 15);
      ellipse(width / 11 + 50, h * 7, 15);
      pop();
    }
    ellipse(width / 11 + s, h * 7, 15);
    s = 25 * i;
  }
  ///////////////////////////////////////////////////////////////

  //CONTATORE i DEL TEMPO
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++;
  }

  // BARRETTE FEED UTENTE (LINETTE)
  for (var x = width / 6 * 1.5; x < width / 2.2; x += 40) {
    if (keyIsDown(ENTER)) {
      alt = 1 * random(2, 10);
      //input_utente++;
      input_utente=200;
    } else {
      alt = 1;
      input_utente=0;
    }
    noStroke();
    fill(135, 123, 133);
    rectMode(CENTER);
    rect(x, height / 2, 15, 15 * alt, 20);
    rect(x + width / 3.15, height / 2, 15, 15 * alt, 20);
  }

  //PER LA BARRA DELLA PERCENTUALE
  if (keyIsDown(ENTER)) {
    p_coord = round((feed_piattaforma*input_utente ) / 100);
  } else {
    p_coord = 0;
  }

  //PERCENTUALE
  text(p_coord + '%', w + (width / 28), h * 6.5); //w, height / 5 * 4.5
    //console.log('input_utente: ' + input_utente);
   //console.log('feed_piattaforma: ' + feed_piattaforma);//max 50

  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
  //TUTORIAL TROMBETTA
  if (i == 0 || i == 2) {
    image(tut1Icon, width / 2, height / 2, tut1Icon.width / 5, tut1Icon.height / 5);
    text('Segui il ritmo degli altri', w, height / 6 * 3.7);
    text('TUTORIAL', width / 20 * 10, height / 6 * 3.9);
  } else if (i == 1 || i == 3) {
    image(tut2Icon, width / 2, height / 2, tut2Icon.width / 5, tut2Icon.height / 5);
    text('Segui il ritmo degli altri', w, height / 6 * 3.7);
    text('TUTORIAL', width / 20 * 10, height / 6 * 3.9);
  }

  //ICONA FEEDBACK DA SEGUIRE
  if (i % 2 != 0 && i>3) {
    push();
    fill('#877B85');
    noStroke();
    strokeWeight(5);
    ellipse(width / 2, height / 2, 100); //cerchio centrale
    image(trombaIcon, width / 2, height / 2, trombaIcon.width / 1.7, trombaIcon.height / 1.7);
    pop();
    feed_piattaforma++;
  } else if (i % 2 == 0 && i>3){ //cambio colore delle bottone centrale: feedback utente
    push();
    noFill();
    stroke('#877B85');
    strokeWeight(5);
    ellipse(width / 2, height / 2, 100); //cerchio centrale
    image(tscuraIcon, width / 2, height / 2, tscuraIcon.width / 1.7, tscuraIcon.height / 1.7); // trombetta scura
    pop();
    feed_piattaforma = 0;
  }
}
  // function SERIAL
  function serverConnected() {
    console.log('connected to server.');
  }

  function portOpen() {
    console.log('the serial port opened.')
  }

  function serialEvent() {
    inData = Number(serial.read());
    console.log(inData)
  }

  function serialError(err) {
    console.log('Something went wrong with the serial port. ' + err);
  }

  function portClose() {
    console.log('The serial port closed.');
  }

  // get the list of ports:
  function printList(portList) {
    // portList is an array of serial port names
    for (var i = 0; i < portList.length; i++) {
      // Display the list the console:
      console.log(i + portList[i]);
    }
  }


//funzione trombetta
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
