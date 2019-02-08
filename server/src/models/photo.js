import mongoose from 'mongoose';

const photoSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  idproduct: {
    type: String,
  },

  iduser: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});
const Photo = mongoose.model('Photo', photoSchema);

export default Photo;
