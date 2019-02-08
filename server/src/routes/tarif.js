import express from 'express';
import _ from 'lodash';
import Tarif from '../models/tarif';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const tarif = await Tarif.find({});
    res.send({ tarif });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tarif = await Tarif.findOne({ _id: id });
    if (!tarif) {
      return res.status(404).send();
    }
    res.send({ tarif });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const tarif = new Tarif({
      idproduit: req.body.input.idproduit,
      prixht: req.body.input.prixht,
      prixpvc: req.body.input.prixpvc,
      datedebutvalidite: req.body.input.datedebutvalidite,
    });
    const tarifs = await tarif.save();
    res.send(tarifs);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['idproduit', 'prixht', 'prixpvc', 'datedebutvalidite']);
    const tarif = await Tarif.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!tarif) {
      return res.status(404).send();
    }
    res.send(tarif);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tarif = await Tarif.findOneAndRemove({ _id: id });
    if (!tarif) {
      return res.status(404).send();
    }

    res.send({ tarif });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
