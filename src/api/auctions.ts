import { Asset } from '../models/Asset';
import httpClient from './httpClient';

type ItemsResponse = {
  liveAssets: Array<Asset>;
  upcomingAssets: Array<Asset>;
};

async function getGalleryAuctions() {
  return httpClient.get<ItemsResponse>('/auctions/gallery');
}

export default { getGalleryAuctions };
