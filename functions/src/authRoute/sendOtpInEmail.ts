import { Request, Response } from "express";
import { z } from "zod";
import emailVerifyJwtToken from "../functions/jwtToken/emailVerifyJwtToken";
import sendEmailVerificationEmail from "../functions/emailFunctions/sendEmailVerificationMail";
import createServerError from "../responseObject/errorResponse";
import createServerResponse from "../responseObject/serverResponse";

const sendOtpInEmail = async (req: Request, res: Response) => {
  const emailFormat = z.string().trim().email();

  console.log("req.body", req.body);
  console.log("Hello from sendOtpInEmail.ts");


  if (!req.body.email) {
    // throw new HttpsError("invalid-argument","email not present!!");
    // res.status(403).json({ "error-code": "invalid-argument", message: "email not present",status:403 });


    res.json(
      createServerError(res, "invalid-argument", "Please enter a valid email")
    );
    return;
  }

  const emailInput = req.body.email;

  const emailFormatResult = emailFormat.safeParse(emailInput);

  if (emailFormatResult.success === false) {
    createServerError(res, "invalid-argument", "Please enter a valid email")

    return;
  }

  const email = emailFormatResult.data;

  //create otp

  const otpParam =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
  const otp = otpParam
    .split("")
    .sort(() => {
      return 0.5 - Math.random();
    })
    .join("")
    .slice(0, 6);

  //send Email

  try {
    await sendEmailVerificationEmail(otp, email);
    // res.json( emailVerifyJwtToken(otp));
    res.json(createServerResponse(emailVerifyJwtToken(otp, email)));
  } catch (error) {
    console.log(error);
    createServerError(res, "internal-error")
  }
};

export default sendOtpInEmail;
