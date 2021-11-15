import { PostCreateDto } from '../dtos';
import { CreatePostUseCaseResposense, GetAllUserPostsUseCaseRequest, GetAllUserPostsUseCaseResposense } from './ports';

export interface IPostUseCases {
  createPost(data: PostCreateDto): Promise<CreatePostUseCaseResposense>;
  getAllUserPosts(data: GetAllUserPostsUseCaseRequest): Promise<GetAllUserPostsUseCaseResposense>;
}
