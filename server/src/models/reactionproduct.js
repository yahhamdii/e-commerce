import mongoose from 'mongoose';

const { Schema } = mongoose;
const reactionproductSchema = new mongoose.Schema({
  idproduit: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  iduser: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  reaction: { type: Number, required: true },
}, {
  collection: 'reactionproduct',
  timestamps: true,
});

const ReactionProduit = mongoose.model('reactionproduct', reactionproductSchema);
export default ReactionProduit;
