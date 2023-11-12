import { program } from 'commander';
import { MegaverseService } from './megaverse-service';
import { Logger } from './logger';

const phase1MegaverseSize = 11;
const phase2MegaverseSize = 30;
const megaverseService = new MegaverseService(phase2MegaverseSize);

program
  .version('1.0.0')
  .description('Megaverse CLI')
  .option('-p, --phase <type>', 'Specify the phase to run (1 , 2)')
  .option('-a, --action <type>', 'Specify the wiping action to run (all, one)')
  .option('-i, --index [type]', 'Specify the index to be replaced with space as row,column e.g., 1,2');

program.parse(process.argv);

const options = program.opts();

function parseIndexOption(value: string): { row: number, column: number } {
  const [row, column] = value.split(',').map(Number);
  return { row, column };
}


async function runPhase1() {
  Logger.info('Getting ready for making the Megaverse, though first need to warm up the 🪐POLYanet shooter with Phase 1 ...');
  try {
    await megaverseService.fillXShape(phase1MegaverseSize);
  } catch (error: any) {
    Logger.error(`Aha, we need to get things right to start with Phase 1: ${error.message}`);
  }
}

async function runPhase2() {
  try {
    Logger.info('--- Be patient your Megaverse is about to be built with 🪐 POLYanets, 🌙 SOLOONs and ☄ COMETHs ---');
    await megaverseService.fillMegaverseShape();
    Logger.info('... 🪐 POLYanets plannted 🪐 .................................................');
    Logger.info('--- Next 🌙 SOLOONs will be sprinkled around  🪐 POLYanets ---');
    await megaverseService.sprinkleSloons();
    Logger.info('... 🪐 POLYanets plannted 🪐 ... 🌙 SOLOONs sprinkled 🌙 ......................');
    Logger.info('--- Finally, all it takes is to scatter the guarding ☄ COMETHs around the Megaverse ---');
    await megaverseService.throwComeths();
    Logger.info('... 🪐 POLYanets plannted 🪐 ... 🌙 SOLOONs sprinkled 🌙 ... ☄ COMETHs thrown ☄ ...');
    const resultMegaverse = megaverseService.getCurrentMegaverse();
    Logger.info('Megaverse has been built successfully, enjoy looking at it.');
    Logger.info(JSON.stringify({ goal: resultMegaverse }, null, 2));
  } catch (error: any) {
    Logger.error(`It was not so easy as expected, the Megaverse is not there yet : ${error.message}`);
  }
}

async function wipeMegaverse() {
  try {
    Logger.info('--- So sad, wiping the  Megaverse is about start, still you can start fresh ---');
    await megaverseService.wipeEntireMegaVerse(phase2MegaverseSize);
  } catch {
    Logger.error('Some issues with Megaverse corrector.');
  }
}

async function wipeSingleMegaverseSpot(index: any) {
  try {
    Logger.info('--- Megaverse missed spot, no problem wiping that Megaverse spot ---');
    await megaverseService.wipeMegaverseSpot(index);
  } catch {
    Logger.error('Some issues with Megaverse corrector.');
  }
}

async function run() {
  try {
    switch (options.phase) {
      case '1':
        await runPhase1();
        break;
      case '2':
        await runPhase2();
        break;
      case 'wipe':
        if(options.action === 'all') {
          await wipeMegaverse();
        } else {
          const index = parseIndexOption(options.index);
          await wipeSingleMegaverseSpot(index);
        }
        break;
      default:
        Logger.error('Invalid phase. Please specify phase 1, 2, or wipe.');
        break;
    }
  } catch (error: any) {
    Logger.error(`An error occurred: ${error.message}`);
  }
}

run();