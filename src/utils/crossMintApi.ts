import axios from 'axios';

export const crossMintApi = axios.create({baseURL: 'https://challenge.crossmint.io/api/'});

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