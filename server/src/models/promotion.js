import mongoose from 'mongoose';

const promotionSchema = new mongoose.Schema({
  idproduit: { type: String, required: true },
  idcategory: { type: String, required: true },
  datedebut: { type: Date, required: true },
  datefin: { type: Date, required: true },
  pourcentage: { type: String, required: true },
}, {
  collection: 'promotion',
  timestamps: true,
});

const Promotion = mongoose.model('promotion', promotionSchema);
export default Promotion;
