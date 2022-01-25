import { PostStoredDto } from '@domain/post/dtos';
import { UserSimpleDto } from '@domain/user/dtos';

export type UserFeedType = {
  user: UserSimpleDto;
  post: PostStoredDto;
};

export type UserFeedDto = UserFeedType[];
