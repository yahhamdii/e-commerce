import mongoose from 'mongoose';

const { Schema } = mongoose;
const photoSchema = mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  idproduit: {
    type: Schema.Types.ObjectId,
    ref: 'product',
  },
  iduser: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
},
{
  collection: 'photo',
  timestamps: true,
});
const Photo = mongoose.model('photo', photoSchema);

export default Photo;
