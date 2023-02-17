// Script per la pagina `/catalogo`

// Ottieni filtro da query string
var query = new URLSearchParams(window.location.search);

$(()=>{
    query.forEach((value, key) => {
        $(`#filtro_${key.replace(/Min$/,'').replace(/Max$/, '')}`).val(value);
    });

    // Ottieni attività
    fetch(`${URL}/catalogo?${query.toString()}`)
    .then(async response => response.status != 204 ? [response.status, await response.json()] : [response.status, null])
    .then(([status, data]) => {
        $('#caricamento').hide();
        if(status == 204) {
            $('#errore').text('Nessuna attività trovata');
            return
        }
        if(status >= 400) {
            if (status == 401 && _id()) {
                let popup = window.open('/logout/', '_blank');
                popup.onload = popup.close();
            }
            $('#errore').text('Errore '+status);
            $('#errore').after($('<p class="text-muted mb-1">').text(data.message));
            return
        }

        // 200:
        $('#loading').hide();
        data.forEach((attivita) => {
            $('#catalogo').append(`
                <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card mb-4">
                        <div class="card-header text-center">
                            <h4 class="card-title">${attivita.informazioni.titolo}</h4>
                        </div>
                        <img src="${attivita.banner}" class="card-img-top" referrerpolicy="no-referrer" alt="Immagine dell'attività"></img>
                        <div class="card-body text-center">
                            <a href="/attività/?id=${attivita._id}" class="btn btn-primary">Vai all'attività</a>
                        </div>
                    </div>
                </div>
            `)
        })
    })

    // Aggiungi filtro
    $('#filtri').on('submit', (e) => {
        var filtro = {};
        filtro.titolo = $('#filtro_titolo').val();
        filtro.descrizione = $('#filtro_descrizione').val();
        filtro.giocatoriMin = parseInt($('#filtro_giocatori').val());
        filtro.giocatoriMax = parseInt($('#filtro_giocatori').val());
        filtro.durataMin = parseInt($('#filtro_durata').val())*parseInt($('#durataUnità').val());
        filtro.durataMax = parseInt($('#filtro_durata').val());
        filtro.etàMin = parseInt($('#filtro_età').val());
        filtro.etàMax = parseInt($('#filtro_età').val());

        console.log(filtro);

        var searchParams = new URLSearchParams();
        Object.entries(filtro).forEach(([key, value]) => {
            console.log(key, value)
            if(value) searchParams.set(key, value);
        });
        
        window.location.search = searchParams.toString();
        
        e.preventDefault();
    });
})