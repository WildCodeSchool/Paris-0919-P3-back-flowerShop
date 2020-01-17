import express from 'express';
import mongodb from 'mongodb';

const router = express.Router();

router.get('/:id', async (req, res) => {
  const userId = mongodb.ObjectId(req.params.id);
  const db = req.app.get('db');
  try {
    const cart = await db.collection('cart').findOne({ userId });
    if (!cart) throw new Error("Can't retrieve user cart");
    res.status(200).json({ cart });
  } catch (err) {
    return res.status(500).json({ errors: { global: err.message } });
  }
});

router.post('/:id', async (req, res) => {
  const userId = mongodb.ObjectId(req.params.id);
  const db = req.app.get('db');
  try {
    const userCart = await db.collection('cart').findOne({ userId });
    if (!userCart) throw new Error("Can't retrieve user cart");
    const updatedProducts = userCart.products
      ? [...userCart.products, req.body]
      : [req.body];
    const updatedDocument = {
      $set: {
        ...userCart,
        products: [...updatedProducts]
      }
    };
    await db
      .collection('cart')
      .findOneAndUpdate({ userId }, updatedDocument, (err, r) => {
        if (err) throw new Error('Failed to update cart');
        res.json(r);
      });
  } catch (err) {
    return res.status(500).json({ errors: { global: err.message } });
  }
});

router.put('/:id', async (req, res) => {
  const db = req.app.get('db');
  const userId = mongodb.ObjectId(req.params.id);
  try {
    const currentCart = await db.collection('cart').findOne({ userId });
    const otherProducts = currentCart.products.filter(
      product => product._id !== req.body._id
    );
    const updatedProducts = otherProducts
      ? [...otherProducts, req.body]
      : [req.body];
    const updatedDocument = {
      $set: {
        ...currentCart,
        products: updatedProducts
      }
    };
    db.collection('cart').findOneAndUpdate(
      { userId },
      updatedDocument,
      (err, r) => {
        if (err) throw new Error('Failed to update cart');
        res.json(r);
      }
    );
  } catch (err) {
    return res.status(500).json({ errors: { global: err.message } });
  }
});

router.delete('/:userId/:productId', async (req, res) => {
  const db = req.app.get('db');
  const userId = mongodb.ObjectId(req.params.userId);
  const productId = req.params.productId;
  try {
    const currentCart = await db.collection('cart').findOne({ userId });
    const updatedProducts = currentCart.products.filter(
      product => product._id !== productId
    );
    const updatedDocument = [
      {
        $set: {
          ...currentCart,
          products: updatedProducts
        }
      }
    ];
    db.collection('cart').findOneAndUpdate(
      { userId },
      updatedDocument,
      (err, r) => {
        if (err) throw new Error('Failed to delete product from cart');
        res.json(r);
      }
    );
  } catch (err) {
    return res.status(500).json({ errors: { global: err.message } });
  }
});

export default router;
