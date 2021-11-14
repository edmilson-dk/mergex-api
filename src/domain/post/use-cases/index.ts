import { PostCreateDto } from '../dtos';
import { CreatePostUseCaseResposense } from './ports';

export interface IPostUseCases {
  createPost(data: PostCreateDto): Promise<CreatePostUseCaseResposense>;
}
