
const path = require('path')
const express = require('express')
const app = express()

const port = 3010

const root = path.join(__dirname, 'public')

const pokemon = [
    { id: 1, name: 'Bulbasaur', types: ['grass','poison'] },
    { id: 2, name: 'Ivysaur', types: ['grass','poison'] },
    { id: 3, name: 'Venusaur', types: ['grass','poison'] },
    { id: 4, name: 'Charmander', types: ['fire'] },
    { id: 5, name: 'Charmeleon', types: ['fire'] },
    { id: 6, name: 'Charizard', types: ['fire', 'flying'] },
    { id: 7, name: 'Squirtle', types: ['water'] },
    { id: 8, name: 'Wartortle', types: ['water'] },
    { id: 9, name: 'Blastoise', types: ['water'] },
]

// allow us to send JSON
app.use(express.json())
// allow us to respond with static webpages
app.use(express.static('public'))


app.get('/', (request, response) => {
    response.sendFile('index.html', { root })
})

app.get('/pokemon/:id', (request, response) => {
    response.sendFile('index.html', { root })
})

// app.get('/api/v1/random-pokemon', (request, response) => {
//     const r = Math.floor(Math.random() * 9)
//     response.send(pokemon[r])
// })

app.get('/api/v1/pokemon/:id', (request, response) => {
    const { id } = request.params
    const found = pokemon.find(p => p.id.toString() === id)
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with id: ${id}`}})
})

app.get('/api/v1/random-pokemon/type/:type', (request, response) => {
    const { type } = request.params
    const found = pokemon.filter(p => {
        p.types.some(ptype => {ptype.toLowerCase() === type.toLowerCase})
    })
    const r = Math.floor(Math.random() * found.length)
    if (found.length > 0) response.send(found[r])
    else response.send({ error: { message: `Could not find pokemon with type: ${type}` }})
})

app.listen(port, () => console.log(`http://localhost:${port}/`))

