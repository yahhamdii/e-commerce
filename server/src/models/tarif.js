import mongoose from 'mongoose';

const { Schema } = mongoose;
const tarifSchema = new mongoose.Schema({
  idproduit: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  prixht: { type: Number, required: true },
  prixpvc: { type: Number, required: true },
  datedebutvalidite: Date,
}, {
  collection: 'tarif',
  timestamps: true,
});

const Tarif = mongoose.model('tarif', tarifSchema);
export default Tarif;
