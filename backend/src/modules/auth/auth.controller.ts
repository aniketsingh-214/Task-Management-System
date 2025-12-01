import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { apiResponse } from "../../utils/apiResponse";
import { loginSchema, registerSchema } from "./auth.validation";
import {
  registerUser,
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "./auth.service";

const REFRESH_COOKIE_NAME = "refreshToken";

export const registerHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const parsed = registerSchema.parse(req.body);
    const user = await registerUser(parsed.name, parsed.email, parsed.password);

    return res.status(201).json(
      apiResponse(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        "User registered successfully"
      )
    );
  }
);

export const loginHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const parsed = loginSchema.parse(req.body);
    const { user, accessToken, refreshToken } = await loginUser(
      parsed.email,
      parsed.password
    );

    // Set refresh token as HTTP-only cookie
    res.cookie(REFRESH_COOKIE_NAME, refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      // secure: true, // enable in production with https
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json(
      apiResponse(
        {
          accessToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
        "Logged in successfully"
      )
    );
  }
);

export const refreshHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME] || req.body?.refreshToken;
    const refreshToken = req.cookies?.refreshToken 
                 || req.body?.refreshToken 
                 || req.headers["x-refresh-token"];


    const { accessToken, user } = await refreshAccessToken(refreshToken);

    return res.json(
      apiResponse(
        {
          accessToken,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        },
        "Token refreshed successfully"
      )
    );
  }
);

export const logoutHandler = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    // const refreshToken = req.cookies?.[REFRESH_COOKIE_NAME] || req.body?.refreshToken;
    const refreshToken = req.cookies?.refreshToken 
                 || req.body?.refreshToken 
                 || req.headers["x-refresh-token"];


    await logoutUser(refreshToken);

    res.clearCookie(REFRESH_COOKIE_NAME);

    return res.json(apiResponse(null, "Logged out successfully"));
  }
);
