import { Schema, model } from 'mongoose'

const postSchema = new Schema({
  title: {
    type: String,
    minlength: [2, 'Too small title'],
    maxlength: [50, 'Too long title'],
    trim: true,
    required: true,
  },
  body: {
    type: String,
    minlength: [5, 'Too small title'],
    maxlength: [120, 'Too long title'],
    trim: true,
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Post = model('Post', postSchema)

export default Post
