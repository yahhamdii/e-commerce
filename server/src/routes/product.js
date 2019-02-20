import express from 'express';
import _ from 'lodash';
import Produit from '../models/product';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const produit = await Produit.find({});
    res.send({ produit });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produit = await Produit.findOne({ _id: id });
    if (!produit) {
      return res.status(404).send();
    }
    res.send({ produit });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const produit = new Produit({
      name: req.body.input.name,
      description: req.body.input.description,
      idcategory: req.body.input.idcategory,
    });
    const prod = await produit.save();
    res.send(prod);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['name', 'description', 'idcategory']);
    const produit = await Produit.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!produit) {
      return res.status(404).send();
    }
    res.send(produit);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const produit = await Produit.findOneAndRemove({ _id: id });
    if (!produit) {
      return res.status(404).send();
    }

    res.send({ produit });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
