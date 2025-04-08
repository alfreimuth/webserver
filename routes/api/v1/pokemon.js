const router = require('express').Router()

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

router.get('/random', (request, response) => {
    const r = Math.floor(Math.random() * 9)
    response.send(pokemon[r])
})

router.post('/add', (request, response) => {
    const { id, name, type } = request.body
    console.log({ id, name, type })

    const found = pokemon.find(p => p.id.toString() === id.toString())
    if (found) response.send({ error: { message: `Pokemon with id: ${id}, already exists`} })
    else pokemon.push({ id, name, type })
})

router.get('/:id', (request, response) => {
    const { id } = request.params
    const found = pokemon.find(p => p.id.toString() === id)
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find pokemon with id: ${id}` }})
})

router.get('/types/:type', (request, response) => {
    const { type } = request.params

    const pokemonOfType = pokemon.filter(({ types }) => {
        return types.includes(type.toLocaleLowerCase())
    })
    const randomNumber = Math.floor(Math.random() * pokemonOfType.length)
    response.send(pokemonOfType[randomNumber])
    // const found = pokemon.filter(p => { p.types.some(ptype => {ptype.toLowerCase() === type.toLowerCase()})})
    // const r = Math.floor(Math.random() * found.length)
    // if (found.length > 0) response.send(found[r])
    // else response.send({ error: { message: `Could not find pokemon with type: ${type}` }})
})

module.exports = router
