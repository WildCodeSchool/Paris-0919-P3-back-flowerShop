import express from 'express';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import dotenv from 'dotenv';
import path from 'path';

import {
  mailToCompany,
  mailToCustomer,
  orderToCompany,
  orderToCustomer
} from '../emailFormat';

const router = express.Router();

dotenv.config({
  path: path.join(`${__dirname}/..`, '.env')
});

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.API_KEY
    }
  })
);

router.post('/questions', (req, res) => {
  transporter.sendMail(mailToCompany(req.body.values));
  transporter.sendMail(mailToCustomer(req.body.values));
  res.status(200).json({
    message: 'Votre mail a été envoyé!'
  });
});

router.post('/orders', (req, res) => {
  transporter.sendMail(orderToCompany(req.body.values));
  transporter.sendMail(orderToCustomer(req.body.values));
  res.status(200).json({
    message: 'Votre mail a été envoyé!'
  });
});

module.exports = router;
