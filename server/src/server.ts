import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'
import multipart from '@fastify/multipart'
import { resolve } from 'node:path'
import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(cors, {
  // allow all frontend pages can request info from backend
  origin: true,
})

app.register(jwt, {
  // token cryptography
  secret: 'spacetime',
})

app.register(multipart)

app.register(require('@fastify/static'), {
  root: resolve(__dirname, '../uploads'),
  prefix: '/uploads',
})

app.register(authRoutes)
app.register(memoriesRoutes)
app.register(uploadRoutes)

app
  .listen({
    port: 3333,
    // host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on port http://localhost:3333')
  })
