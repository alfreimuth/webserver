
// const path = require('path')
const express = require('express')

const app = express()
const port = 3000


// allow us to send JSON
app.use(express.json())
// allow us to respond with static webpages
app.use(express.static('public'))


// attach endpoints
app.use(require('./routes/static'))
app.use('/api/v1/pokemon', require('./routes/api/v1/pokemon'))

app.listen(port, () => console.log(`http://localhost:${port}/`))