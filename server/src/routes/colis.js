import express from 'express';
import _ from 'lodash';
import Colis from '../models/colis';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const colis = await Colis.find({});
    res.send({ colis });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const colis = await Colis.findOne({ _id: id });
    if (!colis) {
      return res.status(404).send();
    }
    res.send({ colis });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const colis = new Colis({
      idproduit: req.body.input.idproduit,
      unite: req.body.input.unite,
      quantity: req.body.input.quantity,
    });
    const coli = await colis.save();
    res.send(coli);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['idproduit', 'unite', 'quantity']);
    const colis = await Colis.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!colis) {
      return res.status(404).send();
    }
    res.send(colis);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const colis = await Colis.findOneAndRemove({ _id: id });
    if (!colis) {
      return res.status(404).send();
    }

    res.send({ colis });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
