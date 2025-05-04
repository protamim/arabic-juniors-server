// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST || "smtp.gmail.com",
//   port: Number(process.env.EMAIL_PORT) || 587,
//   secure: false, // Use true for 465, false for other ports
//   auth: {
//     user: process.env.EMAIL_USER, // Sender email address
//     pass: process.env.EMAIL_APP_PASS, // Sender email password (app password) or app-specific password
//   },
// });

// const notifyAdmin = async (firstName: string, email: string) => {
//   const mailOptions = {
//     from: `"Arabic Juniors Notifications" <no-reply@arabicjuniors.com>`,
//     to: process.env.EMAIL_USER,
//     subject: "New User Registration",
//     html: `<p>A new user has registered:</p>
//       <ul>
//         <li>Name: ${firstName}</li>
//         <li>Email: ${email}</li>
//       </ul>`,
//   };

//   try {
//     // sends an notification email to admin when someone register on this website
//     const info = await transporter.sendMail(mailOptions);

//     console.log(
//       `Registration notification sent to ${process.env.EMAIL_USER}`,
//       info.messageId
//     );
//   } catch (error) {
//     console.error("Error sending notification email", error);
//     throw error;
//   }
// };

// export default notifyAdmin;

import * as brevo from "@getbrevo/brevo";

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_V1_API_KEY as string
);

interface NotifyAdminParams {
  userEmail: string;
  userName: string;
}

export const notifyAdmin = async ({
  userEmail,
  userName,
}: NotifyAdminParams): Promise<brevo.CreateSmtpEmail> => {
  const emailParams: brevo.SendSmtpEmail = {
    sender: {
      name: "Arabic Juniors Notifications",
      email: process.env.BREVO_VERIFIED_SENDER_EMAIL as string, // must be a verified sender
    },
    to: [
      {
        email: process.env.BREVO_VERIFIED_SENDER_EMAIL as string,
        name: "Admin",
      },
    ],
    subject: "New User Registration",
    htmlContent: `<p>A new user has registered:</p>
     <ul>
       <li>Name: ${userName}</li>
      <li>Email: ${userEmail}</li>
     </ul>`,
  };

  try {
    const response = await apiInstance.sendTransacEmail(emailParams);
    console.log("Registration notification sent to", response.body);
    return response.body as brevo.CreateSmtpEmail;
  } catch (error: unknown) {
    if (error instanceof brevo.HttpError) {
      console.error("Brevo API error:", error.response);
    } else {
      console.error("Unexpected error sending email:", error);
    }
    throw error;
  }
};
