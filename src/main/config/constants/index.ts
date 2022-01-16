import dotenv from 'dotenv';
dotenv.config();

export const ENVS = {
  NODE_ENV: process.env.NODE_ENV as string,
  PORT: process.env.PORT as string,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID as string,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET as string,
  GITHUB_AUTH_URL: process.env.GITHUB_AUTH_URL as string,
  GITHUB_ACCESS_TOKEN_URL: process.env.GITHUB_ACCESS_TOKEN_URL as string,
  GITHUB_API_USER_URL: process.env.GITHUB_API_USER_URL as string,
  SECRET_KEY: process.env.SECRET_KEY as string,
  GITHUB_AVATAR_SAVE_PATH: process.env.GITHUB_AVATAR_SAVE_PATH as string,
  IMAGE_UPLOAD_PATH: process.env.IMAGE_UPLOAD_PATH as string,
};
