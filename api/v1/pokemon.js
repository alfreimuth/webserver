
const router = require('express').Router()

const { ObjectId, getCollection } = require('../../dbconnect')

// const pokemon = [ 
//     { id: 1, name: 'Bulbasaur', types: ['grass', 'poison'] },
//     { id: 2, name: 'Ivysaur', types: ['grass', 'poison'] },
//     { id: 3, name: 'Venusaur', types: ['grass', 'poison'] },
//     { id: 4, name: 'Charmander', types: [ 'fire' ] }
// ]

// api routes
router.get('/random', async (_, response) => {
    const collection = await getCollection('pokemonDB' , 'pokemon')
    const count = await collection.countDocuments()
    const randomNumber = Math.floor(Math.random() * count) + 1
    const found = await collection.findOne({ number: randomNumber})
    response.send(found)
})

router.get('/byDBID/:id', async (request, response) => {
    const { id } = request.params 
    const collection = await getCollection('pokemonDB', 'pokemon')
    const found = await collection.findOne({_id: new ObjectId(id) })
    if (found) return response.send(found)

    response.status(404).send({ error: `Could not find pokemon with id ${id}`})

})

router.get('/:id', async (request, response) => {
    const { id } = request.params // remember that id is a string
    const number = parseInt(id) // number will either be a number or NaN

    const collection = await getCollection('pokemonDB' , 'pokemon')

    if (isNaN(number)) {
        const found = await collection.findOne({ "name": id})
        if (found) return response.send(found)
    }
    else {
        const found = await collection.findOne({ "number": number })
        if (found) return response.send(found)
    }

    // const searchId = id
    // const match = pokemon.find(({ id, name }) => {
    //     if (searchId === id.toString()) return true
    //     if (searchId.toLowerCase() === name.toLowerCase()) return true
    //     return false
    // })

    // if (match) return response.send(match)

    // no match found
    response.status(404).send({ error: `Could not find pokemon with index ${id}`})
})

router.get('/types/:type', async (request, response) => {
    const { type } = request.params

    const collection = await getCollection('pokemonDB' , 'pokemon')

    const pokemon = await collection.find({})

    pokemon.map(p => p.type === type)
    response.send(pokemon.map(p => p.type === type))

    // const pokemonOfType = pokemon.filter(({ types }) => {
    //     return types.includes(type.toLocaleLowerCase())
    // })

    // const randomNumber = Math.floor(Math.random() * pokemonOfType.length)
    // response.send(pokemonOfType[randomNumber])
})

router.post('/', async (request, response) => {
    const { id, name, types } = request.body

    if (!id || !name || !types || types.length === 0) {
        response.status(400).send({ error: true, message: `missing id, name, or types`})
        return
    }

    const collection = await getCollection('pokemonDB' , 'pokemon')

    const number = id

    const found = await collection.findOne({ "number": number })
    if (found) return response.status(400).send({ error: true, message: `Pokemon already in database`})

    // get back from the insert
    const { acknowledged, insertedId } = await collection.insertOne({ number, name, types })
    response.send({ acknowledged, insertedId })


    // const tempId = id
    // const exists = pokemon.find(({ id }) => id === tempId)
    // if (exists) {
    //     response.status(400).send({ error: true, message: `id already exists`})
    //     return
    // }

    // pokemon.push({ id, name, types })

    response.send({ message: `pokemon added`})
})

module.exports = router