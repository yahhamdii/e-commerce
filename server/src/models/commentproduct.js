import mongoose from 'mongoose';

const { Schema } = mongoose;
const commentproductSchema = new mongoose.Schema({
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
  commentaire: { type: String },
  note: { type: Number },
}, {
  collection: 'commentproduct',
  timestamps: true,
});

const CommentProduit = mongoose.model('commentproduct', commentproductSchema);
export default CommentProduit;
