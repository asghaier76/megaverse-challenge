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

export const getCurrentMegaverse = async() => {
  const urlSegment = 'map/5f98d93b-774b-4241-a4e1-d55074235b48';
  try {
    const res = await crossMintApi(urlSegment);
    return res.data.map?.content ? res.data.map.content : [];
  } catch (error: any) {
    throw error;
  }
}