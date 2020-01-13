import express from 'express';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import dotenv from 'dotenv';
import path from 'path';

import { mailToCompany, mailToCustomer } from '../emailFormat';

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

router.post('/', (req, res) => {
  transporter.sendMail(mailToCompany(req.body.values));
  transporter.sendMail(mailToCustomer(req.body.values));
  res.status(200).json({
    message: 'Votre mail a été envoyé!'
  });
});

module.exports = router;
