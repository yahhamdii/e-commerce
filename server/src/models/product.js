import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
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
