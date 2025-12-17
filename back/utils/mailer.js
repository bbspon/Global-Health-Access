const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

exports.sendAdminContactMail = async (contact) => {
  const mailOptions = {
    from: `"BBS Global Health Access" <${process.env.SMTP_USER}>`,
    to: process.env.ADMIN_EMAIL,
    subject: "New Contact Message – Global Health Access",
    html: `
      <h3>New Contact Message</h3>
      <p><b>Name:</b> ${contact.name}</p>
      <p><b>Email:</b> ${contact.email}</p>
      <p><b>Phone:</b> ${contact.phone || "-"}</p>
      <p><b>Subject:</b> ${contact.subject}</p>
      <p><b>Message:</b><br/>${contact.message}</p>
      <hr/>
      <p>Submitted on: ${new Date(contact.createdAt).toLocaleString()}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
