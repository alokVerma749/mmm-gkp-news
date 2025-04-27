import nodemailer from 'nodemailer';

export const generateOtp = (): string => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtpToAdminEmail = async (otp: string, username: string, password: string, permission: string, email?: string) => {
  // Configure the email transport using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Get the current time
  const currentTime = new Date().toLocaleString();

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: '⚠️ Admin Login Attempt Detected',
    html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Admin Login Attempt</title>
      </head>
      <body style="font-family: Arial, sans-serif; background-color: #f4f4f8; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); overflow: hidden;">
          <div style="background-color: #2d3748; padding: 20px; text-align: center;">
            <h2 style="color: #ffffff; margin: 0;">⚠️ Login Attempt Alert</h2>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px; color: #333333;">Hello Admin,</p>
            <p style="font-size: 15px; color: #555555;">
              We detected a login attempt to your admin account with the following details:
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Username:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${username}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Password Attempted:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${password}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>Requested Permission:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${permission}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;"><strong>OTP Code:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">${otp}</td>
              </tr>
              <tr>
                <td style="padding: 8px;"><strong>Time Generated:</strong></td>
                <td style="padding: 8px;">${currentTime}</td>
              </tr>
            </table>
  
            <p style="font-size: 15px; color: #555555; margin-top: 20px;">
              If this was you, please proceed using the OTP provided above.
            </p>
            <p style="font-size: 15px; color: #d9534f; margin-top: 10px;">
              <strong>Not you?</strong> Please ignore this email or contact our support immediately to secure your account.
            </p>
  
            <div style="margin-top: 30px; text-align: center;">
              <a href="mailto:support@yourcompany.com" style="padding: 10px 20px; background-color: #2d3748; color: #ffffff; text-decoration: none; border-radius: 5px;">
                Contact Support
              </a>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 10px; text-align: center; font-size: 12px; color: #888888;">
            <p style="margin: 0;">&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
    `
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
