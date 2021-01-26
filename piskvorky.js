var N_SIZE = 35,
  M_SIZE = 25,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  score,
  moves,
  pause = false,
  W_SIZE = 5,
  C_SIZE = 30,
  nem = "<image src='pictures/nem.png' height = " + (C_SIZE - 1) + " width = " + (C_SIZE - 1) + " id='tah'>",
  sssr = "<image src='pictures/sssr.png' height = " + (C_SIZE - 1) + " width = " + (C_SIZE - 1) + " id='tah'>",
  hitler = document.getElementById("hitler"),
  stalin = document.getElementById("stalin"),
  prompt = document.getElementsByClassName('prompt'),
  prompt = prompt[0],
  startHitler = "<div id='gameStart' class='box'><p>Hitler has won the coin toss. He begins!<hr id='but'><button id='but' onclick=\"startButton('gameStart')\">Play</button></p></div>",
  startStalin = "<div id='gameStart' class='box'><p>Stalin has won the coin toss. He begins!<hr id='but'><button id='but' onclick=\"startButton('gameStart')\">Play</button></p></div>",
  wonHitler = "<div id='gameEnd' class='box'><p>HITLER WON THE WAR!!!<hr id='but'><button id='but' onclick='restartGame()'>Restart</button></p></div>",
  wonStalin = "<div id='gameEnd' class='box'><p>STALIN WON THE WAR!!! <hr id='but'> <button id='but' onclick='restartGame()'>Restart</button></p></div>",
  restartHitler = "<div id='gameRestart' class='box'><p>Hitler has won the coin toss. He begins!<hr id='but'><button id='but' onclick=\"startButton('gameRestart')\">Play</button></p></div>",
  restartStalin = "<div id='gameRestart' class='box'><p>Stalin has won the coin toss. He begins!<hr id='but'><button id='but' onclick=\"startButton('gameRestart')\">Play</button></p></div>",
  sm = false;



function init() {
  var board = document.createElement('table');
  board.setAttribute("border", 1);
  board.setAttribute("cellspacing", 0);
  board.setAttribute("id", "table")
  board.setAttribute("style", "max-width:" + N_SIZE * C_SIZE)
  var identifier = 1;
  for (var i = 0; i < M_SIZE; i++) {
    var row = document.createElement('tr')
    board.appendChild(row);
    for (var j = 0; j < N_SIZE; j++) {
      var cell = document.createElement('td');
      //cell.setAttribute("style", 'height' + C_SIZE);
      //cell.setAttribute("style", 'width' + C_SIZE);
      //cell.setAttribute('align', 'center');
      cell.classList.add('c1_' + j, 'r1_' + i, 'c2_' + j, 'r2_' + i, 'c3_' + j, 'r3_' + i, 'c4_' + j, 'r4_' + i, 'c5_' + j, 'r5_' + i);
      //cell.setAttribute('valign', 'center');
      cell.classList.add("d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d0");
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }


  document.getElementById("tictactoe").appendChild(board);
  turn = randomStart();
  if (turn == "X") {
    prompt.innerHTML += startHitler;
  } else prompt.innerHTML += startStalin;
  startNewGame();
}

function startNewGame() {
  score = {
    "X": 0,
    "O": 0
  };
  moves = 0;
  turnImageStart(turn);
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
  pause = true;
}

function win(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];
    var items = contains('#tictactoe ' + testClass, turn, clicked);
    if (items.length == W_SIZE) {
      if (turn == "X") {
        items.forEach(element => {
          if (sm === true) {
            element.innerHTML += element.innerHTML.replace("nem", "nemRed").replace("id=\"tah\"", "id = 'red'");
          } else {
            element.innerHTML += element.innerHTML.replace("svastika", "svastikaRed").replace("id=\"tah\"", "id = 'red'");
          }
        });
      }
      if (turn == "O") {
        items.forEach(element => {
          document.getElementById("tah").style.opacity = .9;
          if (sm === true) {
            element.innerHTML += element.innerHTML.replace("sssr", "sssrRed").replace("id=\"tah\"", "id = 'red'");
          } else {
            element.innerHTML += element.innerHTML.replace("srp", "srpRed").replace("id=\"tah\"", "id = 'red'");
          }
        });
      }
      return true;
    }
  }
  return false;
}

