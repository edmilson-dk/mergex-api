import { IPostRepository } from '@application/repositories/post';
import { ICacheServices } from '@application/services/cache';
import { PostCreateDto, PostStoredDto } from '@domain/post/dtos';
import { Post } from '@domain/post/entity/post';
import { IPostUseCases } from '@domain/post/use-cases';
import {
  CreatePostUseCaseResposense,
  GetAllUserPostsUseCaseRequest,
  GetAllUserPostsUseCaseResposense,
} from '@domain/post/use-cases/ports';
import { left, right } from '@shared/error-handler/either';

export class PostUseCases implements IPostUseCases {
  private readonly postRepository: IPostRepository;
  private readonly cacheServcices: ICacheServices;

  constructor(postRepository: IPostRepository, cacheServcices: ICacheServices) {
    this.postRepository = postRepository;
    this.cacheServcices = cacheServcices;
  }

  async getAllUserPosts(data: GetAllUserPostsUseCaseRequest): Promise<GetAllUserPostsUseCaseResposense> {
    const cacheKey = `${data.userId}_posts`;
    const hasPostsCached = await this.cacheServcices.getCacheData<PostStoredDto[] | null>(cacheKey);

    if (hasPostsCached) {
      return right({ posts: hasPostsCached });
    }

    const posts = await this.postRepository.getPostsByUserId(data);
    await this.cacheServcices.setCacheData({
      key: cacheKey,
      data: posts,
    });

    return right(posts);
  }

  async createPost(data: PostCreateDto): Promise<CreatePostUseCaseResposense> {
    const post = new Post();
    const postOrError = post.build(data);

    if (postOrError.isLeft()) return left(postOrError.value);

    const postCreated = await this.postRepository.createPost(postOrError.value);
    await this.cacheServcices.removeCacheData(`${data.authorId}_posts`);

    return right(postCreated);
  }
}
