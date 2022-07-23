let $canvas = document.getElementById("myCanvas");
let ctx = $canvas.getContext('2d');
let x = $canvas.width/2;
let y = $canvas.height - 30;
let score = 0;
let score_e = document.getElementById("Score");
let start = confirm("Press to start");
ctx.font = "bold 23px monospace";
ctx.fillStyle = "black";
if(start == false){
    alert("good bye");
    document.location.reload();
}

let dx = 2;
let dy = -2;
let ballRadius = 10; //반지름

//패들 변수 모음
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = ($canvas.width-paddleWidth)/2;

//키모드 변수 모음
let rightPressed = false;
let leftPressed = false;
document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp);
// 스마트폰 터치 이벤트
document.addEventListener("touchstart", touchstartHandler);
document.addEventListener("touchend", touchendHandler);

function touchstartHandler(e){
    let touchX = e.changedTouches[0].clientX;
    if(touchX >=0 && touchX <= $canvas.width/2) leftPressed = true;
    else if(touchX > $canvas.width/2 && touchX <= $canvas.width) rightPressed = true;
}
function touchendHandler(e){
    rightPressed = false;
    leftPressed = false;

}


function keyDown(e){
   // console.log(e.keyCode);
   if(e.keyCode == 39){
    rightPressed = true;
   }
   else if(e.keyCode == 37){
    leftPressed = true;
   }
}
function keyUp(e){
    if(e.keyCode == 39){
        rightPressed = false;
       }
       else if(e.keyCode == 37){
        leftPressed = false;
       }

}

function drawPaddle(){
    ctx.beginPath();
    ctx.rect(paddleX, $canvas.height-paddleHeight, paddleWidth, paddleHeight);
    
    ctx.fillStyle = "#FFD228";
    ctx.fill();
    ctx.closePath();
}


function drawBall(){
    ctx.beginPath(); //새로운 그림 시작
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#CD2E57";
    ctx.fill();
    ctx.closePath(); // 그림 그리기 끝
}

function draw() {
    ctx.clearRect(0, 0, $canvas.width, $canvas.height);
    drawBall();
    drawPaddle();
    ctx.fillText("Score: ", 20, 30);
    ctx.fillText(score, 100,30);
    ctx.fillStyle = "#D24C7F"
    if(x + dx > $canvas.width-ballRadius || x + dx < ballRadius){ 
        dx = -dx;
    }
    if(y + dy < ballRadius){
        dy = -dy;
    } else if(y + dy > $canvas.height - ballRadius){
        if(x >paddleX && x < paddleX + paddleWidth){
            dy = -dy;
            score ++;
        }else{
            alert("GAME OVER");
            clearInterval(set_id);
            document.location.reload();
        }
    }




    if(rightPressed && paddleX < $canvas.width - paddleWidth){
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0){
        paddleX -= 7;
    }
    x += dx;
    y += dy;
    score_e.innerText = "Score : " + score;
    }


let set_id = setInterval(draw, 10);
