// https://mappa.js.org/docs/getting-started.html

// Other possible interesting videos:
// Subscribers data: https://www.youtube.com/watch?v=Ae73YY_GAU8&feature=youtu.be
// Earthquake Data: https://www.youtube.com/watch?v=ZiYdOwOrGyc&t=1083s

// For integrating images: https://www.youtube.com/watch?v=FVYGyaxG4To

let myMap;
let canvas;
const mappa = new Mappa('Leaflet');


let zpathArrayOfPointsLat = [];
let zpathArrayOfPointsLon = [];
let sculpturesImg = [];
let distanceArr = [];
let titleArr = [];
let matArr = [];

let testImg = [];

let pathArrayOfPointsLat = [];
let pathArrayOfPointsLon = [];

let opathArrayOfPointsLat = [];
let opathArrayOfPointsLon = [];

let oopathArrayOfPointsLat = [];
let oopathArrayOfPointsLon = [];


let ooopathArrayOfPointsLat = [];
let ooopathArrayOfPointsLon = [];

let oooopathArrayOfPointsLat = [];
let oooopathArrayOfPointsLon = [];

let positionX = [];
let positionY = [];

let options = {
  lat: 42.890637,
  lng: -78.872576,
  zoom: 13,
  style: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
}


function preload() {

  sculpturesV3 = loadTable('sculpturesV3.csv', 'csv', 'header');


  firstPath = loadTable('soletrackpoints.csv', 'csv', 'header');
  secondPath = loadTable('niagaratrackpoints.csv', 'csv', 'header');
  thirdPath = loadTable('downtowntrackpoints.csv', 'csv', 'header');
  fourthPath = loadTable('delawaretrack.csv', 'csv', 'header');

}



function setup() {
  canvas = createCanvas(1000, 1000);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  myMap.onChange(clear);

  myMap.onChange(pointDrawPath.bind(null, firstPath));
  myMap.onChange(drawooooPath.bind(null, secondPath));
  myMap.onChange(drawoPath.bind(null, thirdPath));

  myMap.onChange(drawoooPath.bind(null, fourthPath));
  myMap.onChange(drawLinePath.bind(null));
  // myMap.onChange(odrawLinePath.bind(null));
  myMap.onChange(oodrawLinePath.bind(null));
  myMap.onChange(ooodrawLinePath.bind(null));
  myMap.onChange(oooodrawLinePath.bind(null));


  myMap.onChange(drawPath.bind(null, sculpturesV3));
  myMap.onChange(drawPath.bind(null, sculpturesImg));


  let tableNames = sculpturesV3.getColumn('title');
  console.log(tableNames);
  for (var i = 0; i < 40; i++) {
    let imgRef = "images/" + tableNames[i] + ".png";
    let correctImgRef = imgRef.replace(/ /g, "_");
    sculpturesImg[i] = loadImage(correctImgRef);

    console.log(correctImgRef);
  }
}

function drawPath(path) {
  // console.log(path.getRowCount());

  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclat'));
    const longitude = Number(path.getString(i, 'reclon'));
    const pinTitle = path.getString(i, 'title');
    const pinMat = path.getString(i, 'mat');

    zpathArrayOfPointsLat[i] = latitude;
    zpathArrayOfPointsLon[i] = longitude;

    if (myMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      const pos = myMap.latLngToPixel(latitude, longitude);

      distanceArr[i] = pos;
      titleArr[i] = pinTitle;
      matArr[i] = pinMat;
      //console.log(distanceArr[i]);
      noStroke();

      //////////////////////////// COLORs and MATS
      if (pinMat === 'BRONZE') {
        rectMode(CENTER);
        fill('purple');
        rect(pos.x, pos.y, 10);

      }

      if (pinMat === 'STEEL') {
        rectMode(CENTER);
        fill('blue');
        rect(pos.x, pos.y, 10);

      }

      if (pinMat === 'CERAMIC') {
        rectMode(CENTER);
        fill('green');
        triangle(pos.x - 8, pos.y + 8, pos.x, pos.y - 4, pos.x + 8, pos.y + 8);

      }

      if (pinMat === 'GRANITE') {
        rectMode(CENTER);
        fill('red');
        circle(pos.x, pos.y, 10);
      }

      if (pinMat === 'BRONZE AND GRANITE') {
        rectMode(CENTER);
        fill('pink');
        rect(pos.x, pos.y, 10);
      }

      if (pinMat === 'STONE') {
        rectMode(CENTER);
        fill('orange');
        circle(pos.x, pos.y, 10);
      }

      if (pinMat === 'MARBLE') {
        rectMode(CENTER);
        fill('yellow');
        circle(pos.x, pos.y, 10);
      }


      //////////////////////////////////////////////////////////////////

      rectMode(CENTER);

      //Draws images------>>>>> Important!!!!!!!
      //image(sculpturesImg[i], pos.x + 17, pos.y - 45, 40, 40);
      //image(testImg[0], pos.x+17, pos.y-45, 40, 40 );
      pop();
    }
    //circle(360, 200, 200, 200);
  }
}

