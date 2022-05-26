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

export default { getAssets };
