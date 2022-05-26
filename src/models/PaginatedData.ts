export type PaginatedData<T> = {
  items: Array<T>;
  totalItems: number;
  currentPage: number;
  totalPages: number;
};
