import { sign, verify } from 'jsonwebtoken'

export const generateAccessToken = (id) => {
  try {
    const accesstoken = sign({ _id: id }, process.env.JWT_ACCESS_SECRET_KEY, {
      expiresIn: '3600',
    })

    return accesstoken
  } catch (error) {
    throw new Error(error.message)
  }
}

export const generateRefreshToken = (id) => {
  try {
    const refreshtoken = sign({ _id: id }, process.env.JWY_REFRESH_SECRET_KEY, {
      expiresIn: '86400',
    })

    return refreshtoken
  } catch (error) {
    throw new Error(error.message)
  }
}

export const getAuthUser = async (req, User) => {
  const tokenWithBearer = req.headers.authorization || ''
  const token = tokenWithBearer.split(' ')[1]

  console.log({ token })
  if (!token) {
    return null
  }

  try {
    console.log({ env: process.env.JWT_ACCESS_SECRET_KEY })
    const payload = verify(token, process.env.JWT_ACCESS_SECRET_KEY)
    if (!payload) {
      throw new Error('No payload decrypted')
    }
    console.log('I am here')
    console.log({ payload })
    const user = await User.findOne({ _id: payload._id })

    if (!user) {
      return null
    }

    return user
  } catch (error) {
    // return null
    throw new Error(error.message)
  }
}
