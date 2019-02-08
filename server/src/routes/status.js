import express from 'express';
import _ from 'lodash';
import Status from '../models/status';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const status = await Status.find({});
    res.send({ status });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const status = await Status.findOne({ _id: id });
    if (!status) {
      return res.status(404).send();
    }
    res.send({ status });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const status = new Status({
      cle: req.body.input.cle,
      libelle: req.body.input.libelle,
    });
    const stat = await status.save();
    res.send(stat);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['cle', 'libelle']);
    const status = await Status.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!status) {
      return res.status(404).send();
    }
    res.send(status);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const status = await status.findOneAndRemove({ _id: id });
    if (!status) {
      return res.status(404).send();
    }

    res.send({ status });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
