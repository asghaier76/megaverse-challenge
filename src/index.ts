import axios from 'axios';
import { MegaverseService } from './megaverse-service';

// crossmint base api url used
const baseApiUrl = process.env.BASE_API_URL || 'https://challenge.crossmint.io/api/';
const megaverseService = new MegaverseService(baseApiUrl);

async function run() {
  try {
    const matrixSize = Number(process.env.MATRIX_SIZE);
    const bufferZone = Number(process.env.BUFFER_ZONE_ROWS);
    const resultMatrix = await megaverseService.fillXShape(matrixSize, bufferZone);
    console.log('X-shape filled successfully, here is the submitted matrix content.');
    console.log(JSON.stringify({ goal: resultMatrix }, null, 2));
  } catch (error: any) {
    console.error(`Error filling the X-shape: ${error.message}`);
  }
}

// Run the app
run();