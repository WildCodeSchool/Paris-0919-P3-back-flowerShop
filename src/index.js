import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import mongodb from 'mongodb';

dotenv.config({
  path: path.join(__dirname, '.env')
});
const app = express();

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.json());

// routes
import games from './routes/games';
import users from './routes/users';
import auth from './routes/auth';

app.use('/api/games', games);
app.use('/api/users', users);
app.use('/api/auth', auth);

mongodb.MongoClient.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, (err, db) => {
  app.set('db', db);

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
  })

  app.listen(8080, () => console.log('Running on localhost:2370'));
});
