import mongoose from 'mongoose';

const tarifSchema = new mongoose.Schema({
  idproduit: { type: String, required: true },
  prixht: { type: String, required: true },
  prixpvc: { type: String, required: true },
  datedebutvalidite: Date,
}, {
  collection: 'tarif',
  timestamps: true,
});

const Tarif = mongoose.model('tarif', tarifSchema);
export default Tarif;
