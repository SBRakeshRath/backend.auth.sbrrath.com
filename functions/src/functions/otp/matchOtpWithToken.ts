import * as bcrypt from "bcrypt";

export default function matchOtpWithToken(token: string, otp: string) {
  return bcrypt.compareSync(otp, token);
}
