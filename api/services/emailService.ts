import { format } from "date-fns";
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
          📅 ${format(classStartDate, "dd MMMM")} at ${classStartTime}
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

interface SendStudentRegConfirmationEmailTypes {
  email: string;
  firstName: string;
  lastName: string;
  selectedPackage: string;
  preferredDays: string[];
  classStartDate: Date;
  classStartTime: string;
  monthlyHours: number;
}
export const sendStudentRegConfirmationEmail = async ({
  email,
  firstName,
  lastName,
  classStartDate,
  classStartTime,
  preferredDays,
  selectedPackage,
  monthlyHours,
}: SendStudentRegConfirmationEmailTypes) => {
  const subject = "Welcome to Arabic Juniors";
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Your Arabic Class</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* General resets for email clients */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }
    body { margin: 0; padding: 0; width: 100% !important; }
    table { border-collapse: collapse !important; }
    /* Responsive Styles */
    @media only screen and (max-width: 600px) {
      .wrapper {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 0 !important;
      }
      .content {
        padding: 16px !important;
      }
      .footer-content {
        padding: 20px 8px 8px 8px !important;
      }
      .footer-legal {
        padding: 0 8px 4px 8px !important;
      }
      .footer-copyright {
        padding: 0 8px 18px 8px !important;
      }
      h2 {
        font-size: 20px !important;
      }
      .registration-details h2 {
        font-size: 18px !important;
      }
      .registration-details p {
        font-size: 15px !important;
      }
    }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#f2f4f8; font-family:Arial, sans-serif;">
  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f2f4f8; width:100%;">
    <tr>
      <td align="center">
        <!-- Wrapper Table -->
        <table class="wrapper" align="center" width="620" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1); max-width:620px; width:100%;">
          <!-- Header -->
          <tr>
            <td style="background-color:#ffffff; padding:20px 0; text-align:center;">
              <img src="https://arabicjuniors.com/_next/image?url=%2Farabic-logo-new.png&w=384&q=75" alt="Arabic Juniors Logo" style="max-width:180px; width:100%; height:auto; display:block; margin:auto;">
            </td>
          </tr>
          <!-- Welcome Content -->
          <tr>
            <td class="content" style="padding:30px; color:#333; line-height:1.6;">
              <h2 style="margin-top:0; color:#2e86c1; font-size:24px;">🎉 Welcome to Arabic Juniors!</h2>
              <p>Dear <strong>${firstName} ${lastName}</strong>,</p>
              <p>Welcome! We're excited to have you start your Arabic learning journey with us.</p>
              <p><strong>Your classes are about to begin,</strong> and we’re here to support you every step of the way.</p>
              <!-- Registration Details -->
              <div class="registration-details" style="padding:2px 16px; background-color:#f0f8ff; border-left:5px solid #03549A; font-weight:normal; font-size:16px; margin:10px 0;">
                <h2 style="font-size:22px; margin-bottom:12px; font-weight:bold; color:#03549A;">Student Registration Details</h2>
                <p>💼 <strong>Pricing Package:</strong> ${selectedPackage}</p>
                <p>🗓️ <strong>Monthly Hours:</strong> ${monthlyHours}</p>
                <p>📅 <strong>Preferred Days:</strong> 
                ${preferredDays?.join(", ")}</p>
                <p>⏰ <strong>Class Start Date and Time:</strong> ${format(classStartDate, "dd MMMM")} at ${classStartTime}</p>
              </div>
              <p style="margin-top:25px;">We look forward to seeing your progress and celebrating your achievements along the way.</p>
              <p><strong>Your assigned teacher will contact you shortly to begin your classes.</strong></p>
              <p style="margin-bottom:0;">Warm regards,<br><strong>Arabic Juniors Team</strong></p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td class="footer-content" style="background-color:#f9f9f9; color:#333333; padding:30px 20px 10px 20px; text-align:center;">
              <img src="https://arabicjuniors.com/_next/image?url=%2Farabic-logo-new.png&w=384&q=75" alt="Arabic Juniors Logo" style="width:100px; max-width:100px; height:auto; margin-bottom:5px; display:block; margin-left:auto; margin-right:auto;">
              <div style="margin:0; font-family:'Segoe UI', Arial, sans-serif; font-size:13px; color:#848D9B; line-height:1.6;">
                📞 +971 50 992 1470 | ✉️ hello@arabicjuniors.com <br> 📍 United Arab Emirates
              </div>
              <!-- Social Icons -->
              <div style="margin:10px 0 0 0;">
                <a href="https://facebook.com/arabicjuniors" style="margin:0 5px; text-decoration:none;">
                  <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook" width="17" height="17" style="filter: invert(26%) sepia(76%) saturate(2293%) hue-rotate(203deg) brightness(95%) contrast(97%);">
                </a>
                <a href="https://instagram.com/arabicjuniors" style="margin:0 5px; text-decoration:none;">
                  <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" width="17" height="17">
                </a>
                <a href="https://wa.me/971509921470" style="margin:0 5px; text-decoration:none;">
                  <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" width="17" height="17">
                </a>
              </div>
            </td>
          </tr>
          <!-- Divider -->
          <tr style="background-color:#f9f9f9;">
            <td style="padding:0 36px; text-align:center;">
              <hr style="border:none; border-top:1px solid #ececec; margin:8px 0;">
            </td>
          </tr>
          <!-- Legal Links -->
          <tr style="background-color:#f9f9f9;">
            <td class="footer-legal" style="font-family:'Segoe UI',Arial,sans-serif; color:#b2bec3; font-size:13px; padding:0 36px 4px 36px; text-align:center;">
              <a href="https://www.arabicjuniors.com/privacy-policy" style="color:#b2bec3; text-decoration:underline; margin-right:14px;">Privacy Policy</a>
              |
              <a href="https://www.arabicjuniors.com/terms-and-conditions" style="color:#b2bec3; text-decoration:underline; margin-left:14px;">Terms &amp; Conditions</a>
            </td>
          </tr>
          <!-- Copyright -->
          <tr style="background-color:#f9f9f9;">
            <td class="footer-copyright" style="font-family:'Segoe UI',Arial,sans-serif; color:#b2bec3; font-size:13px; padding:0 36px 20px 36px; text-align:center;">
              © <script>document.write(new Date().getFullYear())</script> Arabic Juniors. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  return await sendEmail({
    toEmail: email,
    toName: firstName,
    htmlContent: html,
    subject: subject,
  });
};