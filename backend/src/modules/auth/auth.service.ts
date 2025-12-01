import bcrypt from "bcryptjs";
import prisma from "../../prisma/client";
import { ApiError } from "../../utils/ApiError";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt";
import { env } from "../../config/env";

export const registerUser = async (name: string, email: string, password: string) => {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new ApiError(400, "Email already registered");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
    },
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = signAccessToken({ userId: user.id, email: user.email });
  const refreshToken = signRefreshToken({ userId: user.id });

  const decoded: any = verifyRefreshToken(refreshToken);

  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(decoded.exp * 1000),
    },
  });

  return { user, accessToken, refreshToken };
};

export const refreshAccessToken = async (token: string) => {
  if (!token) throw new ApiError(401, "Refresh token missing");

  let decoded: any;
  try {
    decoded = verifyRefreshToken(token);
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const stored = await prisma.refreshToken.findUnique({
    where: { token },
  });

  if (!stored || stored.userId !== decoded.userId) {
    throw new ApiError(401, "Refresh token not found or mismatched");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const accessToken = signAccessToken({
    userId: user.id,
    email: user.email,
  });

  return { accessToken, user };
};

export const logoutUser = async (token: string | undefined) => {
  if (!token) return;

  await prisma.refreshToken.deleteMany({
    where: { token },
  });
};
