import { crossMintApi } from './utils/crossMintApi';
import { SoloonItem } from './models';
import { soloonPositions } from './config/soloons';
import { getCurrentMegaverse } from './utils/crossVerseUtils';
import { Logger } from './logger';

export class Soloon {
  private urlSegment = 'soloons'
  private megaverseMatrix: any = [[]];

  constructor() {}

  public async sprinkleUpSoloons(): Promise<void> {
    this.megaverseMatrix = await getCurrentMegaverse();
    for( let soloon of soloonPositions) {
      // Check if the Soloon will be adjacent to an existing POLYanet otherwise revert
      if(!this.isAdjacentToPolyanet(soloon.row, soloon.column)) {
        throw new Error(`Aha, not the planned outcome for sprinkling 🌙's, Soloons can be only adjacent to POLYanets, invalid index at [${soloon.row}, ${soloon.column}]`);
      }
      try {
        await crossMintApi.post(this.urlSegment, soloon);
        Logger.info(`The Megaverse got prettier with one more ${soloon.color} SOLOON 🌙 at [${soloon.row}, ${soloon.column}]`)
      } catch (error: any) {
        throw error;
      }
    }
  }

  public isAdjacentToPolyanet(row: number, col: number): boolean {
    const rows = this.megaverseMatrix.length;
    const cols = this.megaverseMatrix[0].length;

    // Directions to check adjacent cell: up, down, left, right
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let [dRow, dCol] of directions) {
        const adjRow = row + dRow;
        const adjCol = col + dCol;

        // Check boundaries and if the value is 'POLYanet' in adjacent cells
        if (adjRow >= 0 && adjRow < rows && adjCol >= 0 && adjCol < cols && this.megaverseMatrix[adjRow][adjCol] && this.megaverseMatrix[adjRow][adjCol].type === 0) {
            return true;
        }
    }
    return false;
}

}