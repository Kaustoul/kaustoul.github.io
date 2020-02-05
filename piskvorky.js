/*
 * Tic Tac Toe
 *
 * A Tic Tac Toe game in HTML/JavaScript/CSS.
 *
 * @author: Vasanth Krishnamoorthy
 */
var N_SIZE = 30,
  M_SIZE = 25,
  EMPTY = "&nbsp;",
  boxes = [],
  turn = "X",
  score,
  moves,
  W_SIZE = 5,
  C_SIZE = 30,
  svastika = "<image src='pictures/svastika.png' height = " + (C_SIZE - 1) + " width = " + (C_SIZE - 1) + ">",
  srp = "<image src='pictures/srp.png' height = " + (C_SIZE - 1) + " width = " + (C_SIZE - 1) + ">";

console.log(screen.width / 30);

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
      cell.classList.add('col' + j, 'row' + i);
      //cell.setAttribute('valign', 'center');
      cell.classList.add("diagonal");
      cell.classList.add("diagonal1");
      cell.identifier = identifier;
      cell.addEventListener("click", set);
      row.appendChild(cell);
      boxes.push(cell);
      identifier += identifier;
    }
  }

  //document.getElementById('won').setAttribute("style", "width:" + N_SIZE * C_SIZE);
  //document.getElementById('won').setAttribute("style", "height:" + N_SIZE * C_SIZE);
  document.getElementById("tictactoe").appendChild(board);
  startNewGame();
}

/*
 * New game
 */
function startNewGame() {
  document.getElementById('won').innerHTML = "";
  document.getElementById('won').setAttribute("style", "padding:" + 0);
  score = {
    "X": 0,
    "O": 0
  };
  moves = 0;
  turn = "X";
  boxes.forEach(function (square) {
    square.innerHTML = EMPTY;
  });
}

/*
 * Check if a win or not
 */
function win(clicked) {
  var memberOf = clicked.className.split(/\s+/);
  //console.log(memberOf);
  for (var i = 0; i < memberOf.length; i++) {
    var testClass = '.' + memberOf[i];

    let y = parseInt(memberOf[1].replace("row", " ")) + 1;
    let x = parseInt(memberOf[0].replace("col", " ")) + 1;
    var items = contains('#tictactoe ' + testClass, turn, clicked);
    if (items.length == W_SIZE) {
      return true;
    }
  }
  return false;



}

function contains(selector, text, cell) {
  var elements = document.querySelectorAll(selector);
  var elem = Array.from(elements);
  var e = [];
  let y = parseInt(cell.className.split(/\s+/)[1].replace("row", " "));
  let x = parseInt(cell.className.split(/\s+/)[0].replace("col", " "));
  if (selector.includes("col")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[1].replace("row", " "));
      if (num == y || num == y + 1 || num == y - 1 || num == y + 2 || num == y - 2 || num == y + 3 || num == y - 3 || num == y + 4 || num == y - 4) {
        e.push(element);
      }
    });
  }
  if (selector.includes("row")) {
    elem.forEach(element => {
      let num = parseInt(element.className.split(/\s+/)[0].replace("col", " "));
      if (num == x || num == x + 1 || num == x - 1 || num == x + 2 || num == x - 2 || num == x + 3 || num == x - 3 || num == x + 4 || num == x - 4) {
        e.push(element);
      }
    });
  }
  if (selector.includes("diagonal")) {
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("row", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("col", " "));
      if ((numX == y && numY == x) || (numX == y + 1 && numY == x - 1) || (numX == y - 1 && numY == x + 1) ||
        (numX == y + 2 && numY == x - 2) || (numX == y - 2 && numY == x + 2) ||
        (numX == y + 3 && numY == x - 3) || (numX == y - 3 && numY == x + 3) ||
        (numX == y + 4 && numY == x - 4) || (numX == y - 4 && numY == x + 4)) {
        e.push(element);
      }
    });
  }
  if (selector.includes("diagonal1")) {
    e = [];
    elem.forEach(element => {
      let numX = parseInt(element.className.split(/\s+/)[1].replace("row", " "));
      let numY = parseInt(element.className.split(/\s+/)[0].replace("col", " "));
      if ((numX == y && numY == x) || (numX == y + 1 && numY == x + 1) || (numX == y - 1 && numY == x - 1) ||
        (numX == y + 2 && numY == x + 2) || (numX == y - 2 && numY == x - 2) ||
        (numX == y + 3 && numY == x + 3) || (numX == y - 3 && numY == x - 3) ||
        (numX == y + 4 && numY == x + 4) || (numX == y - 4 && numY == x - 4)) {
        e.push(element);
      }
    });
  }
  return [].filter.call(e, function (element) {
    return RegExp(text).test(element.textContent);
  });
}


/*
 * Sets clicked square and also updates the turn.
 */
function set() {
  if (this.innerHTML !== EMPTY) {
    return;
  }
  this.innerHTML = turn;
  image(this, turn);
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    won(turn);
  } else if (moves === N_SIZE * N_SIZE) {
    alert("Draw");
    startNewGame();
  } else {
    turn = turn === "X" ? "O" : "X";
    document.getElementById('turn').textContent = 'Player ' + turn;
  }
}

function image(cell, turn) {
  if (turn == "X") {
    cell.innerHTML = turn + svastika;
  }

  if (turn == "O") {
    cell.innerHTML = turn + srp;
  }
}

function won(turn) {
  if (turn == "X") {
    document.getElementById('won').innerHTML = "HITLER WON THE WAR!!!" + "<p> <button id='but' onclick='startNewGame()'>Restart</button></p>";
    setTimeout(function () {
      alert("HITLER WON THE WAR!!!");
    }, 10);
  }
  if (turn == "O") {
    document.getElementById('won').innerHTML = "STALIN WON THE WAR!!!" + "<p> <button id='but' onclick='startNewGame()'>Restart</button></p>";
    setTimeout(function () {
      alert("STALIN WON THE WAR!!!");
    }, 10);
  }

  document.getElementById('won').setAttribute("style", "padding:" + 20);
  //document.getElementById('won').setAttribute("style", "max-height:" + N_SIZE * C_SIZE);
}

init();