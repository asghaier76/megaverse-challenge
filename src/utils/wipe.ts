import { crossMintApi } from './crossMintApi';

export const fillWithSpace = async(row: number, column: number) => {
    const urlSegment = 'polyanets'

    let retries = 5; // Number of retries
    let delay = 2000; // Initial delay in milliseconds
  
    for (let i = 0; i < retries; i++) {
      try {
        await crossMintApi.delete(urlSegment, {data: { row, column }});
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