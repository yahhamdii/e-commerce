import express from 'express';
import mongoose from 'mongoose';
import photo from './routes/photo';
import user from './routes/user';
import produit from './routes/product';
import error from './middleware/error';

const app = express();
mongoose.Promise = global.Promise;
mongoose.connect(
  'mongodb://localhost:27017/ecommerce',
  { useNewUrlParser: true }
);
app.use(express.json());
app.use('/api/photo', photo);
app.use('/api/users', user);
app.use('/api/produit', produit);
app.use(error);
const port = 5000;
app.get('/', (req, res) => {
  res.send('Please use api/users or /api/photo');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Started up at port ${port}`);
});
