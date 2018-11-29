document.writeln("<h1>2048</h1>");
document.writeln("<h3>Try if you can finish the game !</h3>");

document.writeln('<div id="score">Score : 0</div>');

document.writeln('<input id="start-game" type="button" value="Reset">'); //button reset
document.writeln('<div class="clear"></div>');

document.writeln('<div id="canvas-block">');
document.writeln('<canvas id="canvas" width="500" height="500"></canvas>');
document.writeln('</div>');

document.writeln("<h3>Use Up, Down, Left, Right, or W, S, A, F </h3>");
document.writeln("<h3>to move the blocks and make them add with each other.</h3>");
document.writeln("<h3>You win if you reach 2048!</h3>");

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d'); //get environ, func
var i, j, row, col;
var score = 0; //reset score=0
var width = (500/4) - 10;
var cells = [];
var flag_left_right=0, flag_up_down=0;

create();
draw();
stick(); //two buttoms need to be random
stick();

var start_games = document.getElementById('start-game');
start_games.onclick = function () {
    clean_canvas();

    create();//click to reset
  	draw();
  	stick();
  	stick();
}

function cell(row, col) {
  this.value = 0;
  this.x = col * width + 8 * (col + 1);
  this.y = row * width + 8 * (row + 1);
}

function create() {
  for(i = 0; i < 4; i++) {
    cells[i] = [];
    for(j = 0; j < 4; j++) {
      cells[i][j] = new cell(i, j);
    }
  }
}

function clean_canvas() {
  ctx.clearRect(0, 0, 500, 500);
}

document.onkeydown = function (event) { //if press keyboard
    if (event.keyCode === 38 || event.keyCode === 87) { //up 38, W 87
      up(); 
    } else if (event.keyCode === 39 || event.keyCode === 68) { 
      right();
    } else if (event.keyCode === 40 || event.keyCode === 83) {
      down(); 
    } else if (event.keyCode === 37 || event.keyCode === 65) {
      left(); 
    }
    document.getElementById('score').innerHTML = 'Score : ' + score;
}

function draw() {
  for(i = 0; i < 4; i++) {
    for(j = 0; j < 4; j++) {
		ctx.beginPath();
  		ctx.rect(cells[i][j].x, cells[i][j].y, width, width); //x, y and width, height
  		switch (cells[i][j].value){
    		case 0 : ctx.fillStyle = '#9e626f'; break;  
    		case 2 : ctx.fillStyle = '#f0e8e0'; break; 
    		case 4 : ctx.fillStyle = '#fbb6b9'; break;
    		case 8 : ctx.fillStyle = '#fb9bbe'; break;
    		case 16 : ctx.fillStyle = '#f972a4'; break;
    		case 32 : ctx.fillStyle = '#f1486f'; break;
    		case 64 : ctx.fillStyle = '#ee2d53'; break; 
    		case 128 : ctx.fillStyle = '#f75052'; break;
    		case 256 : ctx.fillStyle = '#f84848'; break; 
    		case 512 : ctx.fillStyle = '#ff5959'; break;
    		case 1024 : ctx.fillStyle = '#f30e5c'; break;
    		case 2048 : ctx.fillStyle = '#c50d66'; break;
  		}
  		ctx.fill();
  		if (cells[i][j].value) {
  			if(cells[i][j].value<=4){
  				ctx.fillStyle = '#994347'; //color of the num =2, 4
  			}else{
  				ctx.fillStyle = '#fff'; // color of other num
  			}
    		ctx.font = width/2 + 'px monospace'; //font of the num
    
    		ctx.textAlign = 'center';
    		ctx.fillText(cells[i][j].value, cells[i][j].x+width/2, cells[i][j].y+width/2+17); //num, x, y
    		if(cells[i][j].value==2048){
    			swal("Congrats!", "You make it to 2048!", "success") //fancy alert pop out
    			.then((value) => {  //after alert, reload the page
    				window.location.reload();
    			});
  		
    		}
  		}

    }
  }
}

function stick() {
  var countFree = 0;
  flag_left_right=0, flag_up_down=0;
  for(i = 0; i < 4; i++) {
    for(j = 0; j < 4; j++) {
      if(!cells[i][j].value) {
        countFree++;
      }
    }
  }

  if(!countFree){
  	flag_up_down=1;
  	flag_left_right=1;
  	for(i = 0; i < 3; i++) {
    	for(j = 0; j < 3; j++) {
     		if(cells[i+1][j].value==cells[i][j].value){
     			flag_up_down=0;
     		}
     		if(cells[i][j+1].value==cells[i][j].value){
     			flag_left_right=0;
     		}
    	}
  	}
  }
  if(flag_up_down==1 && flag_left_right==1) {
  	//finish game
    swal("Oops" ,  "You failed! Want to try again?" ,  "error") //fancy alert pop out
  	.then((value) => {  //after alert, reload the page
    	window.location.reload();
  	});

    return;
  }
  while(true) {
  	if(!countFree) return;
    row = Math.floor(Math.random() * 4);
    col = Math.floor(Math.random() * 4);
    if(!cells[row][col].value) {
      cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
      draw();
      return;
    }
  }
}

function right () {
	if(flag_left_right==1) return;
  for(i = 0; i < 4; i++) {
    for(j = 2; j >= 0; j--) {
      if(cells[i][j].value) {
        col = j;
        while (col + 1 < 4) {
          if (!cells[i][col + 1].value) {
            cells[i][col + 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col++;
          } else if (cells[i][col].value == cells[i][col + 1].value) {
            cells[i][col + 1].value *= 2;
            score +=  cells[i][col + 1].value;
            cells[i][col].value = 0;
            break;
          } else {
            break;
          }
        }
      }
    }
  }
  stick();
}

function left() {
	if(flag_left_right==1) return;
  for(i = 0; i < 4; i++) {
    for(j = 1; j < 4; j++) {
      if(cells[i][j].value) {
        col = j;
        while (col - 1 >= 0) {
          if (!cells[i][col - 1].value) {
            cells[i][col - 1].value = cells[i][col].value;
            cells[i][col].value = 0;
            col--;
          } else if (cells[i][col].value == cells[i][col - 1].value) {
            cells[i][col - 1].value *= 2;
            score +=   cells[i][col - 1].value;
            cells[i][col].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  stick();
}

function up() {
	if(flag_up_down==1) return;
  for(j = 0; j < 4; j++) {
    for(i = 1; i < 4; i++) {
      if(cells[i][j].value) {
        row = i;
        while (row > 0) {
          if(!cells[row - 1][j].value) {
            cells[row - 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row--;
          } else if (cells[row][j].value == cells[row - 1][j].value) {
            cells[row - 1][j].value *= 2;
            score +=  cells[row - 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  stick();
}

function down() {
	if(flag_up_down==1) return;
  for(j = 0; j < 4; j++) {
    for(i = 2; i >= 0; i--) {
      if(cells[i][j].value) {
        row = i;
        while (row + 1 < 4) {
          if (!cells[row + 1][j].value) {
            cells[row + 1][j].value = cells[row][j].value;
            cells[row][j].value = 0;
            row++;
          } else if (cells[row][j].value == cells[row + 1][j].value) {
            cells[row + 1][j].value *= 2;
            score +=  cells[row + 1][j].value;
            cells[row][j].value = 0;
            break;
          } else {
            break; 
          }
        }
      }
    }
  }
  stick();
}





