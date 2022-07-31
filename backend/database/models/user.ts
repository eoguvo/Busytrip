import { ROLES } from './../../config/index';
import mongoose from '..';
import PointSchemaUtil from './utils/point';

function createSchema() {
  return new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      sparse: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    ratings: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    phone: String,
    bio: String,
    avatar_url: {
      type: String
    },
    cover: {
      type: String,
      default: 'https://via.placeholder.com/2000x200'
    },
    categories: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    }],
    role: {
      type: Number,
      enum: ROLES,      
      default: ROLES.USER,
    },
    location: {
      type: PointSchemaUtil,
      index: '2dsphere',
    },
  }, { timestamps: true });
}

const schema = createSchema();
export default mongoose.model('User', schema);
