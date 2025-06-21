import { sendEmail } from "../utils/email";

export const sendWelcomeEmail = async (firstName: string, email: string) => {
  const subject = "Welcome to Our Arabic Juniors App!";
  const html = `<h1>Hi ${firstName},</h1>
                <p>Thank you for registering at our app. We're excited to have you on board!</p>`;

  await sendEmail({
    toEmail: email,
    toName: firstName,
    subject,
    htmlContent: html,
  });
};

export const sendTrialSessionEmail = async (
  firstName: string,
  email: string,
  classStartDate: Date,
  classStartTime: string
) => {
  const subject = "Arabic Juniors | Trial Request";
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Trial Session Confirmation – Arabic Juniors</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f4f8; font-family:Arial, sans-serif;">
  <table align="center" width="620" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <tr>
      <td style="background-color:#ffffff; padding:20px 0; text-align:center;">
        <img src="https://arabicjuniors.com/_next/image?url=%2Farabic-logo-new.png&w=384&q=75" alt="Arabic Juniors Logo" style="max-width:180px; height:auto;">
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding:30px; color:#333; line-height:1.6;">
        <h2 style="margin-top:0; color:#2e86c1; font-size:24px;">📚 Trial Session Confirmation</h2>

        <p><strong>Dear ${firstName},</strong></p>

        <p>Thank you for requesting a <strong>trial session</strong> with us on:</p>
        <p style="padding:12px 16px; background-color:#fff9e6; border-left:5px solid #f4c430; font-weight:bold; font-size:16px; margin:10px 0;">
          📅 ${new Date(
            classStartDate
          ).toLocaleDateString()} at ${classStartTime}
        </p>

        <!-- Highlighted Section -->
        <div style="background-color:#f0f8ff; padding:20px; border-radius:6px;">
          <h3 style="color:#007bff; font-size:18px; margin-bottom:8px;">✨ What Happens Next?</h3>
          <ul style="padding-left:20px; margin-top:0;">
            <li>✅ Our admin team will contact you shortly to confirm session details</li>
            <li>📱 You can also reach us via 📞 or 
              <a href="https://wa.me/971509921470" style="text-decoration:none; display:inline-block;">
                <img src="https://cdn-icons-png.flaticon.com/24/733/733585.png" alt="WhatsApp" width="20" height="20" style="vertical-align:middle; margin:0 4px;">
              </a>
              <strong>+971 50 992 1470</strong>
            </li>
          </ul>
          <p style="margin-top:15px; font-weight:bold;">⏱️ Please allow up to 12 hours for a response.</p>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#f9f9f9; color:#333333; padding:30px 20px; text-align:center;">
        <img src="https://arabicjuniors.com/_next/image?url=%2Farabic-logo-new.png&w=384&q=75" alt="Arabic Juniors Logo" style="width:100px; height:auto; margin-bottom:1px;">
    
       <p style="margin:5px 0; font-size:14px; line-height:1.6;">
          📞 +971 50 992 1470 | ✉️ info@arabicjuniors.com<br>
          📍 United Arab Emirates
        </p>

        <!-- Social Icons -->
        <p style="margin:10px 0;">
          <a href="https://facebook.com/arabicjuniors" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" width="24" height="24">
          </a>
          <a href="https://instagram.com/arabicjuniors" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/24/733/733558.png" alt="Instagram" width="24" height="24">
          </a>
          <a href="https://wa.me/971509921470" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/24/733/733585.png" alt="WhatsApp" width="24" height="24">
          </a>
        </p>

        <p style="font-size:12px; color:#999999; margin-top:5px;">
          © 2025 Arabic Juniors. All rights reserved.
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
`;

  await sendEmail({
    toEmail: email,
    toName: firstName,
    subject,
    htmlContent: html,
  });
};

export const sendTeacherRegistrationReplyEmail = async (
  email: string,
  first_name: string
) => {
  const subject = "Thanks for applying to Arabic Juniors";
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Application Received</title>
</head>
<body style="margin:0; padding:0; background-color:#f2f4f8; font-family:Arial, sans-serif;">
  <table align="center" width="620" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">

    <!-- Header -->
    <tr>
      <td style="background-color:#ffffff; padding:20px 0; text-align:center;">
        <img src="https://arabicjuniors.com/_next/image?url=%2Farabic-logo-new.png&w=384&q=75" alt="Arabic Juniors Logo" style="max-width:180px; height:auto;">
      </td>
    </tr>

    <!-- Main Content -->
    <tr>
      <td style="padding:30px; color:#333; line-height:1.6;">
        <h2 style="margin-top:0; color:#2e86c1; font-size:24px;">📝 Application Received</h2>

        <p><strong>Dear Applicant,</strong></p>

        <p>Thank you for applying for the job with <strong>Arabic Juniors</strong>. We truly appreciate your interest in joining our team.</p>

        <p>Your application has been <strong>received successfully</strong>, and our recruitment team will carefully review your information.</p>

        <!-- Highlighted Box -->
        <div style="background-color:#f0f8ff; padding:20px; border-radius:6px;">
          <h3 style="color:#007bff; font-size:18px; margin-bottom:8px;">📌 What’s Next?</h3>
          <ul style="padding-left:20px; margin-top:0;">
            <li>🔍 Our team will assess your qualifications and experience.</li>
            <li>📞 We’ll be in touch if your profile matches our current opportunities.</li>
          </ul>
          <p style="margin-top:15px; font-weight:bold;">🕒 Please allow a few days for our team to respond.</p>
        </div>

        <p>We look forward to the possibility of working together.</p>

        <p style="margin-bottom:0;">Best regards, <br><strong>Arabic Juniors Team</strong></p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background-color:#f9f9f9; color:#333333; padding:30px 20px; text-align:center;">
        <img src="https://arabicjuniors.com/_next/image?url=%2Farabic-logo-new.png&w=384&q=75" alt="Arabic Juniors Logo" style="width:100px; height:auto; margin-bottom:1px;">

        <p style="margin:5px 0; font-size:14px; line-height:1.6;">
          📞 +971 50 992 1470 | ✉️ info@arabicjuniors.com<br>
          📍 United Arab Emirates
        </p>

        <!-- Social Icons -->
        <p style="margin:10px 0;">
          <a href="https://facebook.com/arabicjuniors" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" alt="Facebook" width="24" height="24">
          </a>
          <a href="https://instagram.com/arabicjuniors" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/24/733/733558.png" alt="Instagram" width="24" height="24">
          </a>
          <a href="https://wa.me/971509921470" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/24/733/733585.png" alt="WhatsApp" width="24" height="24">
          </a>
        </p>

        <p style="font-size:12px; color:#999999; margin-top:5px;">
          © 2025 Arabic Juniors. All rights reserved.
        </p>
      </td>
    </tr>

  </table>
</body>
</html>`;

  await sendEmail({
    toEmail: email,
    toName: first_name,
    htmlContent: html,
    subject: subject,
  });
};
