
const express = require('express')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('public'))

app.use('/', require('./public-endpoints'))
app.use('/api/v1/pokemon', require('./api/v1/pokemon'))

app.listen(port, () => console.log(`Running: http://localhost:${port}`))