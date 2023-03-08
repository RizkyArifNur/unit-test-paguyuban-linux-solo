const express = require('express')
const { bookRouter } = require('./routers/book.router')
const { healthRouter } = require('./routers/health.router')
const app = express()

app.use(express.json())

app.use('/books', bookRouter)
app.use('/health', healthRouter)

app.listen(process.env.PORT, ()=> {
    console.log(`Apps run on port ${process.env.PORT}`)
})