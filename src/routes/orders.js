import express from 'express';
import mongodb from 'mongodb';

const router = express.Router();

router.post('/', (req, res) => {
  const order = {
    user: {
      firstName: req.body.user.firstName,
      lastName: req.body.user.lastName,
      email: req.body.user.email
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
  });
});

export default router;
