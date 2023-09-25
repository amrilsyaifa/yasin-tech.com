import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import CryptoJS from "crypto-js";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { RegisterRemainSchema } from "../../validations/AuthValidation";
import User, { IUser, TUser } from "../../models/UserModel";
import Role, { IRole } from "../../models/RoleModel";
import { saltBcrypt, secretCryptoAes } from "../../constant/bcrypt";
import { hash } from "bcryptjs";
import exclude from "../../helpers/excludeKey";
import Profile, { TProfile } from "../../models/ProfileModel";
import UserTemp from "../../models/UserTempModel";
import { processNewToken } from "../../helpers/tokenHelper";
import { identityRefreshToken, identityToken } from "../../constant/token";
import getEnvToVar from "../../helpers/getEnvToVar";

const RegisterRemaining = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { params } = req;
    const id = params.id as string;
    const response = RegisterRemainSchema.safeParse(req.body);
    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
        data: formErrors.fieldErrors,
      });
    }

    const hashedpasswordCrypto = CryptoJS.AES.encrypt(
      response.data.password,
      secretCryptoAes
    ).toString();
    const hashedPasswordBcrypt = await hash(response.data.password, saltBcrypt);
    const hashedPassword = `${hashedPasswordBcrypt}|-_-|${hashedpasswordCrypto}`;
    const defaultRole: IRole | null = await Role.findOne({
      slug: "guest",
    });

    if (defaultRole) {
      const usrTemp = await UserTemp.deleteOne({ _id: id });
      // Build user object based on TProfile
      const profileFields: TProfile = {
        phone_number: response.data.phone_number,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        image: response.data.image,
      };

      const profile = new Profile(profileFields);

      const userSave = await profile.save().then(async (prf) => {
        const prfId = prf._id.toString();
        const userFields: TUser = {
          username: response.data.username,
          email: response.data.email,
          password: hashedPassword,
          role: defaultRole._id.toString(),
          profile: prfId,
        };

        const user = new User(userFields);
        const saveUser = await user.save();
        const resultProfile = await profile.save();
        const userJson: IUser = saveUser.toJSON();
        const userData = exclude(userJson, "password");
        return { ...userData, profile: resultProfile };
      });

      const cookieOptions = await processNewToken(userSave._id);
      res.cookie(identityToken, cookieOptions.token, {
        maxAge: cookieOptions.maxAge,
        secure: getEnvToVar("NODE_ENV") !== "development",
        path: "/",
        httpOnly: true,
      });
      res.cookie(identityRefreshToken, cookieOptions.refreshToken, {
        maxAge: cookieOptions.maxAgeRefresh,
        secure: getEnvToVar("NODE_ENV") !== "development",
        path: "/",
        httpOnly: true,
      });
      return SuccessResponse({
        res,
        status: HttpStatusCodes.CREATED,
        message: "success register",
        data: {
          user: userSave,
          token: cookieOptions.token,
          refresh_token: cookieOptions.refreshToken,
        },
      });
    }
    return ErrorResponse({
      res,
      status: HttpStatusCodes.BAD_REQUEST,
      message: "no content of role",
    });
  } catch (error) {
    return ErrorResponse({
      res,
      status: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: "internal server error",
      data: error,
    });
  }
};

export default RegisterRemaining;
