import SibApiV3Sdk from 'sib-api-v3-sdk';
import { IStudent } from '../model/Student';

// ✅ Initialize Brevo API client once
const brevoClient = SibApiV3Sdk.ApiClient.instance;
brevoClient.authentications['api-key'].apiKey = process.env.BREVO_API_KEY as string;

const brevo = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendStudentEmail = async (student: IStudent, password: string) => {
  try {
    const htmlContent = `
      ${student.firstname} ${student.lastname},<br/><br/>
      Your account has been created successfully. Below are your account details:<br/><br/>
      <strong>Student ID:</strong> ${student.student_id}<br/>
      <strong>Email:</strong> ${student.email}<br/>
      <strong>Temporary Password:</strong> ${password}<br/><br/>
      Please log in and change your password immediately for security purposes.<br/><br/>
      Thank you,<br/>
    `;

    const emailData = {
      sender: { name: 'Evergreen College', email: process.env.EMAIL_USER },
      to: [{ email: student.email, name: `${student.firstname} ${student.lastname}` }],
      subject: 'Student Account Information',
      htmlContent,
    };

    await brevo.sendTransacEmail(emailData);

    return true;
  } catch (err: any) {
    console.error('Error sending student email:', err);
    throw new Error(err.message || 'Failed to send email via Brevo');
  }
};


export const sendResetEmail = async (email : string, resetToken : string) => {
  try{
    const url = process.env.NODE_ENV === 'production' ? 'https:/evergreen-college.onrender.com' : 'http://localhost:5173';
    const resetLink = `${url}/reset-password/${resetToken}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 520px; margin: 0 auto; background-color: #f0fdf4; border: 1px solid #a7f3d0; border-radius: 10px; padding: 28px;">
        <h2 style="text-align: center; color: #065f46; margin-bottom: 20px;">
          Evergreen College — Password Reset
        </h2>

        <p style="font-size: 15px; color: #064e3b; line-height: 1.6;">
          Hello,<br><br>
          We received a request to reset the password for your Evergreen College account.
          Click the button below to create a new password:
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a href="${resetLink}" target="_blank"
            style="
              background-color: #059669;
              color: white;
              text-decoration: none;
              padding: 14px 30px;
              border-radius: 8px;
              font-weight: bold;
              font-size: 15px;
              display: inline-block;
              box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            ">
            Reset My Password
          </a>
        </div>

        <p style="font-size: 14px; color: #065f46; text-align: center;">
          Or copy and paste this link into your browser:
        </p>
        <p style="word-break: break-all; font-size: 13px; text-align: center; color: #047857;">
          ${resetLink}
        </p>

        <p style="font-size: 13px; color: #065f46; text-align: center; margin-top: 30px; line-height: 1.5;">
          This link will expire in <strong>10 minutes</strong>.<br>
          If you didn’t request this, you can safely ignore this email.
        </p>

        <hr style="border: none; border-top: 1px solid #a7f3d0; margin: 25px 0;">

        <p style="text-align: center; font-size: 12px; color: #047857;">
          © ${new Date().getFullYear()} Evergreen College. All rights reserved.
        </p>
      </div>
    `

    await brevo.sendTransacEmail({
      sender: { name: 'Evergreen College', email: process.env.EMAIL_USER },
      to: [{ email }],
      subject: `Evergreen College Password Reset Request`,
      htmlContent,
    });

    return true;

  } catch (err: any) {
    console.error('Error sending refund update email:', err.message);
    throw new Error('Failed to send refund update email.');
  }
}