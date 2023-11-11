import axios from 'axios';

export const crossMintApi = axios.create({baseURL: 'https://challenge.crossmint.io/api/'});

// Function to handle the retry with exponential backoff strategy (initialDelay**2)
async function requestRetry(error: any, retries: number, delay: number) {
    let retryCount = 0;
  
    while (retryCount < retries) {
      try {
        await new Promise(resolve => setTimeout(resolve, delay));
        return await axios(error.config);  // Now retry the request
      } catch (err) {
        if (retryCount === retries - 1) throw err;
        retryCount++;
        delay *= 2;
      }
    }
  }

// Request interceptor to add candidateId to POST and DELETE requests
crossMintApi.interceptors.request.use(
  (config) => {
    const candidateId = '5f98d93b-774b-4241-a4e1-d55074235b48'; 

    // First we need to check if the HTTP method is either POST or DELETE
    if (['post', 'delete'].includes(config.method as string)) {
        // Now the intersptor adds candidateId to the data
        config.data = { ...config.data, candidateId};
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to catch the retry logic
crossMintApi.interceptors.response.use(
    response => response,
    async (error) => {
      // Check that we get rate limit error 429
      if (error.config && error.response && error.response.status === 429) {
        // Set the number of retries and initial delay in msec then call the rquestRetry helper function
        const retries = 5;
        const delay = 2000;

        return requestRetry(error, retries, delay);
      }
      return Promise.reject(error);
    }
);