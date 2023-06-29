import * as bcrypt from "bcrypt";

export default function encodeOtp (otp:string){
const otpHash = bcrypt.hashSync(otp, 10);

return otpHash
}
