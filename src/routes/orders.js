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

router.get('/', (req, res) => {
  const db = req.app.get('db');
  db.collection('orders')
    .find({})
    .toArray((err, orders) => {
      if (err) return res.status(500).json({ errors: { global: err } });
      res.status(200).json({ orders });
    });
});

router.post('/', (req, res) => {
  const date = Date().toString();
  const order = {
    date,
    user: {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email,
      phone: req.body.user.phone
    },
    address: {
      street: req.body.address.street,
      postalCode: req.body.address.postalCode,
      city: req.body.address.city
    },
    products: req.body.products
  };
  const db = req.app.get('db');
  db.collection('orders').insertOne(order, err => {
    if (err) {
      return res.status(500).json({ errors: { global: err } });
    }
    res.status(200).json({
      message: 'order successfully added to db'
    });
    transporter.sendMail({
      to: req.body.user.email,
      from: 'eclosion@email.eclosion.com',
      subject: `Nouvelle commande - ${req.body.user.firstName} ${req.body.user.lastName}`,
      html: `
        <p>Vous avez reçu une nouvelle commande de la part de ${
          req.body.user.firstName
        } ${req.body.user.lastName}</p>
        <h2>Information sur le client:</h2>
        <ul>
          <li>Email: ${req.body.user.email}</li>
          <li>Télephone: ${req.body.user.phone}</li>
        </ul>
        <h2>Information sur la commande:</h2>
        <ul>
          <li>Date de la commande: ${date}</li>
          <li>Nom de la rue: ${req.body.address.street}</li>
          <li>Code Postal: ${req.body.address.postalCode}</li>
          <li>Ville: ${req.body.address.city}</li>
          <li>Produits commandés: 
            <ul>${req.body.products
              .map(product => `<li>${product.name} - ${product.size}</li>`)
              .join('')}
            </ul>
          </li>
        </ul>
        `
    });
  });
});

export default router;
