import { GetUserInfosParams } from './ports/requests';
import { GetUserInfosResponse } from './ports/responses';

export interface IGithubServices {
  getUserInfos(data: GetUserInfosParams): Promise<GetUserInfosResponse>;
}
