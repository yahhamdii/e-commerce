import express from 'express';
import _ from 'lodash';
import Promotion from '../models/promotion';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const promotion = await Promotion.find({});
    res.send({ promotion });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findOne({ _id: id });
    if (!promotion) {
      return res.status(404).send();
    }
    res.send({ promotion });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const promotion = new Promotion({
      idproduit: req.body.input.idproduit,
      idcategory: req.body.input.idcategory,
      datedebut: req.body.input.datedebut,
      datefin: req.body.input.datefin,
      pourcentage: req.body.input.pourcentage,
    });
    const promo = await promotion.save();
    res.send(promo);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['idproduit', 'idcategory', 'datedebut', 'datefin', 'pourcentage']);
    const promotion = await Promotion.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!promotion) {
      return res.status(404).send();
    }
    res.send(promotion);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findOneAndRemove({ _id: id });
    if (!promotion) {
      return res.status(404).send();
    }

    res.send({ promotion });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
