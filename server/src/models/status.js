import mongoose from 'mongoose';

const statusSchema = new mongoose.Schema({
  cle: { type: String, required: true },
  libelle: { type: String, required: true },
}, {
  collection: 'status',
  timestamps: true,
});

const Status = mongoose.model('status', statusSchema);
export default Status;
