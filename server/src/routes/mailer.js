import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
          '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',
    },
  })
);
export default transporter;
