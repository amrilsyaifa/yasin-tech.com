import { Request } from "express";
import { verifyJWT } from "./tokenHelper";
import { identityToken } from "../constant/token";

const getIDFromToken = async (req: Request): Promise<string | undefined> => {
  let token: string | undefined;

  if (req.cookies && req.cookies?.[identityToken]) {
    token = req.cookies[identityToken];
  } else if (req.headers.authorization) {
    token = req.headers.authorization.replace("Bearer ", "");
  }
  if (token) {
    const props = await verifyJWT<{
      sub: string;
      isRefreshToken?: boolean;
    }>(token);
    const { sub } = props;
    return sub;
  } else {
    return undefined;
  }
};

export default getIDFromToken;
