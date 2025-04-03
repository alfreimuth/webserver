
(async () => {
    const h2 = document.querySelector('h2')
    const span = document.querySelector('span')

    const { pathname } = window.location
    const [, searchType, id ] = pathname.split('/')

    const url = searchType === 'pokemon'
        ? `/api/v1/pokemon/${id}`
        : '/api/v1/random-pokemon'
    
    const result = await fetch(url)
    const { name, types } = await result.json()

    h2.textContent = name
    span.textContent = types.join(', ')
})()
