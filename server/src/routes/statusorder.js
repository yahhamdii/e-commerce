import express from 'express';
import _ from 'lodash';
import StatusOrder from '../models/statusorder';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const statusorder = await StatusOrder.find({});
    res.send({ statusorder });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const statusorder = await StatusOrder.findOne({ _id: id });
    if (!statusorder) {
      return res.status(404).send();
    }
    res.send({ statusorder });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const statusorder = new StatusOrder({
      idorder: req.body.input.idorder,
      idstatus: req.body.input.idstatus,
    });
    const statuso = await statusorder.save();
    res.send(statuso);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['orderid', 'statusid']);
    const statusorder = await StatusOrder.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!statusorder) {
      return res.status(404).send();
    }
    res.send(statusorder);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const statusorder = await StatusOrder.findOneAndRemove({ _id: id });
    if (!statusorder) {
      return res.status(404).send();
    }

    res.send({ statusorder });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
