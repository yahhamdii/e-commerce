import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  idproduit: { type: String, required: true },
  stockuc: { type: Number, required: true },
}, {
  collection: 'product',
  timestamps: true,
});

const Stock = mongoose.model('stock', stockSchema);
export default Stock;
