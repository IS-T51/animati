// Script per la pagina `/profilo`

$(()=>{
    fetch(`${URL}/utente`, {
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
        $('#errore').hide();
        $('#caricamento').hide();
        $('#email').text(data.email).show();
        $('#ruolo').text(data.ruolo).show();
        $('#immagine').attr('src', data.immagine).show();
        $('#catalogoAutore').click(()=>{
            location.href=`/catalogo?autore=${data._id}`
        }).show();
        if(data.ruolo == 'amministratore'){
            $('#promossoDa').text(`Promosso da #${data.promossoDa}`).show();
        }
    }).catch((error) => {
        $('#caricamento').hide();
        $('#errore').text('Errore: ' + error);
    });
    $('#logout').click(()=>{
        location.href = '/logout';
    });
})
