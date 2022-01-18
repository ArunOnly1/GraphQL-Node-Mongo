import Post from './models/Post'

const resolvers = {
  Query: {
    hello: () => 'Hello I am Arun',
    posts: async () => {
      const posts = await Post.find()
      return posts
    },
  },
  Mutation: {
    createPost: async (parent, { data: { title, body } }, ctx, info) => {
      const newPost = new Post({ title, body })
      const insertedPost = await newPost.save()
      return insertedPost
    },
    updatePost: async (parent, { id, data: { title, body } }, ctx, info) => {
      if (title || body) {
        const post = Post.findByIdAndUpdate(
          id,
          { title, body },
          { new: true, upsert: true }
        )
        return post
      }
    },
  },
}

export { resolvers as default }
