// Script per la pagina `/logout`

eraseCookie('token');   
window.location.replace(location.origin);
