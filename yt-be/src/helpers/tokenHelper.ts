import snakecaseKeys from "snakecase-keys";
import getEnvToVar from "./getEnvToVar";
import { SignJWT, jwtVerify } from "jose";

export const signJWT = async (
  payload: { sub: string; is_refresh_token?: boolean },
  options: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(getEnvToVar("JWT_SECRET_KEY"));
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(getEnvToVar("JWT_SECRET_KEY"))
      )
    ).payload as T;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};

export const processNewToken = async (id: string) => {
  const JWT_EXPIRES_IN = getEnvToVar("JWT_EXPIRES_IN");
  const JWT_REFRESH_EXPIRES_IN = getEnvToVar("JWT_REFRESH_EXPIRES_IN");

  const token = await signJWT({ sub: id }, { exp: `${JWT_EXPIRES_IN}m` });
  const refreshToken = await signJWT(
    snakecaseKeys({ sub: id, isRefreshToken: true }),
    { exp: `${JWT_REFRESH_EXPIRES_IN}d` }
  );

  const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
  const refreshTokenMaxAge =
    parseInt(JWT_REFRESH_EXPIRES_IN) * 24 * 60 * 60 * 1000;
  const cookie = {
    token,
    refreshToken,
    maxAge: tokenMaxAge,
    maxAgeRefresh: refreshTokenMaxAge,
  };
  return cookie;
};
