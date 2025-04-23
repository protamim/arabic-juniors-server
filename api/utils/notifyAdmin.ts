import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false, // Use true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER, // Sender email address
    pass: process.env.EMAIL_APP_PASS, // Sender email password (app password) or app-specific password
  },
});

const notifyAdmin = async (firstName: string, email: string) => {
  const mailOptions = {
    from: `"Arabic Juniors Notifications" <no-reply@arabicjuniors.com>`,
    to: process.env.EMAIL_USER,
    subject: "New User Registration",
    html: `<p>A new user has registered:</p>
      <ul>
        <li>Name: ${firstName}</li>
        <li>Email: ${email}</li>
      </ul>`,
  };

  try {
    // sends an notification email to admin when someone register on this website
    const info = await transporter.sendMail(mailOptions);

    console.log(
      `Registration notification sent to ${process.env.EMAIL_USER}`,
      info.messageId
    );
  } catch (error) {
    console.error("Error sending notification email", error);
    throw error;
  }
};

export default notifyAdmin;
