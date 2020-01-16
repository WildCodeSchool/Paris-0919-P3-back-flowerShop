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
    const updatedDocument = {
      $set: {
        ...userProducts,
        products: [...userProducts.products, req.body]
      }
    };
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
    const newDocument = { userId, products: [req.body] };
    db.collection('cart').insertOne(newDocument, (err, r) => {
      if (err) {
        res.status(500).json({ errors: { global: err } });
        return;
      }
      res.json(r);
    });
  }
});

router.put('/:userId', async (req, res) => {
  const db = req.app.get('db');
  const { userId } = req.params;
  const currentUserProducts = await db.collection('cart').findOne({ userId });
  const otherProducts = currentUserProducts.products.filter(
    product => product._id !== req.body._id
  );
  const updatedProducts = otherProducts
    ? [...otherProducts, req.body]
    : [req.body];

  const updatedDocument = {
    $set: {
      ...currentUserProducts,
      products: updatedProducts
    }
  };
  db.collection('cart').findOneAndUpdate(
    { userId },
    updatedDocument,
    (err, r) => {
      if (err) return res.status(500).json({ errors: { global: err } });
      res.json(r);
    }
  );
});

router.delete('/:userId/:productId', async (req, res) => {
  const db = req.app.get('db');
  const { userId, productId } = req.params;
  const currentDocument = await db.collection('cart').findOne({ userId });
  const updatedProducts = currentDocument.products.filter(
    product => product._id !== productId
  );
  const updatedDocument = [
    {
      $set: {
        ...currentDocument,
        products: updatedProducts
      }
    }
  ];
  db.collection('cart').findOneAndUpdate(
    { userId },
    updatedDocument,
    (err, r) => {
      if (err) return res.status(500).json({ errors: { global: err } });
      res.json(r);
    }
  );
});

export default router;
