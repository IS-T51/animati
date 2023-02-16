// Script per la pagina `/tools/cronometro`

$(document).ready(() => {
    var start
    var running = false
    var intervalId

    var startStopButton = $("#startStopButton")
    var partialButton = $("#partialButton")
    var counter = $("#counter")
    var partials = $("#partials")
    var partialsTitle = $("#partialsTitle")

    function formatTime(millis) {
        var hundredth = Math.trunc(millis / 10) % 100
        var seconds = Math.trunc(millis / 1000) % 60
        var minutes = Math.trunc(millis / 60000)

        hundredth = hundredth < 10 ? "0" + hundredth : hundredth
        seconds = seconds < 10 ? "0" + seconds : seconds
        minutes = minutes < 10 ? "0" + minutes : minutes

        return minutes + ":" + seconds + ":" + hundredth
    }
    function showTime(millis) {
        counter.text(formatTime(millis))
    }
    function currentTime() {
        return Date.now() - start
    }

    startStopButton.on("click", () => {
        if (running) {
            running = false;
            clearInterval(intervalId)
            showTime(currentTime())
            startStopButton.text("Avvia")
            partialButton[0].disabled = true
            
        } else {
            running = true;
            start = Date.now()
            startStopButton.text("Ferma")
            partialButton[0].disabled = false
            partialsTitle.hide()
            partials.text("")

            intervalId = setInterval(() => {
                showTime(currentTime())
            }, 10)
        }
    })

    partialButton.on("click", () => {
        if (running) {
            partialsTitle.show()
            partials.prepend(formatTime(currentTime()) + "<br/>")
        }
    })
})