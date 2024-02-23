let possibleColors = ["blue", "green", "red", "yellow"];
let combTry = [];
let index;
let nbrTour = 1;
let goodPlaceNColor = 0;
let goodColor = 0;

//Génération de la suite à deviner de manière aléatoire
let combSoluce = [
  possibleColors[Math.floor(Math.random() * 4)],
  possibleColors[Math.floor(Math.random() * 4)],
  possibleColors[Math.floor(Math.random() * 4)],
  possibleColors[Math.floor(Math.random() * 4)],
];

function init(){
  document.getElementsByClassName("popUp").item(0).style.visibility ="hidden";
  combTry = [];
  nbrTour = 1;
  goodPlaceNColor = 0;
  goodColor = 0;
  for (i = 1; i < 13; i++){
    for (j=1; j<5; j++){
      document.getElementById("dot" + i + "_" + j).style.backgroundColor = "#F1E6E6";
      document.getElementById("miniDot" + i + "_" + j).style.backgroundColor = "#F1E6E6";
    }
  }
  combSoluce = [
    possibleColors[Math.floor(Math.random() * 4)],
    possibleColors[Math.floor(Math.random() * 4)],
    possibleColors[Math.floor(Math.random() * 4)],
    possibleColors[Math.floor(Math.random() * 4)],
  ];
}

console.log(combSoluce);

//Création du design via une boucle for en utilisant Jquery
for (let i = 1; i < 13; i++) {
  console.log("je passe ici");
  let row ='<div class="row" id=row' +i +">" +'<div class="lign" id=lign' +i +"></div>" 
  +'<div class="pegs" id=pegs' +i +"></div>" +"</div>";
  $(".boardGame").append(row);
  for (let j = 1; j < 5; j++) {
    let circle =
      '<span class="dot" id=dot' +i +"_" +j +
      " type=button onclick=displaySelectColor("+j+","+i+")></span>";
    $("#lign" + i).append(circle);
    let miniCircle =
      '<span class="miniDot" id=miniDot' + i + "_" + j + "></span>";
    $("#pegs" + i).append(miniCircle);
  }
}

document.getElementById("blueSquare").addEventListener("click", function () {
  SelectColor("blue");
});
document.getElementById("greenSquare").addEventListener("click", function () {
  SelectColor("green");
});
document.getElementById("yellowSquare").addEventListener("click", function () {
  SelectColor("yellow");
});
document.getElementById("redSquare").addEventListener("click", function () {
  SelectColor("red");
});

function displaySelectColor(valeurIndex,valueLign) {
    if (valueLign==nbrTour) {
        document.getElementsByClassName("secondSide").item(0).style.visibility = "visible";
        index = valeurIndex;
    }
}

function SelectColor(color) {
  document.getElementById("dot" + nbrTour + "_" + index).style.backgroundColor = color;
  combTry[index - 1] = color;
  document.getElementsByClassName("secondSide").item(0).style.visibility ="hidden";
  console.log(combTry);
  if (
    combTry[0] != undefined &&
    combTry[1] != undefined &&
    combTry[2] != undefined &&
    combTry[3] != undefined
  ) {
    document.getElementById("validTry").style.visibility = "visible";
  }
}

function compareArray() {
  document.getElementById("validTry").style.visibility = "hidden";
  combSoluceCompare = combSoluce.slice();
  combTryCompare = combTry.slice();
  console.log("je vérifie ce qu'il ya dans combSoluceCompare");
  console.log(combSoluceCompare);
  for (i = 0; i < combSoluceCompare.length; i++) {
    if (combSoluceCompare[i] == combTryCompare[i]) {
      goodPlaceNColor += 1;
      combSoluceCompare[i] = -1;
      combTryCompare[i] = "find";
    }
  }
  for (j = 0; j < combSoluceCompare.length; j++) {
    console.log(combSoluceCompare);
    if (combSoluceCompare[j] != -1) {
      console.log(combSoluceCompare);
      for (k = 0; k < combTryCompare.length; k++) {
        if (combSoluceCompare[j] == combTryCompare[k]) {
          combSoluceCompare[j] = -1;
          combTryCompare[k] = "find";
          goodColor += 1;
          console.log(goodColor);
        }
      }
    } else {
      console.log("je passe ici");
    }
  }
  console.log(goodColor);
  console.log(goodPlaceNColor);
  if (goodPlaceNColor + goodColor > 0) {
    for (i = 1; i <= goodPlaceNColor + goodColor; i++) {
      if (i <= goodPlaceNColor) {
        document.getElementById("miniDot" + nbrTour + "_" + i).style.backgroundColor = "green";
      } else {
        document.getElementById("miniDot" + nbrTour + "_" + i).style.backgroundColor = "orange";
      }
    }
  }

  if (goodPlaceNColor == 4 && nbrTour < 13) {
    document.getElementsByClassName("popUp").item(0).style.visibility ="visible";
    document.getElementById("textEnd").innerHTML="Bravo tu as gaaaagné ^_^/"
    console.log("Bravo tu as gaaaagné ^_^/");
  } else if (nbrTour == 12) {
    document.getElementsByClassName("popUp").item(0).style.visibility ="visible";
    document.getElementById("textEnd").innerHTML="Tu as perduuu T.T"
    console.log("Tu as perduuu T.T");
  } else {
    console.log(goodPlaceNColor);
    console.log("Tu as " + goodPlaceNColor + " couleur bien placée");
    console.log("Tu as " + goodColor + " couleur mal placée");
    nbrTour += 1;
  }
  goodColor = 0;
  goodPlaceNColor = 0;
  for (i = 0; i < combTry.length; i++) {
    combTry[i] = undefined;
  }
  console.log("jeteste si je remets bien à zéro combTry");
  console.log(combTry);
}
