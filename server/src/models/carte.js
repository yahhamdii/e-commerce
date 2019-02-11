import mongoose from 'mongoose';

const { Schema } = mongoose;

const carteSchema = new mongoose.Schema({
  idproduit: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  idorder: {
    type: Schema.Types.ObjectId,
    ref: 'order',
    required: true,
  },
  unitprice: { type: Number, required: true },
  totalprice: Number,
  quantity: Number,
}, {
  collection: 'carte',
  timestamps: true,
});

const Carte = mongoose.model('carte', carteSchema);
export default Carte;
