import mongoose from 'mongoose'

import debug from 'debug'

export const db_connect = async () => {
  try {
    await mongoose.connect(encodeURI(process.env.DATABASE), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Database is connected')
  } catch (error) {
    console.log(`Database connection fail`)
    console.log(error.message)
  }
}
