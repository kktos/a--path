
export const CELL_SIZE= 15;

export interface Rect {
	x: number;
	y: number;
	width: number;
	height: number;
}
export interface Cell {
	type: number;
	box: Rect;
}

export class Grid  {

	private grid: Cell[][];
	private width: number;
	private height: number;
	private cellSize: number;

	constructor(width: number, height: number, cellSize: number= CELL_SIZE) {
		this.grid= [];
		this.width= width;
		this.height= height;
		this.cellSize= cellSize;
		const colCount= Math.floor(width/cellSize);
		const rowCount= Math.floor(height/cellSize);
		for(let col= 0; col<colCount; col++) {
			this.grid[col]= <Array<Cell>>[];
			for(let row= 0; row<rowCount; row++) {
				this.grid[col].push({type:0, box:{
					x: col*cellSize+3,
					y: row*cellSize+3,
					width: ((col+1)*cellSize - col*cellSize)-6,
					height: ((row+1)*cellSize - row*cellSize)-6
				}});
			}
		}
	}

	draw(ctx: CanvasRenderingContext2D) {  
		for(let col= 0; col<this.grid.length; col++) {
		  const v= this.grid[col];
		  for(let row= 0; row<v.length; row++) {
			const cell= v[row];
			switch(cell.type) {
			  case 0:
				ctx.fillStyle= "blue";
				break;
			}
			ctx.fillRect(cell.box.x, cell.box.y, cell.box.width, cell.box.height);
		  }
		}
	  }

	  drawSelectedCell(ctx: CanvasRenderingContext2D, x: number, y: number) {
		const cell= this.getCellAt(x, y);
		if(!cell)
			return;
		ctx.fillStyle= "yellow";
		ctx.fillRect(cell.box.x, cell.box.y, cell.box.width, cell.box.height);
	  }	

	  getCellAt(x: number, y: number) {
		for(let col= 0; col<this.grid.length; col++) {
			const v= this.grid[col];
			for(let row= 0; row<v.length; row++) {
				const cell= v[row];
				if(ptInRect(x,y,cell.box))
					return cell;
			}
		}
		return null;
	  }	

}

function ptInRect(x:number, y:number, box: Rect) {
	return box.x <= x && x <= box.x + box.width &&
			box.y <= y && y <= box.y + box.height;
}
