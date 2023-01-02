// Script per la pagina `/attività/modifica`

const query = new URLSearchParams(window.location.search);
const id = query.get('id');

$(document).ready(() => {
    if(!id) {
        $('#errore').text('Errore: nessun ID specificato');
        $('#caricamento').hide();
        return;
    }
    
    fetch(`${URL}/attivita/${id}`)
    .then(response => response.json())
    .then(attivita => {
        $('#caricamento').hide();
        if(ruolo() != 'amministratore' && attivita.autore != _id()) {
            $('#errore').text('Errore: non sei autorizzato a modificare questa attività')
            return;
        }
        $('#errore').hide();
        
        $('#informazioni_descrizione').markdownEditor({
            hiddenActions: ['emoji', 'export', 'hint', 'codeblock', 'code', 'footnote', 'dl', 'newline', 'paragraph', 'del', 'ins', 'sup', 'sub', 'mark'],
            markdownItOptions: {
                html: true
            },
            defaultMode: ($( window ).width() > 576 ? 'split' : 'edit'),
        });

        
        $('#banner').on('change', () => {
            $('#bannerPreview').attr('src', $('#banner').val());
        });

        $("#informazioni_squadre").change(function () {
            if ($(this).is(":checked")) {
                $("#informazioni_giocatoriPerSquadra,#informazioni_numeroSquadre").removeAttr("disabled");
            } else {
                $("#informazioni_giocatoriPerSquadra,#informazioni_numeroSquadre").attr("disabled", "");
            }
        }).change();
        $('#collegamento_link,#collegamento_nome').on('keyup', () => {
            let link = $('#collegamento_link').val();
            let nome = $('#collegamento_nome').val();
            if (link == '' || nome == '') {
                $('#collegamento_aggiungi').attr('disabled', '');
                return;
            } else {
                $('#collegamento_aggiungi').removeAttr('disabled');
            }
        }).trigger('keyup');
        $('#collegamento_aggiungi').on('click', () => {
            let link = $('#collegamento_link').val();
            let nome = $('#collegamento_nome').val();

            let col = $('<div class="col-12 col-md-6 col-lg-4 mb-1"></div>');
            let div = $('<div class="btn-group d-flex"></div>');
            let collegamento = $(`<a href="${link || '#'}" target="_blank" class="btn btn-secondary w-100">${nome || link || 'Collegamento senza nome'}</a>`);
            let elimina = $('<button class="btn btn-danger flex-shrink-1"><i class="fas fa-trash"></i></button>');
            elimina.on('click', () => col.remove());
            $('#collegamenti').append(
                col.append(
                    div.append(collegamento, elimina)
                )
            );
        });

        $('#attività').on('submit', (e) => {
            let collegamenti = $('#collegamenti').children().map((i, e) => {
                let link = $(e).find('a').attr('href');
                let nome = $(e).find('a').text();
                return { link, nome };  
            }).get();

            let data = {
                informazioni: {
                    titolo: $('#informazioni_titolo').val(),
                    descrizione: $('#informazioni_descrizione').val(),
                    etàMin:       parseInt($('#informazioni_etàMin').val()),
                    etàMax:       parseInt($('#informazioni_etàMax').val()),
                    durataMin:    parseInt($('#informazioni_durataMin').val()) * parseInt($('#informazioni_durataUnità').val()),
                    durataMax:    parseInt($('#informazioni_durataMax').val()) * parseInt($('#informazioni_durataUnità').val()),
                    giocatoriMin: parseInt($('#informazioni_giocatoriMin').val()),
                    giocatoriMax: parseInt($('#informazioni_giocatoriMax').val()),
                },
                banner: $('#banner').val(),
                collegamenti: collegamenti,
            };
            if ($('#informazioni_squadre').is(':checked')) {
                data.informazioni.numeroSquadre = parseInt($('#informazioni_numeroSquadre').val()),
                data.informazioni.giocatoriPerSquadra =  parseInt($('#informazioni_giocatoriPerSquadra').val())
            }

            console.log(JSON.stringify(data))

            fetch(`${URL}/attivita/${attivita._id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                if (res.status == 200) {
                    window.location.href = `/attività/?id=${ttivita._id}`;
                } else {
                    let json = await res.json();
                    alert(json);
                }
            });

            // action prevent
            e.preventDefault();
        });

        $('#informazioni_etàMin').val(attivita.informazioni['etàMin']);
        $('#informazioni_etàMax').val(attivita.informazioni['etàMax']);
        $('#informazioni_durataMin').val(attivita.informazioni['durataMin']);
        $('#informazioni_durataMax').val(attivita.informazioni['durataMax']);
        $('#informazioni_giocatoriMin').val(attivita.informazioni['giocatoriMin']);
        $('#informazioni_giocatoriMax').val(attivita.informazioni['giocatoriMax']);
        $("#informazioni_giocatoriPerSquadra").val(attivita.informazioni['giocatoriPerSquadra']);
        $("#informazioni_numeroSquadre").val(attivita.informazioni['numeroSquadre']);
        if(attivita.informazioni['giocatoriPerSquadra'] || attivita.informazioni['numeroSquadre']) {
            $("#informazioni_squadre").prop('checked', true).change();
        }
        $('#informazioni_titolo').val(attivita.informazioni['titolo']);
        $('#informazioni_descrizione').val(attivita.informazioni['descrizione']);
        $('#banner').val(attivita.banner).change();
        attivita.collegamenti.forEach((collegamento) => {
            $('#collegamento_link').val(collegamento.link);
            $('#collegamento_nome').val(collegamento.nome);
            $('#collegamento_aggiungi').click();
        });
        $('#collegamento_link').val('');
        $('#collegamento_nome').val('');

        $('#annulla').on('click', () => {
            window.location.href = `/attività/?id=${attivita._id}`;
        });

        $('#attività').show();
    });
});