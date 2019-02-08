import express from 'express';
import _ from 'lodash';
import MessageClient from '../models/messageclient';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const messageclient = await MessageClient.find({});
    res.send({ messageclient });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messageclient = await MessageClient.findOne({ _id: id });
    if (!messageclient) {
      return res.status(404).send();
    }
    res.send({ messageclient });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const messageclient = new MessageClient({
      name: req.body.input.name,
      email: req.body.input.email,
      object: req.body.input.object,
      message: req.body.input.message,
    });
    const messagec = await messageclient.save();
    res.send(messagec);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['name', 'email', 'object', 'message']);
    const messageclient = await MessageClient.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!messageclient) {
      return res.status(404).send();
    }
    res.send(messageclient);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const messageclient = await MessageClient.findOneAndRemove({ _id: id });
    if (!messageclient) {
      return res.status(404).send();
    }

    res.send({ messageclient });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
