import { Polyanet } from './polyanet';

export class MegaverseService {
  private polyanet: Polyanet;

  constructor(baseApiUrl: string) {
    this.polyanet = new Polyanet(baseApiUrl);
  }

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