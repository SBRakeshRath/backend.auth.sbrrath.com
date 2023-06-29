import Email = require("email-templates");
import email from "./email";
import path = require('path');

export default async function sendEmailVerificationEmail(
  otp: string,
  to: string
) {
  try {

    const html = await new Email().render(path.join(__dirname,"./../../../assets/email-templates/emailVerificationByOtpEmail/html.pug"),{otp:otp})
    const res = await email(to,"Verify Your Email Address for SBRRath.com",html);
    return res;
  } catch (error) {
    console.log(error)
    throw error;
  }
}
