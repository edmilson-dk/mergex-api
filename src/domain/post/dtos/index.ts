export type PostCreateDto = {
  authorId: string;
  content: string;
};

export type PostStoredDto = {
  id: string;
  author_id: string;
  content: string;
  created_at: Date;
};
