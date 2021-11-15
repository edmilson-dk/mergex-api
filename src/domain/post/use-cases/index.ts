import { PostCreateDto } from '../dtos';
import { CreatePostUseCaseResposense, GetAllUserPostsUseCaseResposense } from './ports';

export interface IPostUseCases {
  createPost(data: PostCreateDto): Promise<CreatePostUseCaseResposense>;
  getAllUserPosts(userId: string): Promise<GetAllUserPostsUseCaseResposense>;
}
