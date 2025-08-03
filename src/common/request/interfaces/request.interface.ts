import { ResponsePagingMetadataPaginationRequestDto } from 'src/common/response/decorators/response.paging.dto';
import { Request } from 'express';

export interface IRequestApp<T = any> extends Request {
  __language: string;
  __version: string;
  __pagination?: ResponsePagingMetadataPaginationRequestDto;
}
