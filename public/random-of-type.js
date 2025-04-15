
(async () => {

    const h1 = document.querySelector('h1')
    const span = document.querySelector('span')
    
    const { pathname } = window.location
    const [ , , type ] = pathname.split('/')

    document.title = `${type} pokemon`

    const response = await fetch(`/api/v1/pokemon/types/${type}`)
    const json = await response.json()

    const { name, types } = json
    h1.textContent = name
    span.textContent = types.join(', ')

})()