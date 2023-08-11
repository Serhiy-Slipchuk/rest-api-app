const sgMail = require("@sendgrid/mail");

const sendEmail = async (email) => {
  sgMail.setApiKey(process.env.EMAIL_API_KEY);

  try {
    await sgMail.send(email);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
