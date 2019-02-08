import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  quantity: Number,
  idcategory: String,
}, {
  collection: 'product',
  timestamps: true,
});

const Produit = mongoose.model('product', productSchema);
export default Produit;
