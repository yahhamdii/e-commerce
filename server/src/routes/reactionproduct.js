import express from 'express';
import _ from 'lodash';
import ReactionProduct from '../models/reactionproduct';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const reactionproduct = await ReactionProduct.find({});
    res.send({ reactionproduct });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reactionproduct = await ReactionProduct.findOne({ _id: id });
    if (!reactionproduct) {
      return res.status(404).send();
    }
    res.send({ reactionproduct });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const reactionproduct = new ReactionProduct({
      idproduct: req.body.input.idproduct,
      iduser: req.body.input.iduser,
      reaction: req.body.input.reaction,
    });
    const reactionproducts = await reactionproduct.save();
    res.send(reactionproducts);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['idproduct', 'iduser', 'reaction']);
    const reactionproduct = await ReactionProduct.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!reactionproduct) {
      return res.status(404).send();
    }
    res.send(reactionproduct);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const reactionproduct = await ReactionProduct.findOneAndRemove({ _id: id });
    if (!reactionproduct) {
      return res.status(404).send();
    }

    res.send({ reactionproduct });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
