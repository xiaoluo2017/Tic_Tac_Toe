var board = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];
var step = 0;
var isUserRound = true;
var userPiece = "X", robotPiece = "O";
var isRoundX = true;
var gameover = false;
var victory;

$(document).ready(function() {
  $("#X").on("click", function(){ 
    if (gameover) {
      startGame();
    }
  });

  $("#O").on("click", function(){ 
    if (gameover) {
      startGame();
    } 
    if (step === 0) {
      $("p").text("")
      isUserRound = false;
      userPiece = "O";
      robotPiece = "X";
      isRoundX = false;
      roundOfO();
      if(!gameover) robotRound();
    }
  });

  $("#row0col0").on("click", function(){ 
    if (!gameover && isUserRound && board[0][0] === "0") {
      $("#row0col0").text(userPiece);
      changeRound(0, 0);
      if(!gameover) robotRound();
    }
  });

  $("#row0col1").on("click", function(){ 
    if (!gameover && isUserRound && board[0][1] === "0") {
      $("#row0col1").text(userPiece);
      changeRound(0, 1);
      if(!gameover) robotRound();
    }
  });

  $("#row0col2").on("click", function(){ 
    if (!gameover && isUserRound && board[0][2] === "0") {
      $("#row0col2").text(userPiece);
      changeRound(0, 2);
      if(!gameover) robotRound();
    }
  });

  $("#row1col0").on("click", function(){ 
    if (!gameover && isUserRound && board[1][0] === "0") {
      $("#row1col0").text(userPiece);
      changeRound(1, 0);
      if(!gameover) robotRound();
    }
  });

  $("#row1col1").on("click", function(){ 
    if (!gameover && isUserRound && board[1][1] === "0") {
      $("#row1col1").text(userPiece);
      changeRound(1, 1);
      if(!gameover) robotRound();
    }
  });

  $("#row1col2").on("click", function(){ 
    if (!gameover && isUserRound && board[1][2] === "0") {
      $("#row1col2").text(userPiece);
      changeRound(1, 2);
      if(!gameover) robotRound();
    }
  });

  $("#row2col0").on("click", function(){ 
    if (!gameover && isUserRound && board[2][0] === "0") {
      $("#row2col0").text(userPiece);
      changeRound(2, 0);
      if(!gameover) robotRound();
    }
  });

  $("#row2col1").on("click", function(){ 
    if (!gameover && isUserRound && board[2][1] === "0") {
      $("#row2col1").text(userPiece);
      changeRound(2, 1);
      if(!gameover) robotRound();
    }
  });

  $("#row2col2").on("click", function(){ 
    if (!gameover && isUserRound && board[2][2] === "0") {
      $("#row2col2").text(userPiece);
      changeRound(2, 2);
      if(!gameover) robotRound();
    }
  });
});

function robotRound() {
  var position = robotChoose();
  var id = "#row" + position[0] + "col" + position[1];
  window.setTimeout(function () {
    $(id).text(robotPiece);
    changeRound(position[0], position[1]);
  }, 800);
}

function robotChoose() {
  var random;
  if (step === 1 && board[1][1] === userPiece) {
    var corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
    random = Math.floor(Math.random() * corners.length);
    return corners[random];
  } 
  var res = [], rate = 0;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board[i][j] === "0") {
        var currRate = computeRate(i, j);
        if (currRate > rate) {
          res = [[i, j]];
          rate = currRate;
        } else if (currRate === rate) {
          res.push([i, j]);
        }
      }
    }
  }
  console.log(rate);
  random = Math.floor(Math.random() * res.length);
  return res[random];
}

function computeRate(i, j) {
  var rate1 = computeRowrate(i);
  var rate2 = computeColumeRate(j);
  var rate3 = i === j ? computeMainDiagonalRate() : 0;
  var rate4 = i === 2 - j ? computeMinorDiagonalRate() : 0;
  return rate1 + rate2 + rate3 + rate4;
}

function computeRowrate(i) {
  var userCnt = 0, robotCnt = 0;
  for (var j = 0; j < 3; j++) {
    if (board[i][j] === userPiece) {
      userCnt++;
    } else if (board[i][j] === robotPiece) {
      robotCnt++;
    }
  }
  if (robotCnt === 2) {
    // victory = [[i, 0], [i, 1], [i, 2]];
    return 21;
  }
  if (userCnt === 2) return 5;
  if (robotCnt === 1 && userCnt === 0) return 1;
  return 0;
}

