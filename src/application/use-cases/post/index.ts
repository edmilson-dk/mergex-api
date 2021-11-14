import { IPostRepository } from '@application/repositories/post';
import { PostCreateDto } from '@domain/post/dtos';
import { Post } from '@domain/post/entity/post';
import { IPostUseCases } from '@domain/post/use-cases';
import { CreatePostUseCaseResposense } from '@domain/post/use-cases/ports';
import { left, right } from '@shared/error-handler/either';

export class PostUseCases implements IPostUseCases {
  private readonly postRepository: IPostRepository;

  constructor(postRepository: IPostRepository) {
    this.postRepository = postRepository;
  }

  async createPost(data: PostCreateDto): Promise<CreatePostUseCaseResposense> {
    const post = new Post();
    const postOrError = post.build(data);

    if (postOrError.isLeft()) return left(postOrError.value);

    const postCreated = await this.postRepository.createPost(postOrError.value);

    return right(postCreated);
  }
}
