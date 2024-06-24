import nodemailer from 'nodemailer';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const email = (to, subject, text, html) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'mernabook2024@gmail.com',
        pass: 'ekdt shel hywp qhoz ',
      },
    });

    const mailOptions = {
      from: 'mernabook2024@gmail.com',
      to,
      subject,
      text,
      html, 
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(new Error('Email not sent'));
      } else {
        console.log('Email sent: ' + info.response);
        resolve('Email sent');
      }
    });
  });
};

export default email;
