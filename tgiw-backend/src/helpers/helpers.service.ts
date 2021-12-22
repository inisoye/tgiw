import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  // https://stackoverflow.com/a/67239246
  paginateResponse<DataType>(
    data: DataType,
    page: number,
    take: number,
    fullDataLength: number,
  ) {
    const lastPage = Math.ceil(fullDataLength / take);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      data,
      count: fullDataLength,
      currentPage: page,
      nextPage: nextPage,
      prevPage: prevPage,
      lastPage: lastPage,
    };
  }
}
