import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
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
})

const Post = mongoose.model('Post', postSchema)

export default Post
