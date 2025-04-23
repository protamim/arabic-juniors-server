import { sendEmail } from "../utils/email";

export const sendWelcomeEmail = async (firstName: string, email: string) => {
  const subject = "Welcome to Our Arabic Juniors App!";
  const html = `<h1>Hi ${firstName},</h1>
                <p>Thank you for registering at our app. We're excited to have you on board!</p>`;
  await sendEmail(email, subject, html);
};
