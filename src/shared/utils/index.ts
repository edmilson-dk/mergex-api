type SerializePaginationParams = {
  page: number;
  limit: number;
  defaultLimit?: number;
};

export function serializePagination({ page, limit, defaultLimit = 10 }: SerializePaginationParams): {
  page: number;
  limit: number;
} {
  const pageValue = page > 0 ? page : 1;
  const limitValue = limit > 0 ? limit : defaultLimit;

  return {
    page: pageValue,
    limit: limitValue,
  };
}
