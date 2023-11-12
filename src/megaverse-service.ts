import { Cometh } from './cometh';
import { Polyanet } from './polyanet';
import { Soloon } from './soloon';
import { fillWithSpace, getCurrentMegaverse } from './utils/crossVerseUtils';
import { Logger } from './logger';
import { PolyanetIndex } from './models';

export class MegaverseService {
  private polyanet: Polyanet;
  private soloon: Soloon;
  private cometh: Cometh;

  private megaverseMatrix: string[][];

  constructor(matrixSize: number) {
    this.megaverseMatrix = Array.from({ length: matrixSize }, () =>
      Array.from({ length: matrixSize }, () => 'SPACE')
    );
    this.polyanet = new Polyanet();
    this.soloon = new Soloon();
    this.cometh = new Cometh();
  }

  public async getCurrentMegaverse() {
    this.megaverseMatrix = await getCurrentMegaverse();
    return this.megaverseMatrix;
  }

  public async sprinkleSloons() {
    try {
      await this.soloon.sprinkleUpSoloons();
    } catch (error: any) {
      Logger.error(`Sadly we did not finish prettying up the Megaverse with soloons: ${error.message}`);
    }
  }

  public async throwComeths() {
    try {
      await this.cometh.throwComeths();
    } catch (error: any) {
      Logger.error(`Opps a thrown cometh failed, rest assured the Megaverse is not doomed: ${error.message}`);
    }
  }

  public async wipeEntireMegaVerse(matrixSize: number) {
    for(let row = 0; row < matrixSize; row++) {
      for(let column = 0; column < matrixSize; column++) { 
        try {
          Logger.debug(`wiping index: [${row}, ${column}]`);
          await fillWithSpace({row,column});
        } catch (error: any) {
          Logger.error(`Even wiping a Megaverse space is not easy, some wiping didn't happen at,  [${row},${column}]: ${error.message}`);
        }
      }
    }
  }

  public async wipeMegaverseSpot(index: PolyanetIndex) {
    try {
      Logger.debug(`wiping index: [${index.row}, ${index.column}]`);
      await fillWithSpace(index);
    } catch (error: any) {
      Logger.error(`Even wiping a Megaverse space is not easy, some wiping didn't happen at,  [${index.row},${index.column}]: ${error.message}`);
    }
  }

  public async fillMegaverseShape() {
    for(let id = 0; id < 4; id++) { // process the four quadrants to cover the grid
      try {
        Logger.debug(`Let's get started with building 🪐POLYanets in quadrant with index: [${id}]`);
        await this.polyanet.fillQuadrantByPolyanets(id);
        Logger.info(`Successfully got all 🪐POLYanets in quadrant [${id}] built`)
      } catch (error: any) {
        Logger.error(`It was not easy to Polyanet the Megaverse matrix, it can be a temporal or spatial glitch: ${error.message}`);
      }
    }
  }

  // Phase 1 function to fill the grid with xShape
  public async fillXShape(matrixSize: number): Promise<string[][]> {
    const bufferZone = 2;
    const matrix: string[][] = Array.from({ length: matrixSize }, () =>
      Array.from({ length: matrixSize }, () => 'SPACE')
    );

    // Loop through the matrix and fill the appropriate positions
    for (let row = bufferZone; row <= matrixSize - bufferZone; row++) {
      for (let column = bufferZone; column < matrixSize - bufferZone; column++) {
        if (row === column || row === matrixSize - column - 1) {
          // If the current position is on one of the diagonals, fill it with 🪐POLYanet
          try {
            await this.polyanet.fillPolyanet({row, column});
            matrix[row][column] = 'POLYANET';
          } catch (error: any) {
            Logger.error(`Error filling position [${row},${column}]: ${error.message}`);
          }
        }
      }
    }

    return matrix;
  }
}