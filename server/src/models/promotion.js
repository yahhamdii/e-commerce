import mongoose from 'mongoose';

const { Schema } = mongoose;
const promotionSchema = new mongoose.Schema({
  idproduit: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  idcategory: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
  datedebut: { type: Date, required: true },
  datefin: { type: Date, required: true },
  pourcentage: { type: Number, required: true },
}, {
  collection: 'promotion',
  timestamps: true,
});

const Promotion = mongoose.model('promotion', promotionSchema);
export default Promotion;
