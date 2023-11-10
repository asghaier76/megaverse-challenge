import { Polyanet } from './polyanet';
import { fillWithSpace } from './utils/wipe';

export class MegaverseService {
  private polyanet: Polyanet;

  constructor() {
    this.polyanet = new Polyanet();
  }

  public async fillMegaverseShape(matrixSize: number, bufferZone: number) {
    for(let id = 0; id < 4; id++) { // process the four quadrants to cover the grid
      try {
        await this.polyanet.fillQuadrantByPolyanets(id);
        // matrix[row][col] = 'POLYANET';
      } catch (error: any) {
        console.error(`Error filling Megaverse matrix [${matrixSize},${bufferZone}]: ${error.message}`);
      }
    }
  }

  public async wipeEntireMegaVerse(matrixSize: number) {
    for(let row = 0; row < matrixSize; row++) {
      for(let col = 0; col < matrixSize; col++) { 
        try {
          await fillWithSpace(row,col);
          console.log('wiping index,',row,col)
        } catch (error: any) {
          console.error(`Error in wiping Megaverse happened at [${row},${col}]: ${error.message}`);
        }
      }
    }
  }

  // Phase 1 function to fill the grid with xShape
  public async fillXShape(matrixSize: number, bufferZone: number): Promise<string[][]> {
    const matrix: string[][] = Array.from({ length: matrixSize }, () =>
      Array.from({ length: matrixSize }, () => 'SPACE')
    );

    // Loop through the matrix and fill the appropriate positions
    for (let row = bufferZone; row <= matrixSize - bufferZone; row++) {
      for (let col = bufferZone; col < matrixSize - bufferZone; col++) {
        if (row === col || row === matrixSize - col - 1) {
          // If the current position is on one of the diagonals, fill it with 🪐POLYanet
          try {
            await this.polyanet.fillPolyanet(row, col);
            matrix[row][col] = 'POLYANET';
          } catch (error: any) {
            console.error(`Error filling position [${row},${col}]: ${error.message}`);
          }
        }
      }
    }

    return matrix;
  }
}