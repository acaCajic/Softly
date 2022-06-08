import { Asset } from '../models/Asset';
import { PaginatedData } from '../models/PaginatedData';
import httpClient from './httpClient';

async function getAssets(
  $page: number,
  $limit: number,
  startDate: string,
  endDate?: string,
) {
  return httpClient.get<PaginatedData<Asset>>('/assets', {
    params: { $page, $limit, startDate, endDate },
  });
}

async function setBidAssets(userId: string, assetId: string, price: number) {
  return httpClient.post('/bids', {
    userId,
    assetId,
    price,
  });
}

async function getAsset(id: string) {
  return httpClient.get<Asset>(`/assets/${id}`);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAssets, getAsset, setBidAssets };
