import mongoose from 'mongoose';
import PointSchemaUtil from './utils/point';

function createSchema() {
  return new mongoose.Schema({
    name: String,
    email: {
      type: String,
      unique: true,
      index: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },
    password: String,
    phone: String,
    bio: String,
    avatar_url: String,
    tags: [String],
    role: {
      type: String,
      default: 'USER',
    },
    location: {
      type: PointSchemaUtil,
      index: '2dsphere',
    },
  });
}

const schema = createSchema();
export default mongoose.model('Company', schema);
