import mongoose from 'mongoose';

const { Schema } = mongoose;
const stockSchema = new mongoose.Schema({
  idproduit: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  stockuc: { type: Number, required: true },
}, {
  collection: 'stock',
  timestamps: true,
});

const Stock = mongoose.model('stock', stockSchema);
export default Stock;
