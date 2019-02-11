import express from 'express';
import mongoose from 'mongoose';
import photo from './routes/photo';
import user from './routes/user';
import category from './routes/category';
import produit from './routes/product';
import tarif from './routes/tarif';
import stock from './routes/stock';
import reactionproduct from './routes/reactionproduct';
import promotion from './routes/promotion';
import colis from './routes/colis';
import commentproduct from './routes/commentproduct';
import carte from './routes/carte';
import order from './routes/order';
import status from './routes/status';
import statusorder from './routes/statusorder';
import delivery from './routes/delivery';
import supplier from './routes/supplier';
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
app.use('/api/category', category);
app.use('/api/produit', produit);
app.use('/api/tarif', tarif);
app.use('/api/stock', stock);
app.use('/api/reactionproduct', reactionproduct);
app.use('/api/promotion', promotion);
app.use('/api/colis', colis);
app.use('/api/commentproduct', commentproduct);
app.use('/api/carte', carte);
app.use('/api/order', order);
app.use('/api/status', status);
app.use('/api/statusorder', statusorder);
app.use('/api/delivery', delivery);
app.use('/api/supplier', supplier);
app.use(error);
const port = 5000;
app.get('/', (req, res) => {
  res.send('Please use api/users or /api/photo');
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Started up at port ${port}`);
});
