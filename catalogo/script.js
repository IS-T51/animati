// Script per la pagina `/catalogo`

// Ottieni filtro da query string
const query = new URLSearchParams(window.location.search);
console.log(query)
const filtro = {}
query.forEach((value, key) => {
    filtro[key] = value
});

$(()=>{
    searchParams = new URLSearchParams();
    // Ottieni query string
    Object.entries(filtro).forEach(([key, value]) => {
        searchParams.set(key, value);
    });

    fetch(`${URL}/catalogo?${searchParams.toString()}`)
    .then(response => response.json())
    .then(data => {
        if(data.length == 0) {
            $('#catalogo').append(`
                <div class="col-12">
                    <div class="alert alert-warning" role="alert">
                        Nessuna attività trovata
                    </div>
                </div>
            `)
        }
        data.forEach((attivita) => {
            $('#catalogo').append(`
                <div class="col-12 col-md-6 col-lg-4 col-xl-3">
                    <div class="card">
                        <div class="card-header text-center">
                            <h2 class="card-title">${attivita.informazioni.titolo}</h2>
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
})