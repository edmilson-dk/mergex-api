import axios from 'axios';

import { IGithubServices } from '@application/services/github';
import { GetUserInfosResponse, GetUserInfosParams } from '@application/services/github/ports';
import { left, right } from '@shared/error-handler/either';
import { InvalidGithubCodeError } from '@application/services/github/errors/invalidGithubCodeError';
import { ENVS } from '@main/config/constants';

type IAccessTokenResponse = {
  access_token: string;
  error?: string;
};

type IUserInfosResponse = {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
};

export class GithubServicesByApi implements IGithubServices {
  private async getAccessToken(code: string): Promise<string | null> {
    const { data: accessTokenResponse } = await axios.post<IAccessTokenResponse>(
      ENVS.GITHUB_ACCESS_TOKEN_URL as string,
      null,
      {
        params: {
          client_id: ENVS.GITHUB_CLIENT_ID,
          client_secret: ENVS.GITHUB_CLIENT_SECRET,
          code,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (accessTokenResponse.error) return null;

    return accessTokenResponse.access_token;
  }
  async getUserInfos(data: GetUserInfosParams): Promise<GetUserInfosResponse> {
    const { code } = data;
    const accessTokenOrNull = await this.getAccessToken(code);

    if (!accessTokenOrNull) {
      return left(new InvalidGithubCodeError(code));
    }

    const response = await axios.get<IUserInfosResponse>(ENVS.GITHUB_API_USER_URL as string, {
      headers: {
        authorization: `Bearer ${accessTokenOrNull}`,
      },
    });

    const { data: userInfos } = response;

    return right({
      githubAvatarUrl: userInfos.avatar_url,
      githubId: userInfos.id.toString(),
      githubProfile: userInfos.html_url,
      githubUsername: userInfos.login,
    });
  }
}
