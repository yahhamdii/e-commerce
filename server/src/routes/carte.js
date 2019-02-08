import express from 'express';
import _ from 'lodash';
import Carte from '../models/carte';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const carte = await Carte.find({});
    res.send({ carte });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const carte = await Carte.findOne({ _id: id });
    if (!carte) {
      return res.status(404).send();
    }
    res.send({ carte });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const carte = new Carte({
      idproduit: req.body.input.idproduit,
      idorder: req.body.input.idorder,
      unitprice: req.body.input.unitprice,
      totalprice: req.body.input.totalprice,
      quantity: req.body.input.quantity,
    });
    const cart = await carte.save();
    res.send(cart);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['idproduit', 'idorder', 'unitprice', 'totalprice', 'quantity']);
    const carte = await Carte.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!carte) {
      return res.status(404).send();
    }
    res.send(carte);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const carte = await Carte.findOneAndRemove({ _id: id });
    if (!carte) {
      return res.status(404).send();
    }

    res.send({ carte });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