function contains(selector, text, cell) {
  var elements = document.querySelectorAll(selector);
  var elem = Array.from(elements);
  let e = [];
  let y = parseInt(cell.className.split(/\s+/)[1].replace("r1_", " "));
  let x = parseInt(cell.className.split(/\s+/)[0].replace("c1_", " "));
  if (selector.includes("c1_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      if (num == y || num == y + 1 || num == y + 2 || num == y + 3 || num == y + 4) {
        e.push(element)
      }
    });
  }
  if (selector.includes("c2_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      if (num == y || num == y - 1 || num == y - 2 || num == y - 3 || num == y - 4) {
        e.push(element);
      }
    });
  }

  if (selector.includes("c3_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      if (num == y || num == y + 1 || num == y + 2 || num == y - 1 || num == y - 2) {
        e.push(element);
      }
    });
  }
  if (selector.includes("c4_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      if (num == y || num == y + 1 || num == y + 2 || num == y + 3 || num == y - 1) {
        e.push(element);
      }
    });
  }
  if (selector.includes("c5_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      if (num == y || num == y - 1 || num == y - 2 || num == y - 3 || num == y + 1) {
        e.push(element);
      }
    });
  }
  if (selector.includes("r1_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if (num == x || num == x + 1 || num == x + 2 || num == x + 3 || num == x + 4) {
        e.push(element);

      }
    });
  }
  if (selector.includes("r2_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if (num == x || num == x - 1 || num == x - 2 || num == x - 3 || num == x - 4) {
        e.push(element);
      }
    });
  }
  if (selector.includes("r3_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if (num == x || num == x + 1 || num == x + 2 || num == x - 1 || num == x - 2) {
        e.push(element);
      }
    });
  }
  if (selector.includes("r4_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if (num == x || num == x - 1 || num == x - 2 || num == x - 3 || num == x + 1) {
        e.push(element);
      }
    });
  }
  if (selector.includes("r5_")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if (num == x || num == x + 1 || num == x + 2 || num == x + 3 || num == x - 1) {
        e.push(element);
      }
    });
  }

  if (selector.includes("d1")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y + 1 && numY == x - 1) || (numX == y + 2 && numY == x - 2) || (numX == y + 3 && numY == x - 3) || (numX == y + 4 && numY == x - 4)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d2")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y + 1 && numY == x + 1) || (numX == y + 2 && numY == x + 2) || (numX == y + 3 && numY == x + 3) || (numX == y + 4 && numY == x + 4)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d3")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y - 1 && numY == x - 1) || (numX == y - 2 && numY == x - 2) || (numX == y - 3 && numY == x - 3) || (numX == y - 4 && numY == x - 4)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d4")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y - 1 && numY == x + 1) || (numX == y - 2 && numY == x + 2) || (numX == y - 3 && numY == x + 3) || (numX == y - 4 && numY == x + 4)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d5")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y - 1 && numY == x - 1) || (numX == y - 2 && numY == x - 2) || (numX == y - 3 && numY == x - 3) || (numX == y + 1 && numY == x + 1)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d6")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y + 1 && numY == x + 1) || (numX == y + 2 && numY == x + 2) || (numX == y + 3 && numY == x + 3) || (numX == y - 1 && numY == x - 1)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d7")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y + 1 && numY == x - 1) || (numX == y + 2 && numY == x - 2) || (numX == y + 3 && numY == x - 3) || (numX == y - 1 && numY == x + 1)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d8")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y - 1 && numY == x + 1) || (numX == y - 2 && numY == x + 2) || (numX == y - 3 && numY == x + 3) || (numX == y + 1 && numY == x - 1)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d9")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y + 1 && numY == x + 1) || (numX == y + 2 && numY == x + 2) || (numX == y - 1 && numY == x - 1) || (numX == y - 2 && numY == x - 2)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("d0")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("r1_", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("c1_", " "));
      if ((numX == y && numY == x) || (numX == y + 1 && numY == x - 1) || (numX == y + 2 && numY == x - 2) || (numX == y - 1 && numY == x + 1) || (numX == y - 2 && numY == x + 2)) {
        e.push(element);
      }
    });
  }


  return [].filter.call(e, function (element) {
    return RegExp(text).test(element.textContent);
  });
}

