const router = require("express").Router();
const { response } = require("express");
const nodemailer = require('nodemailer');
const Order = require("../models/Order");

// Tạo transporter cho việc gửi email
const transporter = nodemailer.createTransport({
    service: 'gmail', // Loại dịch vụ email, ví dụ: 'gmail', 'yahoo', ...
    auth: {
      user: 'tuanndse151153@fpt.edu.vn', // Địa chỉ email của bạn
      pass: 'zuijlunbpffrjpjl', // Mật khẩu email của bạn
    },
  });

const mailOptions = {
  from: 'DinhTuann987161@gmail.com',
  to: 'dinhtuann161@gmail.com',
  subject: 'Xác nhận giao dịch',
  html:'<h4>cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</h4> <p>Địa chỉ giao dịch: {address}</p><p>thông tin liên hệ: {phone}</p>',
};

router.post("/paymentQR",(req,res)=>{
  const transactionId = req.body.transactionId;
  mailOptions.html = mailOptions.html.replace('{transactionId}', transactionId);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Error sending email:', error);
          res.status(500)
        } else {
          console.log('Email sent:', info.response);
          res.status(200)
        }
      });
})
router.post("/payment",async (req,res)=>{

  const newOrder = new Order(req.body);
  mailOptions.html = mailOptions.html.replace('{address}', req.body.address);
  mailOptions.html = mailOptions.html.replace('{phone}', req.body.phone);
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log('Error sending email:', error);
          res.status(500)
        } else {
          console.log('Email sent:', info.response);
          res.status(200)
        }
      });
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
    console.log("Order err")
  }
})

module.exports = router;