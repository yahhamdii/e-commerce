import express from 'express';
import _ from 'lodash';
import CommentProduct from '../models/commentproduct';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const commentproduct = await CommentProduct.find({});
    res.send({ commentproduct });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commentproduct = await CommentProduct.findOne({ _id: id });
    if (!commentproduct) {
      return res.status(404).send();
    }
    res.send({ commentproduct });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const commentproduct = new CommentProduct({
      idproduit: req.body.input.idproduit,
      iduser: req.body.input.iduser,
      commentaire: req.body.input.commentaire,
      note: req.body.input.note,
    });
    const commentp = await commentproduct.save();
    res.send(commentp);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['idproduit', 'iduser', 'commentaire', 'note']);
    const commentproduct = await CommentProduct.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!commentproduct) {
      return res.status(404).send();
    }
    res.send(commentproduct);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const commentproduct = await CommentProduct.findOneAndRemove({ _id: id });
    if (!commentproduct) {
      return res.status(404).send();
    }

    res.send({ commentproduct });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
