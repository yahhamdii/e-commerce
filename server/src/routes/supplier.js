import express from 'express';
import _ from 'lodash';
import Supplier from '../models/carte';

const router = express.Router();

router.get('/', async (_req, res) => {
  try {
    const supplier = await Supplier.find({});
    res.send({ supplier });
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findOne({ _id: id });
    if (!supplier) {
      return res.status(404).send();
    }
    res.send({ supplier });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.post('/', async (req, res) => {
  try {
    const supplier = new Supplier({
      firstname: req.body.input.firstname,
      lastname: req.body.input.lastname,
      email: req.body.input.email,
      adresse: req.body.input.adresse,
      phone: req.body.input.phone,
    });
    const suppliers = await supplier.save();
    res.send(suppliers);
  } catch (e) {
    res.status(400).send(e);
  }
  return null;
});
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = _.pick(req.body.input, ['firstname', 'lastname', 'email', 'adresse', 'phone']);
    const supplier = await Supplier.findOneAndUpdate(
      { _id: id },
      { $set: body },
      { new: true }
    );
    if (!supplier) {
      return res.status(404).send();
    }
    res.send(supplier);
  } catch (e) {
    res.status(400).send();
  }
  return null;
});
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findOneAndRemove({ _id: id });
    if (!supplier) {
      return res.status(404).send();
    }

    res.send({ supplier });
  } catch (e) {
    res.status(400).send();
  }
  return null;
});

export default router;