function set() {
  if (pause == false) {
    turnImage(turn);
    if (this.innerHTML !== EMPTY) {
      return;
    }
    this.innerHTML = turn;
    image(this, turn);
    moves += 1;
    score[turn] += this.identifier;
    if (win(this)) {
      victory(turn);
    } else if (moves === N_SIZE * N_SIZE) {
      alert("Draw");
      startNewGame();
    } else {
      turn = turn === "X" ? "O" : "X";
      //document.getElementById('turn').textContent = 'Player ' + turn;
    }
  }
}

function image(cell, turn) {
  if (turn == "X") {
    cell.innerHTML = turn + nem;
  }

  if (turn == "O") {
    cell.innerHTML = turn + sssr;
  }
}

function victory(turn) {
  if (turn == "X") {
    prompt.innerHTML = wonHitler;
    setTimeout(function () {
      //alert("HITLER WON THE WAR!!!");
    }, 10);
  }
  if (turn == "O") {
    prompt.innerHTML = wonStalin;
    setTimeout(function () {
      //alert("STALIN WON THE WAR!!!");
    }, 10);
  }

  pause = true;
}

function turnImage(turn) {
  randomStart();
  if (turn == "O") {
    hitler.setAttribute("style", "-webkit-transform:scale(" + 1.2 + ") rotate(" + 3 + "deg);");
    stalin.setAttribute("style", "-webkit-transform:scale(" + 1 + ") rotate(" + 0 + "deg);");
  }

  if (turn == "X") {
    hitler.setAttribute("style", "-webkit-transform:scale(" + 1 + ") rotate(" + 0 + "deg);");
    stalin.setAttribute("style", "-webkit-transform:scale(" + 1.2 + ") rotate(-" + 3 + "deg)");
  }
}

function turnImageStart(turn) {
  if (turn == "X") {
    hitler.setAttribute("style", "-webkit-transform:scale(" + 1.2 + ")rotate(" + 3 + "deg)");
    stalin.setAttribute("style", "-webkit-transform:scale(" + 1 + ") rotate(" + 0 + "deg);");
  }

  if (turn == "O") {
    hitler.setAttribute("style", "-webkit-transform:scale(" + 1 + ") rotate(" + 0 + "deg)");
    stalin.setAttribute("style", "-webkit-transform:scale(" + 1.2 + ") rotate(-" + 3 + "deg)");
  }
}

function randomStart() {
  let i = Math.random();
  if (i < 0.5)
    return "X"
  else
    return "O"

}

function startButton(prompt) {
  pause = false;
  document.getElementById(prompt).parentElement.removeChild(document.getElementById(prompt));
}

function restartGame() {
  document.getElementById('gameEnd').parentElement.removeChild(document.getElementById('gameEnd'))
  turn = randomStart();
  if (turn == "X") {
    prompt.innerHTML += restartHitler;
  } else prompt.innerHTML += restartStalin;
  startNewGame();
}

function safeMode() {
  if (sm === true) {
    document.getElementById("nem2").src = "pictures/svastika2.png";
    document.getElementById("sssr2").src = "pictures/srp2.png";
    nem = "<image src='pictures/svastika.png' height = " + (C_SIZE - 1) + " width = " + (C_SIZE - 1) + " id='tah'>",
      sssr = "<image src='pictures/srp.png' height = " + (C_SIZE - 1) + " width = " + (C_SIZE - 1) + " id='tah'>",

      sm = false;
  } else {
    document.getElementById("nem2").src = "pictures/nem2.png";
    document.getElementById("sssr2").src = "pictures/sssr2.png";
    nem = "<image src='pictures/nem.png' height = " + (C_SIZE - 1) + " width = " + (C_SIZE - 1) + " id='tah'>",
      sssr = "<image src='pictures/sssr.png' height = " + (C_SIZE - 1) + " width = " + (C_SIZE - 1) + " id='tah'>",

      sm = true;
  }
}

init();