function mousePressed() {

  for (var i = 0; i < distanceArr.length - 1; i++) {
    let d = dist(mouseX, mouseY, distanceArr[i].x, distanceArr[i].y);

    if (d < 5) {
//      console.log("was clicked");

      image(sculpturesImg[i], distanceArr[i].x -20, distanceArr[i].y - 46, 40, 40);
      noStroke();
      fill('white');
      textSize(8);
      text(titleArr[i], distanceArr[i].x + 7, distanceArr[i].y);

      textSize(5);
      fill('white');
      text(matArr[i], distanceArr[i].x + 7, distanceArr[i].y + 6);
    }
  }

}
////////////////////////////////////////////////////////////////////

//drawing dots for trails

function pointDrawPath(path) {

    for (let i = 0; i < path.getRowCount() - 1; i++) {
      const latitude = Number(path.getString(i, 'reclon'));
      const longitude = Number(path.getString(i, 'reclat'));

      pathArrayOfPointsLat[i] = latitude;
      pathArrayOfPointsLon[i] = longitude;

      if (myMap.map.getBounds().contains({
          lat: latitude,
          lng: longitude
        })) {
        const pos = myMap.latLngToPixel(latitude, longitude);
        stroke('white');
        strokeWeight(1);
        line(pos.x, pos.y, pos.x, pos.y);

      }
    }
  }


function drawoPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclon'));
    const longitude = Number(path.getString(i, 'reclat'));

    opathArrayOfPointsLat[i] = latitude;
    opathArrayOfPointsLon[i] = longitude;

    if (myMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      stroke('white');
      strokeWeight(1);
      line(pos.x, pos.y, pos.x, pos.y);

    }
  }
}

function drawooPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclon'));
    const longitude = Number(path.getString(i, 'reclat'));

    oopathArrayOfPointsLat[i] = latitude;
    oopathArrayOfPointsLon[i] = longitude;

    if (myMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      stroke('white');
      strokeWeight(1);
      line(pos.x, pos.y, pos.x, pos.y);

    }
  }
}

function drawoooPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclon'));
    const longitude = Number(path.getString(i, 'reclat'));

    ooopathArrayOfPointsLat[i] = latitude;
    ooopathArrayOfPointsLon[i] = longitude;

    if (myMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      stroke('white');
      strokeWeight(1);
      line(pos.x, pos.y, pos.x, pos.y);

    }
  }
}

function drawooooPath(path) {
  for (let i = 0; i < path.getRowCount() - 1; i++) {
    const latitude = Number(path.getString(i, 'reclon'));
    const longitude = Number(path.getString(i, 'reclat'));

    oooopathArrayOfPointsLat[i] = latitude;
    oooopathArrayOfPointsLon[i] = longitude;

    if (myMap.map.getBounds().contains({
        lat: latitude,
        lng: longitude
      })) {
      const pos = myMap.latLngToPixel(latitude, longitude);
      stroke('white');
      strokeWeight(1);
      line(pos.x, pos.y, pos.x, pos.y);

    }
  }
}

function drawLinePath() {

  stroke('red');
  strokeWeight(2);

  if (pathArrayOfPointsLat.length > 0) {
    noFill();
    beginShape();
    for (let i = 0; i < pathArrayOfPointsLat.length; i++) {
      // forEach(function (e) {
      var pos = myMap.latLngToPixel(pathArrayOfPointsLat[i], pathArrayOfPointsLon[i]);
      vertex(pos.x, pos.y);
    }
    endShape();
  }
}

function ooodrawLinePath() {

  stroke('green');
  strokeWeight(2);

  if (pathArrayOfPointsLat.length > 0) {
    fill('rgba(0, 0, 0, 0)');
    beginShape();

    for (let i = 0; i < opathArrayOfPointsLat.length; i++) {
      // forEach(function (e) {
      var pos = myMap.latLngToPixel(opathArrayOfPointsLat[i], opathArrayOfPointsLon[i]);
      vertex(pos.x, pos.y);
    }

    endShape();
  }
}

function oodrawLinePath() {
  stroke('purple');
  strokeWeight(2);

  if (pathArrayOfPointsLat.length > 0) {
    noFill();
    beginShape();

    for (let i = 0; i < ooopathArrayOfPointsLat.length; i++) {
      var pos = myMap.latLngToPixel(ooopathArrayOfPointsLat[i], ooopathArrayOfPointsLon[i]);
      vertex(pos.x, pos.y);
    }

    endShape();
  }
}

function oooodrawLinePath() {

  stroke('yellow');
  strokeWeight(2);

  if (oooopathArrayOfPointsLat.length > 0) {
    noFill();
    beginShape();

    for (let i = 0; i < oooopathArrayOfPointsLat.length; i++) {
      // forEach(function (e) {
      var pos = myMap.latLngToPixel(oooopathArrayOfPointsLat[i], oooopathArrayOfPointsLon[i]);
      vertex(pos.x, pos.y);
    }

    endShape();
  }
}
