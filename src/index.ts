import { MegaverseService } from './megaverse-service';

const megaverseService = new MegaverseService();

  // TO-DO Add program command to handle multiple cases to run the app

async function run() {
  try {
    const matrixSize = Number(process.env.MATRIX_SIZE);
    const bufferZone = Number(process.env.BUFFER_ZONE_ROWS);
    // await megaverseService.wipeEntireMegaVerse(2);
    const resultMatrix = await megaverseService.fillMegaverseShape(matrixSize, bufferZone);
    console.log('X-shape filled successfully, here is the submitted matrix content.');
    console.log(JSON.stringify({ goal: resultMatrix }, null, 2));
  } catch (error: any) {
    console.error(`Error filling the X-shape: ${error.message}`);
  }
}

// Run the app
run();