// Script per la pagina `/liste`

// Ottieni filtro da query string
const query = new URLSearchParams(window.location.search);
var id = query.get('id');

$(()=>{
    fetch(`${URL}/liste`,{
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }
    })
    .then(async response => response.status != 204 ? [response.status, await response.json()] : [response.status, null])
    .then(([status, data]) => {
        if(status == 204) {
            $('#caricamento').hide();
            $('#errore').text('Nessuna lista trovata');
            return
        }
        if(status >= 400) {
            $('#caricamento').hide();
            $('#errore').text('Errore '+status);
            $('#errore').after($('<p class="text-muted mb-1">').text(data.message));
            return
        }

        // 200:
        $('#loading').hide();
        data.sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach((lista) => {
            $('#liste').append(`
                <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card mb-4">
                        <div class="card-header text-center">
                            <h2 class="card-title">${lista.nome}</h2>
                        </div>
                        <img src="https://picsum.photos/700/300" class="card-img-top" referrerpolicy="no-referrer" alt="Immagine della lista"></img>
                        <div class="card-body text-center">
                            <a href="/lista/?id=${lista._id}" class="btn btn-primary">Vai alla lista</a>
                        </div>
                    </div>
                </div>
            `);
        });
    });

    // Aggiungi lista
    $('#crea').on('submit', (e) => {
        var nome = $('#nome').val();

        fetch(`${URL}/liste`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify({nome})
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if(data.code == 201 || data.codice == 201) {
                window.location.href = `/lista/?id=${data?.lista?._id}`;
            } else {
                $('#modalErrore .modal-body').text(JSON.stringify(data));
                $('#modalErrore').modal('show');
            }
        });
        e.preventDefault();
    });
})