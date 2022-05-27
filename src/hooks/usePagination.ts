import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { PaginatedData } from '../models/PaginatedData';

export type PaginationType<T> = {
  itemPerPage?: number;
  currentPage?: number;
  request: (
    page: number,
    limit: number,
  ) => Promise<AxiosResponse<PaginatedData<T>>>;
};

export function usePagination<T extends Record<string, any>>(
  args: PaginationType<T>,
) {
  const {
    itemPerPage: defaultItemsPerPage = 3,
    currentPage: defaultCurrentPage = 1,
    request,
  } = args;

  const [items, setItems] = useState<Array<T>>([]);

  const [itemPerPage, setItemPerPage] = useState(defaultItemsPerPage);
  const [currenttPage, setCurrentPage] = useState(defaultCurrentPage);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const loadMore = useCallback(() => {
    setCurrentPage((oldPage) => Math.min(oldPage + 1, totalPages));
  }, [totalPages]);

  const getItems = useCallback(async () => {
    try {
      if (!request) return;
      setLoading(true);

      const {
        data: { totalPages, items, totalItems },
      } = await request(currenttPage, itemPerPage);

      setTotalPages(totalPages);
      setTotalItems(totalItems);
      setItems((oldItems) => [...oldItems, ...items]);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, [currenttPage, itemPerPage, request]);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenttPage]);

  return {
    currenttPage,
    items,
    totalItems,
    itemPerPage,
    loading,
    loadMore,
    setItems,
    setCurrentPage,
    setItemPerPage,
  };
}
