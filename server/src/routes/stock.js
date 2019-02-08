import express from 'express';
import _ from 'lodash';
import Stock from '../models/stock';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const stock = await Stock.find({});
    res.send({ stock });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findOne({ _id: id });
    if (!stock) {
      return res.status(404).send();
    }
    res.send({ stock });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const stock = new Stock({
      idproduit: req.body.input.idproduit,
      stockuc: req.body.input.stockuc,
    });
    const stocks = await stock.save();
    res.send(stocks);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['idproduit', 'stcokuc']);
    const stock = await Stock.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!stock) {
      return res.status(404).send();
    }
    res.send(stock);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findOneAndRemove({ _id: id });
    if (!stock) {
      return res.status(404).send();
    }

    res.send({ stock });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
