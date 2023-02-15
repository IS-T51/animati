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
            var elemento = $(`<li class="list-group-item d-flex">Caricamento...</li>`);
            fetch(`${URL}/attivita/${attivita}`)
            .then((response) => response.json())
            .then((attivita) => {
                elemento.html(`<a href="/attività/?id=${attivita._id}" class="lead">${attivita.informazioni.titolo}</a>`);
                var elimina = $(`<button type="button" class="btn ms-auto" data-bs-toggle="modal" data-bs-target="#modalElimina" data-bs-index="${index}"><i class="fa fa-solid fa-trash"></i></button>`);
                elemento.append(elimina);
            })
            $('#lista').append(elemento).show();
        });

        const errorModal = $('#modalElimina');
        errorModal.on('show.bs.modal', e => {
            const confermaElimina = $('#confermaElimina');
            const index = e.relatedTarget.getAttribute('data-bs-index');
            confermaElimina.attr('data-bs-index', index)
            if (index == -1) {
                $('#modalElimina .modal-body').text('Sei sicuro di voler eliminare la lista?');
            } else {
                $('#modalElimina .modal-body').text('Sei sicuro di voler eliminare l\'attività dalla lista?');
            }

            confermaElimina.off('click');
            confermaElimina.on('click', () => {
                var index = confermaElimina.attr('data-bs-index');
                console.log(index)
                var removeUrl = index == -1 ? `${URL}/lista/${id}` : `${URL}/lista/${id}/${index}`;
                                
                fetch(removeUrl, {
                    method: 'DELETE',
                    headers: {
                        Authorization : `Bearer ${getCookie('token')}`
                    }
                })
                .then((response) => response.json())
                .then((data) => {
                    if(index == -1) location.href = '/liste';
                    else location.reload();
                })
            })
        }).catch((error) => {
            $('#caricamento').hide();
            $('#errore').text('Errore: ' + error);
        })
        
        if(id == _id()) $('#elimina').attr('disabled', true);
        $('#bottoniAutenticato').show();
        $('#esporta').show();

    })

    $('#elimina').click(()=>{
        $('#modalElimina').modal('show');
    })

    /*$('#esportaJSON').click(()=>{
        location.href=`/lista/esporta?id=${id}&formato=json`
    })

    $('#esportaPDF').click(()=>{
        location.href=`/lista/esporta?id=${id}&formato=pdf`
    })*/

})
