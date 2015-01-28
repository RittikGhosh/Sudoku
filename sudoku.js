function generateSudoku() {

	var grid = [
		[1, 2, 3, 4, 5, 6, 7, 8, 9], 
		[4, 5, 6, 7, 8, 9, 1, 2, 3], 
		[7, 8, 9, 1, 2, 3, 4, 5, 6], 
		[2, 3, 4, 5, 6, 7, 8, 9, 1], 
		[5, 6, 7, 8, 9, 1, 2, 3, 4], 
		[8, 9, 1, 2, 3, 4, 5, 6, 7], 
		[3, 4, 5, 6, 7, 8, 9, 1, 2], 
		[6, 7, 8, 9, 1, 2, 3, 4, 5], 
		[9, 1, 2, 3, 4, 5, 6, 7, 8]
		];

	var hGrid = [
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0], 
		[0, 0, 0, 0, 0, 0, 0, 0, 0]
		];

	shuffle(grid);
	hideTiles(grid, hGrid);
	this.getTileNumber = function(row, col) {
		return hGrid[row][col];
	};

	this.getSolution = function(row, col) {
		return grid[row][col];
	};

	this.setNumber = function(row, col, num) {
		grid[row][col] = num;
	};

	this.solver = function(fGrid, row, col, val) {
		//alert("accessing solver function with value: " + val);
		//alert("fGrid: " + fGrid);
		//alert("row: " + row + ", col: " + col + ", val: " + val);
		var v = this.isValid(fGrid, row, col, val);
		if(!v) {
			//alert("solver: false");
			return false;
		}
		//alert("solver: true");
		return true;
	};

	this.isValid = function(fGrid, row, col, val) {
		//alert("accessing isvalid function with value: " + val);
		//alert("fGrid: "+ fGrid);

		var rowCnt = this.countInstances(fGrid[row], val);
		//alert("fGrid[" + row + "]: " + fGrid[row] + ", rowCnt: " + rowCnt);

		var colCnt = this.countInstances(this.columnToArray(fGrid, col), val);
		//alert("columnToArray(fGrid, " + col + "): " + this.columnToArray(fGrid, col) + ", colCnt: " + colCnt);

		var subCnt = this.countInstances(this.subsquareToArray(fGrid, row, col), val);
		//alert("subsquareToArray(fGrid, " + row + ", " + col + "): " + this.subsquareToArray(fGrid, row, col) + ", subCnt: " + subCnt);

		if(rowCnt == 1 && colCnt == 1 && subCnt == 1) {
			//alert("isvalid: true");
			return true;
		}
		//alert("isvalid: false");
		return false;
	};

	this.columnToArray = function(fGrid, col) {
		//alert("accessing columnToArray function");
		var colArray = [];
		for(var i = 0; i < 9; i++) {
			colArray.push(fGrid[i][col]);
		}
		//alert("colarray: " + colArray);
		return colArray;
	};

	//Convert a subsquare to a 1D array, top left to bottom right
	this.subsquareToArray = function(fGrid, row, col) {
		//alert("accessing subsquareToArray function");
		var subArray = [];
		var subrow = row - (row % 3);
		var subcol = col - (col % 3);
		for(var i = 0; i < 3; i++) {
			for(var j = 0; j < 3; j++) {
				subArray.push(fGrid[i+subrow][j+subcol]);
			}
		}
		//alert("subarray: " + subArray);
		return subArray;
	};

	this.countInstances = function(xGrid, val) {
		var cnt = 0;
		for(var i = 0; i < xGrid.length; i++) {
			if(xGrid[i] == val) cnt++;
		}
		return cnt;
	};
}

function shuffle(grid) {

	var i, j, k, temp, col, col1, col2,
	row1, row2, sub, sub1, sub2, num1, num2;

	//swap the same columns of each subsquare
	for(i = 0; i < 25; i++) {
		col = Math.floor(Math.random()*3);
		sub1 = Math.floor(Math.random()*3);
		sub2 = Math.floor(Math.random()*3);
		for(j = 0; j < grid.length; j++) {
			temp = grid[j][col + sub1*3];
			grid[j][col + sub1*3] = grid[j][col + sub2*3];
			grid[j][col + sub2*3] = temp;
		}
	}

	//swap all columns within each subsquare
	for(i = 0; i < 25; i++) {
		sub = Math.floor(Math.random()*3);
		col1 = Math.floor(Math.random()*3);
		col2 = Math.floor(Math.random()*3);
		while(col1 == col2) col2 = Math.floor(Math.random()*3);
		for(j = 0; j < grid.length; j++) {
			temp = grid[j][sub*3 + col1];
			grid[j][sub*3 + col1] = grid[j][sub*3 + col2];
			grid[j][sub*3 + col2] = temp;
		}
	}

	//swap all rows within each subsquare
	for(i = 0; i < 25; i++) {
		sub = Math.floor(Math.random()*3);
		row1 = Math.floor(Math.random()*3);
		row2 = Math.floor(Math.random()*3);
		while(row1 == row2) row2 = Math.floor(Math.random()*3);
		for(j = 0; j < grid.length; j++) {
			temp = grid[sub*3 + row1][j];
			grid[sub*3 + row1][j] = grid[sub*3 + row2][j];
			grid[sub*3 + row2][j] = temp;
		}
	}

	//swap one number with another
	for(i = 0; i < 25; i++) {
		num1 = Math.floor(Math.random()*9 + 1);
		num2 = Math.floor(Math.random()*9 + 1);
		while(num1 == num2) num2 = Math.floor(Math.random()*9 + 1);
		for(j = 0; j < grid.length; j++) {
			for(k = 0; k < grid[j].length; k++) {
				if(grid[j][k] == num1)
					grid[j][k] = num2;
				else if(grid[j][k] == num2)
					grid[j][k] = num1;
			}
		}
	}
}

function hideTiles(aGrid, hiddenGrid) {

	// Randomly hide tiles, no guarantee for a unique solution
	var numTiles, k;

	for(var c = 0; c < 9; c++) {
		for(var d = 0; d < 9; d++) {
			hiddenGrid[c][d] = aGrid[c][d];
		}
	}

	for(var i = 0; i < 4; i++) {
		numTiles = Math.floor(Math.random()*8 + 6);
		while(numTiles > 0) {
			k = Math.floor(Math.random()*9);
			hiddenGrid[i][k] = 0;
			hiddenGrid[8-i][8-k] = 0;
			numTiles--;
			
		}
	}

	numTiles = Math.floor(Math.random()*4 + 2);
	while(numTiles > 0) {
		k = Math.floor(Math.random()*4);
		hiddenGrid[4][k] = 0;
		hiddenGrid[4][8-k] = 0;
		numTiles--;
	}
}

	/*
	for(var i = 0; i < 9; i++) {
		for(var j = 0; j < 9; j++) {
			var temp = grid[i][j];
			grid[i][j] = "";
			for(var k = 0; k < 9; k++) {
				if( solver() ) {
					var pos = [i][j];
					hiddenGrid.push(pos);
				}
				else {// not unique
					grid[i][j] = temp;
				}
			}
		}
	}

	*/



