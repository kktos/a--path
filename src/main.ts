import { Grid } from "./grid";
import './style.css';

let ctx: CanvasRenderingContext2D;
let grid: Grid;
let w: number;
let h: number;
let mouseX: number= 0;
let mouseY: number= 0;
let x= 0;
let y= 0;


let lastTime= 0;
let acc= 0;
let inc= 1/30;
function loop(dt= 0) {
  acc+= (dt - lastTime) / 1000;
  while(acc > inc) {
    acc-= inc;
    draw();
  }
  lastTime= dt;
  requestAnimationFrame((dt)=> loop(dt));
}

function draw() {
  ctx.fillStyle= "black";
	ctx.fillRect(0, 0, w, h);
  
  grid.draw(ctx);
  grid.drawSelectedCell(ctx, mouseX, mouseY);

  ctx.fillStyle= "white";
  ctx.fillText(`X:${x} Y:${y} - mouseX:${mouseX} mouseY:${mouseY}`,5,h-5);

}

function main(canvas:HTMLCanvasElement) {
  ctx= canvas.getContext("2d", {alpha: false}) as any;
  if(!ctx)
    return;
  ctx.imageSmoothingEnabled= false;

  w= canvas.clientWidth;
  h= canvas.clientHeight;
  canvas.width= w;
  canvas.height= h;

  grid= new Grid(w, h); 
  const bbox= canvas.getBoundingClientRect();
  console.log({bbox});

  // document.addEventListener("click", (evt) => {
  //   const x= evt.clientX;
  //   const y= evt.clientY;
  //   const cell= getCellFromMouse(grid, x-bbox.x, y-bbox.y);
  //   console.log(cell);
  // });
  document.addEventListener("mousemove", (evt) => {
    x= evt.clientX;
    y= evt.clientY;
    mouseX= Math.floor(x-bbox.x);
    mouseY= Math.floor(y-bbox.y);
  });
  
  loop();
}

const canvas= document.querySelector<HTMLCanvasElement>('#screen');

console.log({canvas});

if(canvas)
  main(canvas);