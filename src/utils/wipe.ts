import { PolyanetIndex } from '../models';
import { crossMintApi } from './crossMintApi';

export const fillWithSpace = async(targetIdx: PolyanetIndex) => {
    const urlSegment = 'polyanets'
    try {
      await crossMintApi.delete(urlSegment, { data: targetIdx });
    } catch (error: any) {
      throw error;
    }
}