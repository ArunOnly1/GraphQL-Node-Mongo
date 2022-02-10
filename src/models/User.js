import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      minlength: [4, 'Too short'],
      maxlength: [20, 'Too large'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: [4, 'Too short'],
      maxlength: [256, 'Too large'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
  }
)

const User = mongoose.model('User', userSchema)

export { User as default }
