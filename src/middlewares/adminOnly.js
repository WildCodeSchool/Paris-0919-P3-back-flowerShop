export default (req, res, next) => {
  const db = req.app.get('db');
  db.collection('users').findOne({ _id: req.userId }, (err, user) => {
    if (err) {
      res.status(500).json({ errors: { global: err } });
      return;
    }

    if (user.role === 'admin') {
      next();
    } else {
      res.status(403).json({
        errors: { global: 'You are unauthorized for this action' },
      });
    }
  });
};
