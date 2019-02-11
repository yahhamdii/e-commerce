import mongoose from 'mongoose';

const { Schema } = mongoose;
const categorySchema = new mongoose.Schema({
  libelle: { type: String, required: true },
  idcategory: {
    type: Schema.Types.ObjectId,
    ref: 'category',
  },
}, {
  collection: 'category',
  timestamps: true,
});

export default mongoose.model('category', categorySchema);
