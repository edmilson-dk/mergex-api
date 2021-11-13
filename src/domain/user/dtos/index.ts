export type UserCreateDto = {
  email: string;
  name: string;
  username: string;
  password: string;
  githubId: string;
  githubUsername: string;
  githubProfile: string;
  avatarUrl: string;
  bio: string;
};

export type UserStoredDto = {
  id: string;
  email: string;
  name: string;
  username: string;
  githubId: string;
  githubUsername: string;
  githubProfile: string;
  avatarUrl: string;
  bannerUrl: string;
  website: string;
  location: string;
  dateOfBirth: string;
  isDisabled: boolean;
  bio: string;
  createdAt: string;
};
