import jwt from 'jsonwebtoken';
import mongodb from 'mongodb';

export default (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: 'You must be authenticated to do that' } });
      } else {
        req.userId = new mongodb.ObjectId(decoded.user._id);
        next();
      }
    });
  } else {
    res.status(403).json({
      errors: { global: 'You must be authenticated to do that' },
    });
  }
};
