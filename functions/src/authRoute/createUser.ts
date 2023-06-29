import { Request, Response } from "express";
import { z } from "zod";
import createServerError from "../responseObject/errorResponse";
import verifyJwtToken from "../functions/jwtToken/verifyJwtToken";
import { JwtPayload } from "jsonwebtoken";
import matchOtpWithToken from "../functions/otp/matchOtpWithToken";
import createNewUserData from "../db/userData/createNewUserData";
import createServerResponse from "../responseObject/serverResponse";

const createUser = async (req: Request, res: Response) => {
  if (!req.body.otp || !req.body.emailToken || !req.body.password) {
    createServerError(res, "invalid-argument", "Please enter all the data");

    return;
  }

  const otpFormat = z.string().trim();
  const tokenFormat = z.string().trim();
  const passwordFormat = z.string().trim();

  const otpFormatResult = otpFormat.safeParse(req.body.otp);
  const tokenFormatResult = tokenFormat.safeParse(req.body.emailToken);

  const passwordFormatResult = passwordFormat.safeParse(req.body.password);

  if (
    otpFormatResult.success === false ||
    tokenFormatResult.success === false ||
    passwordFormatResult.success === false
  ) {
    createServerError(res, "invalid-argument", "Please enter all the data");
    return;
  }

  const otp = otpFormatResult.data;
  const token = tokenFormatResult.data;
  const password = passwordFormatResult.data;

  try {
    const jwtTokenData = (await verifyJwtToken(token)) as JwtPayload;
    const emailToken = jwtTokenData.emailToken;
    const email = jwtTokenData.email;

    if (!matchOtpWithToken(emailToken, otp)) {
      createServerError(res, "invalid-argument", "not valid otp");
      return;
    }

    await createNewUserData(email, password);

    res.json(createServerResponse({ success: true }));
  } catch (error: any) {
    if (error.code && error.code === "invalid-jwtToken") {
      createServerError(res, "invalid-argument", "invalid-token");
      return;
    }
    if (error.type && error.type === "db-error" && error.reason) {
      const reason = error.reason;
      if (reason === "email-present") {
        createServerError(res, "invalid-argument", "email already present");
        return;
      }
    }

    console.log(error);
    createServerError(res, "internal-error");
    return;
  }
};

export default createUser;
