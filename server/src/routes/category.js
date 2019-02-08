import express from 'express';
import _ from 'lodash';
import Category from '../models/category';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const category = await Category.find({});
    res.send({ category });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    if (!category) {
      return res.status(404).send();
    }
    res.send({ category });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const category = new Category({
      libelle: req.body.input.libelle,
    });
    const categorie = await category.save();
    res.send(categorie);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['libelle']);
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!category) {
      return res.status(404).send();
    }
    res.send(category);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOneAndRemove({ _id: id });
    if (!category) {
      return res.status(404).send();
    }

    res.send({ category });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
