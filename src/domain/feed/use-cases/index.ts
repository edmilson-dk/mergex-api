import { GetUserFeedUseCaseResponse } from './ports';

export interface IFeedUseCases {
  getUserFeed: (userId: string) => Promise<GetUserFeedUseCaseResponse>;
}
