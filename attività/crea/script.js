// Script per la pagina `/attività/crea`

$(document).ready(() => {
    if (ruolo() == 'amministratore')
        $('#nomePagina').text('Crea attività');

    $('#informazioni_descrizione').markdownEditor({
        hiddenActions: ['emoji', 'export', 'hint', 'codeblock', 'code', 'footnote', 'dl', 'newline', 'paragraph', 'del', 'ins', 'sup', 'sub', 'mark'],
        markdownItOptions: {
            html: true
        },
        defaultMode: 'split'
    }).val(
        `### Scopo dell'attività
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
        let div = $('<div class=" d-flex"></div>');
        let collegamento = $(`<a href="${link || '#'}" target="_blank" class="btn btn-primary w-100">${nome || link || 'Collegamento senza nome'}</a>`);
        let elimina = $('<button class="btn btn-danger flex-shrink-1"><i class="fas fa-trash"></i></button>');
        elimina.on('click', () => col.remove());
        $('#collegamenti').append(
            col.append(
                div.append(collegamento, elimina)
            )
        );
    });

    $('#attività').on('submit', () => {
        console.log($(this).serializeArray())
    });
});