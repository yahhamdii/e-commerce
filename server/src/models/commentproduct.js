import mongoose from 'mongoose';

const commentproductSchema = new mongoose.Schema({
  idproduct: { type: String, required: true },
  iduser: { type: String, required: true },
  commentaire: { type: String, required: true },
}, {
  collection: 'commentproduct',
  timestamps: true,
});

const CommentProduit = mongoose.model('commentproduct', commentproductSchema);
export default CommentProduit;
