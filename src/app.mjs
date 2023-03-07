import express from 'express'
import { bookRouter } from './controllers/books.controller.mjs'
import { healthRouter } from './controllers/health.controller.mjs'

const app = express()

app.use(express.json())

app.use('/books', bookRouter)
app.use('/health', healthRouter)

app.listen(process.env.PORT, ()=> {
    console.log(`Apps run on port ${process.env.PORT}`)
})