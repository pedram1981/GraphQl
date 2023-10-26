import nodemailer, { Transporter } from 'nodemailer';

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your_email@gmail.com',
    pass: 'your_password'
  }
});

const mailOptions: nodemailer.SendMailOptions = {
  from: 'your_email@gmail.com',
  to: 'recipient_email@example.com',
  subject: 'Test email',
  text: 'This is a test email from Node.js with Nodemailer'
};

transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
  if (error) {
    return  "The email sent was not successfully";
  } else {
    return `Email sent: ${info.response}`;
  }
});
