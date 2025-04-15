
const path = require('path')
const express = require('express')

const router = express.Router()

const root = path.join(__dirname, 'public')

router.get('/', (_, response) => {
    response.sendFile('index.html', { root })
})

router.get('/pokemon/:id', (_, response) => {
    response.sendFile('index.html', { root })
})

router.get('/types/:type', (_, response) => {
    response.sendFile('type.html', { root })
})

module.exports = router