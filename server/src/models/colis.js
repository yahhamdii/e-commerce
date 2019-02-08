import mongoose from 'mongoose';

const colisSchema = new mongoose.Schema({
  idproduit: { type: String, required: true },
  unite: { type: String, required: true },
  quantity: Number,
}, {
  collection: 'colis',
  timestamps: true,
});

const Colis = mongoose.model('colis', colisSchema);
export default Colis;
