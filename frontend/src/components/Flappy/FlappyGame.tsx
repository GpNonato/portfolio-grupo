import { useEffect, useRef } from "react";

type GameState = "MENU" | "WAITING" | "PLAYING" | "GAMEOVER" | "SCORES";

export default function FlappyGame() {

const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {

const canvas = canvasRef.current!;
const ctx = canvas.getContext("2d")!;

const width = canvas.width;
const height = canvas.height;

let state: GameState = "MENU";

let birdY = height / 2;
let velocity = 0;

let pipes: any[] = [];
let frame = 0;

let score = 0;
let best = Number(localStorage.getItem("flappyBest") || 0);

function resetGame(){
birdY = height/2;
velocity = 0;
pipes = [];
frame = 0;
score = 0;
}

function spawnPipe(){

const gap = 140;
const top = Math.random() * 180 + 40;

pipes.push({
x: width,
top,
bottom: top + gap
});

}

function updateGame(){

velocity += 0.45;
birdY += velocity;

pipes.forEach(p=>{
p.x -= 2;
});

if(frame % 120 === 0){
spawnPipe();
}

pipes.forEach(p=>{
if(p.x === 80){
score++;
}
});

frame++;

}

function detectCollision(){

if(birdY > height || birdY < 0){
return true;
}

for(const p of pipes){

if(
80 > p.x &&
80 < p.x + 60 &&
(birdY < p.top || birdY > p.bottom)
){
return true;
}

}

return false;

}

function drawGame(){

ctx.clearRect(0,0,width,height);

ctx.fillStyle="#87CEEB";
ctx.fillRect(0,0,width,height);

ctx.font = "28px serif";
ctx.fillText("🐥", 65, birdY + 10);

ctx.fillStyle="green";

pipes.forEach(p=>{
ctx.fillRect(p.x,0,60,p.top);
ctx.fillRect(p.x,p.bottom,60,height);
});

ctx.fillStyle="black";
ctx.font="20px Arial";
ctx.textAlign="left";
ctx.fillText("Score: "+score,10,25);

}

function drawMenu(){

ctx.clearRect(0,0,width,height);

ctx.fillStyle="#0f172a";
ctx.fillRect(0,0,width,height);

ctx.fillStyle="white";
ctx.textAlign="center";

ctx.font="36px Arial";
ctx.fillText("FLAPPY BIRD",width/2,140);

ctx.font="24px Arial";
ctx.fillText("PLAY",width/2,240);

ctx.fillText("SCORES",width/2,300);

ctx.fillText("QUIT",width/2,360);

}

function drawWaiting(){

ctx.clearRect(0,0,width,height);

ctx.fillStyle="#020617";
ctx.fillRect(0,0,width,height);

ctx.fillStyle="white";
ctx.textAlign="center";

ctx.font="34px Arial";
ctx.fillText("FLAPPY BIRD",width/2,200);

ctx.font="20px Arial";
ctx.fillText("Press SPACE to start",width/2,260);

}

function drawScores(){

ctx.clearRect(0,0,width,height);

ctx.fillStyle="#1e293b";
ctx.fillRect(0,0,width,height);

ctx.fillStyle="white";
ctx.textAlign="center";

ctx.font="30px Arial";
ctx.fillText("HIGH SCORE",width/2,200);

ctx.font="28px Arial";
ctx.fillText(best.toString(),width/2,260);

ctx.font="18px Arial";
ctx.fillText("Click to return",width/2,340);

}

function drawGameOver(){

ctx.fillStyle="rgba(0,0,0,0.8)";
ctx.fillRect(0,0,width,height);

ctx.fillStyle="white";
ctx.textAlign="center";

ctx.font="36px Arial";
ctx.fillText("GAME OVER",width/2,240);

ctx.font="24px Arial";
ctx.fillText("Score: "+score,width/2,290);

ctx.font="18px Arial";
ctx.fillText("Press SPACE to menu",width/2,340);

}

function loop(){

ctx.clearRect(0,0,width,height);

if(state==="MENU"){
drawMenu();
}

else if(state==="WAITING"){
drawWaiting();
}

else if(state==="PLAYING"){

updateGame();
drawGame();

if(detectCollision()){

state="GAMEOVER";

if(score>best){
best=score;
localStorage.setItem("flappyBest",best.toString());
}

}

}

else if(state==="SCORES"){
drawScores();
}

else if(state==="GAMEOVER"){
drawGame();
drawGameOver();
}

requestAnimationFrame(loop);

}

function clickHandler(e:MouseEvent){

const rect=canvas.getBoundingClientRect();
const y=e.clientY-rect.top;

if(state==="MENU"){

if(y>220 && y<260){
resetGame();
state="WAITING";
}

if(y>280 && y<320){
state="SCORES";
}

if(y>340 && y<380){
window.location.reload();
}

}

else if(state==="SCORES"){
state="MENU";
}

}
function moveHandler(e: MouseEvent) {

    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;

    if (state === "MENU") {

        if (
            (y > 220 && y < 260) ||
            (y > 280 && y < 320) ||
            (y > 340 && y < 380)
        ) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }

    } else if (state === "GAMEOVER") {

        if (y > 320 && y < 360) {
            canvas.style.cursor = "pointer";
        } else {
            canvas.style.cursor = "default";
        }

    } else {

        canvas.style.cursor = "default";

    }
}
function keyHandler(e:KeyboardEvent){

if(e.code!=="Space") return;

if(state==="WAITING"){
state="PLAYING";
velocity=-7;
}

else if(state==="PLAYING"){
velocity=-7;
}

else if(state==="GAMEOVER"){
state="MENU";
}

}

canvas.addEventListener("click",clickHandler);
canvas.addEventListener("mousemove", moveHandler);
window.addEventListener("keydown",keyHandler);

loop();

return ()=>{

canvas.removeEventListener("click",clickHandler);
window.removeEventListener("keydown",keyHandler);

};

},[]);

return(

<canvas
ref={canvasRef}
width={400}
height={600}
style={{
borderRadius:"12px",
boxShadow:"0 20px 40px rgba(0,0,0,0.4)"
}}
/>

);

}