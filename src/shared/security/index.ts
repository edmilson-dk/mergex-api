import bcrypt from 'bcryptjs';
import JWT, { VerifyCallback } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export async function hashValue(value: string, salt = 10): Promise<string> {
  return await bcrypt.hash(value, salt);
}

export async function compareValue(value: string, hashedValue: string): Promise<boolean> {
  return await bcrypt.compare(value, hashedValue);
}

export function createJWT(payload: object, expires = '10d') {
  const token = JWT.sign(payload, process.env.SECRET_KEY as string, { expiresIn: expires });
  return token;
}

export function verifyJWT(token: string, callback: VerifyCallback) {
  JWT.verify(token, process.env.SECRET_KEY as string, callback);
}
