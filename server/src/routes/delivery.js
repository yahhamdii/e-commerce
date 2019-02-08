import express from 'express';
import _ from 'lodash';
import Delivery from '../models/delivery';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const delivery = await Delivery.find({});
    res.send({ delivery });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findOne({ _id: id });
    if (!delivery) {
      return res.status(404).send();
    }
    res.send({ delivery });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const delivery = new Delivery({
      orderid: req.body.input.orderid,
      tarifdelivery: req.body.input.tarifdelivery,
      deliverydate: req.body.input.deliverydate,
      deliverymode: req.body.input.deliverymode,
    });
    const deliv = await delivery.save();
    res.send(deliv);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['orderid', 'tarifdelivery', 'deliverydate', 'deliverymode']);
    const delivery = await Delivery.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!delivery) {
      return res.status(404).send();
    }
    res.send(delivery);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const delivery = await Delivery.findOneAndRemove({ _id: id });
    if (!delivery) {
      return res.status(404).send();
    }

    res.send({ delivery });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
