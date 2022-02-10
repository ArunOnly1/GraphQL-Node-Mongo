import bcrypt from 'bcrypt'

import { generateAccessToken, generateRefreshToken } from '../lib/utils'

export const Mutation = {
  signUp: async (parents, { data }, { models: { User } }, info) => {
    try {
      const userExists = await User.findOne({
        $or: [{ email: data.email }, { username: data.username }],
      })

      if (userExists) {
        throw new Error('User already exists')
      }

      const newUser = new User({ ...data })
      newUser.password = await bcrypt.hash(newUser.password, 10)
      const insertedUser = await newUser.save()

      return insertedUser
    } catch (error) {
      throw new Error(error.message)
    }
  },

  login: async (parents, { data }, { models: { User } }, info) => {
    try {
      const user = await User.findOne({ email: data.email })

      if (!user) {
        throw new Error('Incorrect Email/Password')
      }

      const isValidPassword = await bcrypt.compare(data.password, user.password)

      if (!isValidPassword) {
        throw new Error('Incorrect Email/Password')
      }

      const accesstoken = generateAccessToken(user._id)
      const refreshtoken = generateRefreshToken(user._id)

      return {
        accesstoken,
        refreshtoken,
      }
    } catch (error) {
      throw new Error(error.message)
    }
  },

  createPost: async (
    parent,
    { data },
    { models: { Post }, authUser },
    info
  ) => {
    try {
      console.log(authUser)
      return 'Success'
    } catch (error) {
      throw new Error(error.message)
    }
  },
}
