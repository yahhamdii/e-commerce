import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  libelle: { type: String, required: true },
}, {
  collection: 'category',
  timestamps: true,
});

export default mongoose.model('category', categorySchema);
