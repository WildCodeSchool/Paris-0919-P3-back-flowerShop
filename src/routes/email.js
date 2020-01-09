import express from 'express';
import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';
import dotenv from 'dotenv';
import path from 'path';

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
  const { firstName, lastName, email, phone, city, mailBody } = req.body;
  transporter.sendMail({
    to: email,
    from: 'eclosion@email.eclosion.com',
    subject: `Demandes d'informations - ${firstName} ${lastName}`,
    html: `
      <h2>Information client</h2>
      <ul>
        <li>Nom: ${firstName}</li>
        <li>Prénom: ${lastName}</li>
        <li>Email: ${email}</li>
        <li>Téléphone: ${phone}</li>
        <li>Ville: ${city}</li>
      </ul>
      <h2>Contenu du mail</h2>
      <p>${mailBody}</p>
      `
  });
  res.status(200).json({
    message: 'Votre mail a été envoyé!'
  });
});

module.exports = router;
