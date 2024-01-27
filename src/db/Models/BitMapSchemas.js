import mongoose from 'mongoose';
const { Schema } = mongoose;
const bitSchema = new Schema({
    mapId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    sortNumber: {
      type: Number,
      required: true
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    locked: {
      type: Boolean,
      default: false
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  export const Bit = mongoose.model('Bit', bitSchema);