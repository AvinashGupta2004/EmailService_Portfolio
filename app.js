const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
require("dotenv").config()
const nodemailer = require("nodemailer");

const app = express();

app.use(bodyParser.json())
app.use(cors());

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
      user : "avinash122378@gmail.com",
      pass : process.env.GMAIL_PASSWORD
    }
});

app.get("/",(req,res)=>{
  res.end("Hello world! Server is running perfectly");
})

app.post("/sendmail",(req,res)=>{
  const {name,fromEmail,subject,message} = req.body;
  const mailOptions = {
    from : "avinash122378@gmail.com",
    to : "avinash122378@gmail.com",
    subject : subject,
    text : `${name}\n${fromEmail}\n${message}`,
    html : ""
  }

  transporter.sendMail(mailOptions,(error)=>{
    if (error) res.status(500).send(e);
    else res.status(200).send("Mail sent Successfully!");
  })
});

const port = process.env.PORT | 4000;
app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
})