import { Asset } from '../models/Asset';
import { Auction } from '../models/Auction';
import httpClient from './httpClient';

type ItemsResponse = {
  liveAssets: Array<Asset>;
  upcomingAssets: Array<Asset>;
};

type AuctionsResponse = {
  items: Array<Auction>;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

async function getGalleryAuctions() {
  return httpClient.get<ItemsResponse>('/auctions/gallery');
}

async function getAuctions() {
  return httpClient.get<AuctionsResponse>('/auctions?$page=1&$limit=10');
}

async function getAuction(id: string) {
  return httpClient.get<Auction>(`/auctions/${id}`);
}

export default { getGalleryAuctions, getAuctions, getAuction };
