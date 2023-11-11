import { crossMintApi } from './utils/crossMintApi';
import { quadrantTransform } from './utils/indexTransformer';
import { PolyanetIndex } from './models';
import { Logger } from './logger';

enum Direction {
    'ROW' , 'COL'
}
export class Polyanet {
  private urlSegment = 'polyanets'

  constructor() {}


  public async fillPolyanet(polyanetIdx: PolyanetIndex, quadrantId: number = 0): Promise<void> {
    const transformedIndex = quadrantTransform(quadrantId, polyanetIdx);
      try {
        await crossMintApi.post(this.urlSegment, transformedIndex);
        Logger.info(`Building the Megaverse one 🪐POLYanet at an index [${transformedIndex.row}, ${transformedIndex.column}] `);
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
    let column = bufferZone;
    let directionCounter = 0;
    for (let row = bufferZone; row < quadrantGridSize; row++) {
            try {
                Logger.debug(`Sending 🪐POLYanet to index [${row},${column}]`)            
                await this.fillPolyanet({row, column}, quadrantId);   
                matrix[row][column] = 'POLYANET';
                if(direction === Direction.COL) {
                    column++;
                } else {
                    row++;
                }
                await this.fillPolyanet({row, column}, quadrantId); 
                matrix[row][column] = 'POLYANET';
                console.log({row,column})
                if(directionCounter === 3) {
                    directionCounter = 0;
                    direction = this.flipDirection(direction);
                } else {
                    directionCounter++
                }
            } catch (error: any) {
                Logger.error(`Error filling a 🪐POLYanet at position [${row},${column}]: ${error.message}`);
            }
            column++;

    }
    return matrix;
  }

  public async fillQuadrantByPolyanets(quadrantId: number): Promise<void> {
    const quadrantGridSize = 14;
    let direction: Direction = Direction.COL;
    let matrix: string[][] = Array.from({ length: quadrantGridSize }, () =>
      Array.from({ length: quadrantGridSize }, () => 'SPACE')
    );
 
    matrix = await this.fillRowColSequence(quadrantId, direction);
    direction = Direction.ROW;
    matrix = await this.fillRowColSequence(quadrantId, direction);
    Logger.info('Quadrant filled successfully, here is the submitted matrix content.');
    Logger.info(JSON.stringify({ goal: matrix }, null, 2));
  }


  flipDirection(direction: Direction): Direction {
    return direction === Direction.ROW ? Direction.COL : Direction.ROW;
  }

}