function computeColumeRate(j) {
  var userCnt = 0, robotCnt = 0;
  for (var i = 0; i < 3; i++) {
    if (board[i][j] === userPiece) {
      userCnt++;
    } else if (board[i][j] === robotPiece) {
      robotCnt++;
    }
  }
  if (robotCnt === 2) {
    // victory = [[0, j], [1, j], [2, j]];
    return 21;
  }
  if (userCnt === 2) return 5;
  if (robotCnt === 1 && userCnt === 0) return 1;
  return 0;
}

function computeMainDiagonalRate() {
  var userCnt = 0, robotCnt = 0;
  for (var i = 0; i < 3; i++) {
    if (board[i][i] === userPiece) {
      userCnt++;
    } else if (board[i][i] === robotPiece) {
      robotCnt++;
    }
  }
  if (robotCnt === 2) {
    // victory = [[0, 0], [1, 1], [2, 2]];
    return 21;
  }
  if (userCnt === 2) return 5;
  if (robotCnt === 1 && userCnt === 0) return 1;
  return 0;
}

function computeMinorDiagonalRate() {
  var userCnt = 0, robotCnt = 0;
  for (var i = 0; i < 3; i++) {
    if (board[i][2 - i] === userPiece) {
      userCnt++;
    } else if (board[i][2 - i] === robotPiece) {
      robotCnt++;
    }
  }
  if (robotCnt === 2) {
    // victory = [[0, 2], [1, 1], [2, 0]];
    return 21;
  }
  if (userCnt === 2) return 5;
  if (robotCnt === 1 && userCnt === 0) return 1;
  return 0;
}

function changeRound(i, j) {
  board[i][j] = isUserRound ? userPiece : robotPiece;
  step++;
  if (isRoundX) {
    roundOfO();
    isRoundX = false;
  } else {
    roundOfX();
    isRoundX = true;
  }
  isUserRound = !isUserRound;
  checkVictory(i, j);
  if (step === 9 || gameover) endGame();
}

function roundOfO() {
  $("#O").css("border-bottom", "2px solid red");
  $("#X").css("border-bottom", "0px solid white");
}

function roundOfX() {
  $("#O").css("border-bottom", "0px solid white");
  $("#X").css("border-bottom", "2px solid red");
}

function checkVictory(i, j) {
  if (i === 2 - j && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    victory = [[0, 2], [1, 1], [2, 0]];
  } else if (i === j && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    victory = [[0, 0], [1, 1], [2, 2]];
  } else if (board[0][j] === board[1][j] && board[1][j] == board[2][j]) {
    victory = [[0, j], [1, j], [2, j]];
  } else if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
    victory = [[i, 0], [i, 1], [i, 2]];
  }

  console.log(isUserRound);
  if (victory !== undefined) {
    gameover = true;
    window.setTimeout(function(){
      for (var i = 0; i < 3; i++) {
        var id = "#row" + victory[i][0] + "col" + victory[i][1];
        $(id).css("color", "red");
      }
      if (isUserRound) {
        $("#result").text("Uh oh, you lost..");
        // 1500ms delay, so isUserRound === false if is "user round"
        
      } else {
        $("#result").text("Congratulations, you won!");
      }
      $("#explain").text("Select a player to start a new game");
      endGame();
    }, 1500);
  }
}

function endGame() {
  gameover = true;
  if (step === 9 && victory === undefined) {
    window.setTimeout(function(){
      $("#result").text("It was a draw..");
      $("#explain").text("Select a player to start a new game");
    }, 1500);
  }
}

function startGame(symbol) {
  board = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];
  step = 0;
  isUserRound = true;
  userPiece = "X";
  robotPiece = "O";
  isRoundX = true;
  gameover = false;
  roundOfX();
  if (victory !== undefined) {
    for (var i = 0; i < 3; i++) {
      var id = "#row" + victory[i][0] + "col" + victory[i][1];
      $(id).css("color", "#343a40");
    }
  }
  victory = undefined;
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var id = "#row" + i + "col" + j;
      $(id).text("");
    }
  }
  $("#result").text("Start the game or select the player");
  $("#explain").text("");
}
