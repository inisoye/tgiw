export interface PaginatedResponse<DataType> {
  data: DataType;
  count: any;
  currentPage: any;
  nextPage: any;
  prevPage: number;
  totalPages: number;
}
