import mongoose from 'mongoose';

const { Schema } = mongoose;

const colisSchema = new mongoose.Schema({
  idproduit: {
    type: Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  },
  unite: { type: String, required: true },
  quantity: Number,
}, {
  collection: 'colis',
  timestamps: true,
});

const Colis = mongoose.model('colis', colisSchema);
export default Colis;
