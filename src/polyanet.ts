import { crossMintApi } from './utils/crossMintApi';
import { quadrantTransform } from './utils/indexTransformer';
import { PolyanetIndex } from './models';


enum Direction {
    'ROW' , 'COL'
}
export class Polyanet {
  private urlSegment = 'polyanets'

  constructor() {}


  public async fillPolyanet(polyanetIdx: PolyanetIndex, quadrantId: number = 0): Promise<void> {
    const transformedIndex = quadrantTransform(quadrantId, polyanetIdx);
      try {
        await crossMintApi.post(this.urlSegment, transformedIndex)
      } catch (error: any) {
        throw error;
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