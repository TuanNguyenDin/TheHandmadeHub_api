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
    html: '<h4>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</h4><p>Vui lòng kiểm tra lại những thông tin sau:</p>{productList}<p>Địa chỉ giao dịch: {address}</p><p>Thông tin liên lạc người nhận: {phone}</p>',
  };
  
  router.post("/payment", async (req, res) => {
    const newOrder = new Order(req.body);
    const products = req.body.products;
  
    let productListHtml = '';
    products.forEach((product, index) => {
      productListHtml += `<p>Sản phẩm ${index + 1}: ${product.title}</p>`;
    });
  
    mailOptions.html = mailOptions.html.replace('{productList}', productListHtml);
    mailOptions.html = mailOptions.html.replace('{address}', req.body.address);
    mailOptions.html = mailOptions.html.replace('{phone}', req.body.contact);
  
    mailOptions.to = req.body.email;
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email' });
      } else {
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email sent' });
      }
    });
  
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
      console.log("Order error:", err);
    }
  });
  
  

module.exports = router;