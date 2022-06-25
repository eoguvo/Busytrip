import mongoose from 'mongoose';

function createSchema() {
  return new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  });
}

export default createSchema();
