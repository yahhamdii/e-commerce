import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: Number,
  idcategory: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
}, {
  collection: 'product',
  timestamps: true,
});

const Produit = mongoose.model('product', productSchema);
export default Produit;
