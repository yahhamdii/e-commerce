import mongoose from 'mongoose';

const carteSchema = new mongoose.Schema({
  idproduit: { type: String, required: true },
  idorder: { type: String, required: true },
  unitprice: { type: String, required: true },
  totalprice: String,
  quantite: Number,
}, {
  collection: 'carte',
  timestamps: true,
});

const Carte = mongoose.model('carte', carteSchema);
export default Carte;
