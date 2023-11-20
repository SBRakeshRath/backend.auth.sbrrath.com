import nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default async function (to: string, subject: string, html: string) {
  try {
    console.log("sending email to", to);
    console.log(process.env.EMAIL_USERNAME)
    await transporter.sendMail({
      to: to,
      from: '"sbrrath team " < ' + process.env.EMAIL_USERNAME + ">",
      subject: subject,
      html: html,
    });

    return { success: true, error: {} };
  } catch (error) {
    console.log(error);
    throw { success: false, error: error };
  }
}
