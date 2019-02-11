import mongoose from 'mongoose';

const supplierSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  adress: String,
  phone: String,
}, {
  collection: 'supplier',
  timestamps: true,
});

export default mongoose.model('supplier', supplierSchema);
