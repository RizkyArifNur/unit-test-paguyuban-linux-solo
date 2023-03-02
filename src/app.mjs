import express from 'express'
import { bookRouter } from './controllers/books.controller.mjs'

const app = express()

app.use(express.json())

app.use('/books', bookRouter)

app.listen(process.env.PORT, ()=> {
    console.log(`Apps run on port ${process.env.PORT}`)
})