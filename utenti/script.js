// Script per la pagina `/utenti`

$(() => {
    fetch(`${URL}/utenti`, {
            headers: {
                Authorization: `Bearer ${getCookie('token')}`
            }
        })
        .then(async response => response.status != 204 ? [response.status, await response.json()] : [response.status, null])
        .then(([status, data]) => {
            $('#caricamento').hide();
            if (status >= 400) {
                if (status == 401 && _id()) {
                    let popup = window.open('/logout/', '_blank');
                    popup.onload = popup.close();
                }
                $('#errore').text('Errore ' + status);
                $('#errore').after($('<p class="text-muted mb-1">').text(data.message));
                return
            }
            
            if (data.length == 0) {
                $('#catautentilogo').append(`
                <div class="col-12">
                    <div class="alert alert-warning" role="alert">
                        Nessun utente trovato
                    </div>
                </div>
            `)
            }
            data.forEach((utente) => {
                $('#utenti').append(`
                <div class="col col-md-6 col-lg-4 col-xl-4">
                    <div class="card mb-4">
                        <div class="card-body text-center">
                            <img referrerpolicy="no-referrer" src="${utente.immagine}" alt="avatar" class="rounded-circle img-fluid" width=96 height=96>
                            <h5 class="my-3">${utente.email}</h5>
                            <p class="text-muted">${utente.ruolo}</p>
                            <div class="d-flex justify-content-center mb-3">
                                <button type="button" class="btn btn-primary me-1 flex-grow-1 catalogoAutore" utente="${utente._id}">Visualizza Attivit&agrave;</button>
                                <button type="button" class="btn btn-danger flex-grow-1 cambiaRuolo" utente="${utente._id}" ruolo="${utente.ruolo}">Cambia ruolo</button>
                            </div>
                        </div>
                    </div>
                </div>
            `)
            })

            $('.cambiaRuolo').click(function () {
                const utente = $(this).attr('utente');
                const ruolo = $(this).attr('ruolo');
                let nuovoRuolo = ruolo == 'autenticato' ? 'amministratore' : 'autenticato';
                fetch(`${URL}/utente/${utente}?ruolo=${nuovoRuolo}`, {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`
                    }
                }).finally(() => {
                    location.reload();
                })
            })

            $('.catalogoAutore').click(function () {
                const utente = $(this).attr('utente');
                window.location.href = `/catalogo?autore=${utente}`;
            })
        })
});