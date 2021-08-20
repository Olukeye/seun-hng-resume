require('dotenv').config();
const router = require('express').Router();
const Contact = require('../model/Contact');
const nodemailer = require('nodemailer');
let fineboy = process.env.MYEMAIL;
let finepass = process.env.MYPASS;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fineboy,
    pass: finepass
  }
});
router.post('/contactinfo', async (req, res) => {
  const { name, email, phone, message } = req.body;
  console.log(req.body);
  try {
      let mailOptions = {
      from:'bootspacetech@gmail.com',
      to: email,
      subject: 'Thanks for connecting with Chijioke',
      text: `Thank you ${name} for connecting with Chijioke. He will get back to you shortly`
    }
       transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
         console.log(err);
      }
      else{
        console.log('Email sent: ' + info.response);
      }
    })

    let contact = new Contact({ name, email, phone, message });
    await contact.save();

    res.render('success.ejs', { message: `${ contact.name } your mail has been sent!`})
    
   


  } catch (error) {
    return res.status(500).send(error)
    console.log(error);
  }
})

router.get('/successful', (req, res) => {
  res.render('success.ejs');
})

module.exports = router;