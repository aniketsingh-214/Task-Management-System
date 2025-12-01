import jwt from "jsonwebtoken";
import { env } from "../config/env";

const ACCESS_SECRET = env.jwtAccessSecret;
const REFRESH_SECRET = env.jwtRefreshSecret;

export const signAccessToken = (payload: object): string => {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: env.accessTokenExpiresIn as jwt.SignOptions["expiresIn"],
  });
};

export const signRefreshToken = (payload: object): string => {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: env.refreshTokenExpiresIn as jwt.SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET) as any;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as any;
};
