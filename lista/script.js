// Script per la pagina `/lista`

// Get parameters from query string
const query = new URLSearchParams(window.location.search);
const id = query.get('id');

$(()=>{
    if(!id) {
        $('#errore').text('Errore: nessun ID specificato');
        $('#caricamento').hide();
        return;
    }

    fetch(`${URL}/lista/${id}`, {
        headers: {
            Authorization: `Bearer ${getCookie('token')}`
        }
    })
    .then((response) => response.json())
    .then((data) => {
        $('#errore').hide();
        $('#caricamento').hide();

        $('#nome').text(data.nome).show();
        let ultimaModifica = new Date(data.ultimaModifica);
        $('#ultimaModifica').text(`Ultima modifica: ${ultimaModifica.toLocaleDateString()} ${ultimaModifica.toLocaleTimeString()}`).show();
        
        data['attività'].forEach((attivita, index) => {
            fetch(`${URL}/attivita/${attivita}`)
            .then((response) => response.json())
            .then((attivita) => {
                var elemento = $(`<li class="list-group-item d-flex"></li>`);
                elemento.append(`<a href="/attivita?id=${attivita._id}">${attivita.informazioni.titolo}</a>`);
                var elimina = $(`<button type="button" class="btn ms-auto" data-toggle="modal" data-target="#modalElimina index=${index}"><i class="fa fa-solid fa-trash"></i></button>`);
                elemento.append(elimina);
                $('#lista').append(elemento).show();
            })
        })
        
        $('#elimina').show();
        $('#esporta').show();

    }).catch((error) => {
        $('#caricamento').hide();
        $('#errore').text('Errore: ' + error);
    });

    $('#elimina').click(()=>{
        $('#modalElimina').modal('show');
    })

    $('#esportaJSON').click(()=>{
        location.href=`/lista/esporta?id=${id}&formato=json`
    })
    $('#esportaPDF').click(()=>{
        location.href=`/lista/esporta?id=${id}&formato=pdf`
    })


})
