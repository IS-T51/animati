// Script per la pagina `/tools/fischietto`

$(document).ready(() =>{
    let s1 = 'https://soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'
    let s2 = 'https://soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3'
    let s3 = 'https://soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3'
    
    let startImage = $('#startImage');
    let stopButton = $('#stopButton');
    let dropdown = $('#nome_dropdown');

    let suono;

    function onStop() {
        dropdown[0].disabled = false
        startImage.show()
        stopButton.hide()
        suono.pause()
    }

    function setSuono(s, i) {
        suono = new Audio(s);
        dropdown.text('Suono ' + i);
        suono.addEventListener("ended", onStop)
    }

    setSuono(s1, 1)
    $('#suono1').on("click", () => setSuono(s1, 1));
    $('#suono2').on("click", () => setSuono(s2, 2));
    $('#suono3').on("click", () => setSuono(s3, 3));

    startImage.on("click", () => {
        dropdown[0].disabled = true
        startImage.hide()
        stopButton.show()
        suono.currentTime = 0
        suono.play()
    })

    stopButton.on("click", onStop)
});
