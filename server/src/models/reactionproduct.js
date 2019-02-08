import mongoose from 'mongoose';

const reactionproductSchema = new mongoose.Schema({
  idproduct: { type: String, required: true },
  iduser: { type: String, required: true },
  raction: { type: Number, required: true },
}, {
  collection: 'reactionproduct',
  timestamps: true,
});

const ReactionProduit = mongoose.model('reactionproduct', reactionproductSchema);
export default ReactionProduit;
