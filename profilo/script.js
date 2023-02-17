// Script per la pagina `/profilo`

$(() => {
    fetch(`${URL}/utente`, {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            }
        })
        .then(async response => response.status != 204 ? [response.status, await response.json()] : [response.status, null])
        .then(([status, data]) => {
            $('#caricamento').hide();
            if (status >= 400) {
                if (res.status == 401 && _id()) {
                    let popup = window.open('/logout/', '_blank');
                    popup.onload = popup.close();
                }
                $('#errore').text('Errore ' + status);
                $('#errore').after($('<p class="text-muted mb-1">').text(data.message));
                return
            }

            // 200:
            $('#errore').hide();
            $('#email').text(data.email).show();
            $('#ruolo').text(data.ruolo).show();
            $('#immagine').attr('src', data.immagine).show();
            $('#catalogoAutore').click(() => {
                location.href = `/catalogo?autore=${data._id}`
            }).show();
            if (data.ruolo == 'amministratore') {
                $('#promossoDa').text(`Promosso da #${data.promossoDa}`).show();
            }
        }).catch((error) => {
            $('#caricamento').hide();
            $('#errore').text('Errore: ' + error);
        });
    $('#logout').click(() => {
        location.href = '/logout';
    });
})