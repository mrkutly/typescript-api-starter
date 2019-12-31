import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});


export const makeEmail = (text: string): string => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px;
  ">
    <h2>Hello,</h2>
    <p>${text}</p>
    <p>😘, Typescript Starter API</p>
  </div>
`;


export const sendPasswordResetEmail = async (
  email: string,
  resetToken: string
): Promise<boolean> => {
  const response = await transport.sendMail({
    from: "no-reply@marksauerutley.com",
    to: email,
    subject: "Typescript Starter API Password Reset",
    html: makeEmail(`
      Your password reset token is here! 
      \n\n 
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
        Click here to reset your password
      </a>
    `),
  });

  return response?.accepted?.length > 0;
};