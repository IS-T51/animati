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
    .then(response => response.json())
    .then(data => {
        if(data.length == 0) {
            $('#liste').append(`
                <div class="col-12">
                    <div class="alert alert-warning" role="alert">
                        Nessuna lista trovata
                    </div>
                </div>
            `)
        }
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
                            <a href="/lista?id=${lista._id}" class="btn btn-primary">Vai alla lista</a>
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
            if(data.code == 201) {
                window.location.href = `/lista?id=${data._id}`;
            } else {
                $('#modalErrore .modal-body').text(JSON.stringify(data));
                $('#modalErrore').modal('show');
            }
        });
        e.preventDefault();
    });
})