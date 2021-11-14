import { Either, left, right } from '@shared/error-handler/either';
import { isValidPostContent } from '@shared/validators';
import { PostCreateDto } from '../dtos';
import { InvalidPostContentError } from './errors/invalidPostContentError';
import { CreatePostEntityResponse } from './ports';

export class Post {
  private createContent(content: string): Either<InvalidPostContentError, string> {
    const isValid = isValidPostContent(content);
    return isValid ? right(content) : left(new InvalidPostContentError(content));
  }

  public build(data: PostCreateDto): CreatePostEntityResponse {
    const content = this.createContent(data.content);

    if (content.isLeft()) {
      return left(new InvalidPostContentError(data.content));
    }

    return right({
      content: content.value,
      authorId: data.authorId,
    });
  }
}
