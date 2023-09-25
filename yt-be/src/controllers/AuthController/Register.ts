import HttpStatusCodes from "http-status-codes";
import { Request, Response } from "express";
import CryptoJS from "crypto-js";

import { ErrorResponse, SuccessResponse } from "../../helpers/Responses";
import { RegisterSchema } from "../../validations/AuthValidation";
import User, { IUser, TUser } from "../../models/UserModel";
import Role, { IRole } from "../../models/RoleModel";
import { saltBcrypt, secretCryptoAes } from "../../constant/bcrypt";
import { hash } from "bcryptjs";
import exclude from "../../helpers/excludeKey";
import Profile, { TProfile } from "../../models/ProfileModel";

const Register = async (req: Request, res: Response): Promise<Response> => {
  try {
    const response = RegisterSchema.safeParse(req.body);
    if (!response.success) {
      const { formErrors } = response.error;
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "Invalid request",
        data: formErrors.fieldErrors,
      });
    }

    const defaultRole: IRole | null = await Role.findOne({ slug: "guest" });

    if (!defaultRole) {
      return ErrorResponse({
        res,
        status: HttpStatusCodes.BAD_REQUEST,
        message: "No content of role",
      });
    }

    const hashedpasswordCrypto = CryptoJS.AES.encrypt(
      response.data.password,
      secretCryptoAes
    ).toString();
    const hashedPasswordBcrypt = await hash(response.data.password, saltBcrypt);
    const hashedPassword = `${hashedPasswordBcrypt}|-_-|${hashedpasswordCrypto}`;

    // Build user object based on TProfile
    const profileFields: TProfile = {
      phone_number: response.data.phone_number,
      first_name: response.data.first_name,
      last_name: response.data.last_name,
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

    return SuccessResponse({
      res,
      status: HttpStatusCodes.CREATED,
      message: "success register",
      data: userSave,
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

export default Register;
