
(async () => {

    const h1 = document.querySelector('h1')
    const span = document.querySelector('span')

    //console.log(window.location)

    const { pathname } = window.location
    const [ , searchType, id ] = pathname.split('/')

    const url = searchType === 'pokemon' ? `pokemon/${id}` : `pokemon/random`

    const response = await fetch(`/api/v1/${url}`)
    const json = await response.json()

    const { name, types } = json
    h1.textContent = name
    span.textContent = types.join(', ')

})()