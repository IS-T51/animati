// Script per la pagina `/google`

// Funzione per ottenere il codice di autorizzazione
let searchParams = new URLSearchParams(window.location.search)
let code = searchParams.get('code')
let scope = searchParams.get('scope')
let hd = searchParams.get('hd')

// Ottengo il mio token
fetch('https://api.animati.app/google?code='+encodeURIComponent(code))
.then((response) => response.json())
.then((token) => console.log(token));
