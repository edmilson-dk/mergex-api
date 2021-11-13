import dotenv from 'dotenv';
dotenv.config();

export const ENVS = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_AUTH_URL: process.env.GITHUB_AUTH_URL,
  GITHUB_ACCESS_TOKEN_URL: process.env.GITHUB_ACCESS_TOKEN_URL,
  GITHUB_API_USER_URL: process.env.GITHUB_API_USER_URL,
  SECRET_KEY: process.env.SECRET_KEY,
};
