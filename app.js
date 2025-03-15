const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json())

const transporter = nodemailer.createTransport({
  service : "gmail",
  auth : {
    user : "avinash122378@gmail.com",
    pass : "vhsq cxcu sirl nhsf"
  }
})
app.get("/",(req,res)=>{
  res.end("Hello all server is Running!")
})
app.get("/send-mail",(req,res)=>{
  const {name,email,subject,message} = req.body;

  const mailOptions = {
    from : "avinash122378@gmail.com",
    to : "avinash122378@gmail.com",
    subject : subject,
    message :  `${name} \n ${email} \n ${message}`
  }

  transporter.sendMail(mailOptions,(error)=>{
    if (error) res.status(500).send("Some problem occured!");
    else res.status(200).send("Mail sent Successfully!");
  })
})

const port = process.env.PORT | 3000;
app.listen(port,()=>{
  console.log(`Server is Running on port ${port}`);
})


