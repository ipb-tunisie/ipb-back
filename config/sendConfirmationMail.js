const nodemailer = require("nodemailer");

const sendConfirmationMail = async (user, hash) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ipb2420@gmail.com",
        pass: "IPB--2023!",
      },
    });

    const mailOptions = {
      from: "ipb2420@gmail.com",
      to: user.email,
      subject: "Confirm Your Registration",
      text: `Please click the following link to confirm your registration: http://example.com/confirm?hash=${hash}`,
    };

    await transporter.sendMail(mailOptions);
    return true; // Email sent successfully
  } catch (error) {
    console.error(error);
    return false; // Error sending email
  }
};

module.exports = { sendConfirmationMail };
