const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config()
const app = express();

app.use(bodyParser.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "avinash122378@gmail.com",
    pass: process.env.GMAIL_PASSWORD || "",
  },
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello all, server is running!");
});

// Send email route
app.post("/send-mail", (req, res) => {
  const { name, fromEmail, subject, message } = req.body;

  // Validate request body
  if (!name || !fromEmail || !subject || !message) {
    return res.status(400).send("All fields are required!");
  }

  const mailOptions = {
    from: "avinash122378@gmail.com", // Sender address
    to: "avinash122378@gmail.com", // Receiver address
    subject: subject, // Email subject
    text: `Name: ${name}\nEmail: ${fromEmail}\nMessage: ${message}`, // Email body
  };

  // Send email
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).send("An error occurred while sending the email.");
    }
    res.status(200).send("Email sent successfully!");
  });
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
