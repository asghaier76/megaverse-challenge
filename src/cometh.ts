import { crossMintApi } from './utils/crossMintApi';
import { comethPositions } from './config/comeths';
import { Logger } from './logger';


export class Cometh {
  private urlSegment = 'comeths'

  constructor() {}

  public async throwComeths(): Promise<void> {
    for( let cometh of comethPositions) {
      try {
        await crossMintApi.post(this.urlSegment, cometh);
        Logger.info(`A Megaverse ☄COMETH☄ guard in ${cometh.direction} direction was deployed at [${cometh.row}, ${cometh.column}]`)
      } catch (error: any) {
        throw error;
      }
    }
  }

}