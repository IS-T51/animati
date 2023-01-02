// Script per la pagina `/attività`

// Get parameters from query string
const query = new URLSearchParams(window.location.search);
const id = query.get('id');

$(()=>{
    if(!id) {
        $('#errore').text('Errore: nessun ID specificato');
        $('#caricamento').hide();
        return;
    }

    fetch(`${URL}/attivita/${id}`, {
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
        $('#errore').hide();
        $('#caricamento').hide();

        $('#informazioni_titolo').text(data.informazioni.titolo).show();
        $('#banner').attr('src', data.banner).show();
        $('#autore').text(`Autore: #${data.autore}`).show();
        let ultimaModifica = new Date(data.ultimaModifica);
        $('#ultimaModifica').text(`Ultima modifica: ${ultimaModifica.toLocaleDateString()} ${ultimaModifica.toLocaleTimeString()}`).show();
        let Markdown = window.markdownit();
        let descrizione = Markdown.render(data.informazioni.descrizione);
        $('#informazioni_descrizione').html(descrizione).show();
        data.collegamenti.forEach((collegamento) => {
            let col = $('<div class="col-12 col-md-6 col-lg-4 mb-1"></div>');
            let link = $(`<a href="${collegamento.link}" target="_blank" class="btn btn-secondary w-100">${collegamento.nome} <i class="fas fa-external-link-alt"></i></a>`);
            $('#collegamenti').append(col.append(link));
        });
        if(data.collegamenti) $('#collegamenti').show(); 
        
        if(ruolo() == 'amministratore' || _id() == data.autore) {
            $('#modifica').attr('disabled', false);
        }
        $('#modifica').show();
        $('#aggiungiAListe,#aggiungiAListe button').show();
    }).catch((error) => {
        $('#caricamento').hide();
        $('#errore').text('Errore: ' + error);
    });

    fetch(`${URL}/liste`, {
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
        data.sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach((lista) => {
            var aggiungi = $(`<li><a class="dropdown-item" href="#">${lista.nome}</a></li>`);
            aggiungi.on('click', () => {
                fetch(`${URL}/lista/${lista._id}?attivita=${id}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${getCookie('token')}`
                    }
                })
                // TODO: Handle errors
            });
            $('#liste').append(aggiungi);
        });
    })

    $('#modifica').on('click', ()=>{
        location.href=`/attività/modifica?id=${id}`
    })


})
