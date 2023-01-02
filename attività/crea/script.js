// Script per la pagina `/attività/crea`

$(document).ready(() => {
    if (ruolo() == 'amministratore') {
        $('#nomePagina').text('Crea attività');
        $(document).prop('title', 'Animati - Crea attività');
    }
    $('#modulo').load(`/assets/html/modulo.html`, () => {
        $('#informazioni_descrizione').markdownEditor({
            hiddenActions: ['emoji', 'export', 'hint', 'codeblock', 'code', 'footnote', 'dl', 'newline', 'paragraph', 'del', 'ins', 'sup', 'sub', 'mark'],
            markdownItOptions: {
                html: true
            },
            defaultMode: ($( window ).width() > 576 ? 'split' : 'edit'),
        }).val(
        `### Descrizione
Inserisci qui l'obiettivo dell'attività.
Puoi utilizzare il linguaggio **Markdown** per formattare il testo.

### Materiali necessari
- Questa è una lista
- di materiali necessari
- per l'attività

### Regole
1. Se necessario,
2. puoi inserire
3. delle regole
    
### Ulteriori informazioni
Inserisci qui eventuali informazioni aggiuntive.`);

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

            fetch(`${URL}/catalogo`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getCookie('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(async (res) => {
                if (res.status == 200) {
                    let json = await res.json();
                    window.location.href = `/attivit%C3%A0/?id=${data._id}`;
                } else {
                    let json = await res.json();
                    alert(json);
                }
            });

            // action prevent
            e.preventDefault();
        });
    });
});