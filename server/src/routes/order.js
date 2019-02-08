import express from 'express';
import _ from 'lodash';
import Order from '../models/order';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const order = await Order.find({});
    res.send({ order });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ _id: id });
    if (!order) {
      return res.status(404).send();
    }
    res.send({ order });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const order = new Order({
      userid: req.body.input.userid,
      poids: req.body.input.poids,
      totalprice: req.body.input.totalprice,
      comment: req.body.input.comment,
      validatingdate: req.body.input.validationdate,
      validatorid: req.body.input.validatorid,
    });
    const orders = await order.save();
    res.send(orders);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['userid', 'poids', 'totalprice', 'comment', 'validatingdate', 'validatorid']);
    const order = await Order.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!order) {
      return res.status(404).send();
    }
    res.send(order);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOneAndRemove({ _id: id });
    if (!order) {
      return res.status(404).send();
    }

    res.send({ order });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
