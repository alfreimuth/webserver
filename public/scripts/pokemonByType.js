
(async () => {
    const h2 = document.querySelector('h2')
    const span = document.querySelector('span')

    const { pathname } = window.location
    const [, searchType, id ] = pathname.split('/')

    const url = (() => {
        if(searchType === 'pokemon') return `/api/v1/pokemon/${id}`
        if(searchType === 'type') return `/api/v1/pokemon/type/${id}`
        return '/api/v1/random-pokemon'
    })
    const result = await fetch(url)
    const data = await result.json()

    if (responseData.error) {
        h2.textContent = responseData.error.message;
        span.textContent = '';
        return;
    }    

    const { name, types } = data

    h2.textContent = name
    span.textContent = types.join(', ')
})()
