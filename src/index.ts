import { MegaverseService } from './megaverse-service';
import { Logger } from './logger';

const matrixSize = 30;
const megaverseService = new MegaverseService(matrixSize);

  // TO-DO Add program command to handle multiple cases to run the app

async function run() {
  try {
    Logger.info('Be patient your Megaverse is about to be built with 🪐 POLYanets, 🌙 SOLOONs and ☄COMETHs ...');
    await megaverseService.fillMegaverseShape();
    Logger.debug('... 🪐 POLYanets plannted 🪐 .................................................');
    await megaverseService.sprinkleSloons();
    Logger.debug('... 🪐 POLYanets plannted 🪐 ... 🌙 SOLOONs sprinkled 🌙 ......................');
    await megaverseService.throwComeths();
    Logger.debug('... 🪐 POLYanets plannted 🪐 ... 🌙 SOLOONs sprinkled 🌙 ... ☄COMETHs thrown☄ ...');
    const resultMegaverse = megaverseService.getCurrentMegaverse();
    Logger.info('Megaverse has been built successfully, enjoy looking at it.');
    Logger.info(JSON.stringify({ goal: resultMegaverse }, null, 2));
  } catch (error: any) {
    Logger.error(`It was not so easy as expected, the Megaverse is not there yet : ${error.message}`);
  }
}

run();