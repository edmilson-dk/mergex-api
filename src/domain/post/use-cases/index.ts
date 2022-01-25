import { PostCreateDto } from '../dtos';
import { CreatePostUseCaseResposense, GetAllUserPostsUseCaseRequest, GetAllUserPostsUseCaseResposense } from './ports';

export interface IPostUseCases {
  createPost(data: PostCreateDto): Promise<CreatePostUseCaseResposense>;
  deleteUserPost(postId: string, userId: string): Promise<string>;
  getAllUserPosts(data: GetAllUserPostsUseCaseRequest): Promise<GetAllUserPostsUseCaseResposense>;
}
