import "dotenv/config";
import * as sgMail from "@sendgrid/mail";
// import sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export { sgMail };
