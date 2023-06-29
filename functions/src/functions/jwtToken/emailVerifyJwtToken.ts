import * as bcrypt from "bcrypt";
import createJwtToken from "./createJwtToken";

const jwtExpiry = 60 * 5; //5minutes

export default function emailVerifyJwtToken(otp: string,email:string) {
  const otpHash = bcrypt.hashSync(otp, 10);

  return createJwtToken({
    exp: Math.floor(Date.now() / 1000) + jwtExpiry,
    emailToken: otpHash,
    email:email
  });
}
