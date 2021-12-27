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
  password: string;
  name: string;
  username: string;
  githubId: string;
  githubUsername: string;
  githubProfile: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  website: string | null;
  location: string | null;
  dateOfBirth: string | null;
  isDisabled: boolean;
  bio: string;
  createdAt: string;
};

export type UserDbStoredDto = {
  id: string;
  email: string;
  password: string;
  name: string;
  username: string;
  github_id: string;
  github_username: string;
  github_profile: string;
  avatar_url: string | null;
  banner_url: string | null;
  website: string | null;
  location: string | null;
  date_of_birth: Date | null;
  is_disabled: boolean;
  bio: string;
  created_at: Date;
};

export type UserProfileDto = {
  username: string | undefined;
  name: string | undefined;
  website: string | undefined;
  location: string | undefined;
  date_of_birth: string | undefined;
  bio: string | undefined;
};

export type UserSimpleDto = {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
};

export type UserDto = Omit<UserStoredDto, 'password'>;
