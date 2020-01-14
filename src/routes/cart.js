import express from 'express';
import mongodb from 'mongodb';

const router = express.Router();

router.get('/:id', (req, res) => {
  const userId = req.params.id;
  const db = req.app.get('db');
  db.collection('cart')
    .find({ userId })
    .toArray((err, cart) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }
      res.json({ cart });
    });
});

router.post('/:id', async (req, res) => {
  const userId = req.params.id;
  const db = req.app.get('db');
  const userProducts = await db.collection('cart').findOne({ userId });
  if (userProducts) {
    console.log('user product', userProducts);
    console.log('new product', req.body.product);
    const updatedDocument = {
      $set: {
        ...userProducts,
        products: [...userProducts.products, req.body.product]
      }
    };
    console.log('update', updatedDocument);
    db.collection('cart').findOneAndUpdate(
      { userId },
      updatedDocument,
      (err, r) => {
        if (err) {
          res.status(500).json({ errors: { global: err } });
          return;
        }
        res.json(r);
      }
    );
  } else {
    const newDocument = { userId, products: [req.body.product] };
    db.collection('cart').insertOne(newDocument, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }
      res.json(r);
    });
  }
});

router.delete('/', (req, res) => {
  const db = req.app.get('db');
  db.collection('cart').drop();
});

export default router;
