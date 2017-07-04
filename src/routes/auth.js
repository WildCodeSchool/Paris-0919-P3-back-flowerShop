import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/', (req, res) => {
  const { email, password } = req.body.credentials;
  const db = req.app.get('db');

  db.collection('users').findOne({ email }, (err, doc) => {
    if (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    if (doc) {
      if (bcrypt.compareSync(password, doc.password)) {
        const token = jwt.sign({ user: { _id: doc._id, email: doc.email, role: doc.role } }, process.env.JWT_SECRET);
        res.json({ token });
      } else {
        res.status(401).json({ errors: { global: 'Invalid credentials ' } });
      }
    } else {
      res.status(401).json({ errors: { global: 'Invalid credentials ' } });
    }
  });
});

export default router;
