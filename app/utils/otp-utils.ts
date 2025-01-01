import nodemailer from 'nodemailer';

export const generateOtp = (): string => {
  // Generate a 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendOtpToAdminEmail = async (otp: string, username: string, email?: string) => {
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
    subject: 'Admin Login attempt',
    text: `
    Hey Admin, ${username} is trying to login to the admin account.
    OTP code is ${otp}.
    This OTP was generated at ${currentTime}.
    If you did not request this OTP, please ignore this email.
    Best regards,
    Your Team`,
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};
