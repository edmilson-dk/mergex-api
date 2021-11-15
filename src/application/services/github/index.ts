import { GetUserInfosResponse, GetUserInfosParams } from './ports/index';

export interface IGithubServices {
  getUserInfos(data: GetUserInfosParams): Promise<GetUserInfosResponse>;
}
