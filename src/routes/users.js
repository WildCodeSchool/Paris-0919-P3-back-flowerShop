import express from 'express';

let router = express.Router();

router.post('/', (req, res) => {
  const user = {
    email: req.body.user.email,
    password: bcrypt.hashSync(user.password, 10)
  };
  const db = req.app.get('db');

  db.collection('users').insertOne(user, (err, r) => {
    if (err) { res.status(500).json({ errors: { global: err }}); return; }
    
    res.json({});
  });
});

export default router;