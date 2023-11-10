import { crossMintApi } from './utils/crossMintApi';

enum Direction {
    'ROW' , 'COL'
}
export class Polyanet {
  private urlSegment = 'polyanets'

  constructor() {}


  public async fillPolyanet(row: number, column: number, quadrantId: number = 0): Promise<void> {
    let retries = 5; // Number of retries
    let delay = 2000; // Initial delay in milliseconds
    switch(quadrantId) {
        case 1:
            column = 26 -column;
            break;
        case 2:
            row = 26 -row;
            column = 26 -column;
            break;
        case 3:
            row = 26 - row;
            break;
        default:
            break;
    }
    for (let i = 0; i < retries; i++) {
      try {
        await crossMintApi.post(this.urlSegment, { row, column })
        // await axios.post(this.apiUrl, { row, column, candidateId });
        break; // If the request is successful, exit the loop
      } catch (error: any) {
        if (error.response && error.response.status === 429 && i < retries - 1) {
          // Wait for the specified delay before retrying
          await new Promise(resolve => setTimeout(resolve, delay));
          delay *= 2; // Double the delay for the next retry
        } else {
          // If it's not a 429 error or we've exhausted retries, throw the error
          throw error;
        }
      }
    }
  }

  public async fillRowColSequence(quadrantId: number, direction: Direction): Promise<string[][]> {
    const quadrantGridSize = 14;
    const bufferZone = 2;
    const matrix: string[][] = Array.from({ length: quadrantGridSize }, () =>
      Array.from({ length: quadrantGridSize }, () => 'SPACE')
    );
    let col = bufferZone;
    let directionCounter = 0;
    for (let row = bufferZone; row < quadrantGridSize; row++) {
            console.log({direction,directionCounter,row,col})

            try {
                await this.fillPolyanet(row, col, quadrantId);   
                matrix[row][col] = 'POLYANET';
                console.log({row,col})            
                if(direction === Direction.COL) {
                    col++;
                } else {
                    row++;
                }
                await this.fillPolyanet(row, col, quadrantId); 
                matrix[row][col] = 'POLYANET';
                console.log({row,col})
                if(directionCounter === 3) {
                    directionCounter = 0;
                    direction = this.flipDirection(direction);
                } else {
                    directionCounter++
                }
            } catch (error: any) {
                console.error(`Error filling position [${row},${col}]: ${error.message}`);
            }
            col++;

    }
    return matrix;
  }

  public async fillQuadrantByPolyanets(quadrantId: number): Promise<void> {
    const quadrantGridSize = 14;
    let direction: Direction = Direction.COL;
    let matrix: string[][] = Array.from({ length: quadrantGridSize }, () =>
      Array.from({ length: quadrantGridSize }, () => 'SPACE')
    );
    // for (let row = 0; row <= 1; row++) {
    //     for(let col = 0; col <= 1; col++) {
    //         await this.clearItem(row,col)
    //     }
    // }
    matrix = await this.fillRowColSequence(quadrantId, direction);
    direction = Direction.ROW;
    matrix = await this.fillRowColSequence(quadrantId, direction);
    console.log('Quadrant filled successfully, here is the submitted matrix content.');
    console.log(JSON.stringify({ goal: matrix }, null, 2));
  }


  flipDirection(direction: Direction): Direction {
    return direction === Direction.ROW ? Direction.COL : Direction.ROW;
  }

}