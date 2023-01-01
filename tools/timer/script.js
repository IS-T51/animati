// Script per la pagina `/tools/timer`

$(document).ready(() =>{
    //Ore
    $("#hInc").on("click", () => {
      if ($("#h").html() >= 0 && $("#h").html()<99){
        ore = parseInt($("#h").html());
        ore+=1;
        $("#h").html(ore);
      }
    });
    $("#hDec").on("click", () => {
      if ($("#h").html() >= 1 && $("#h").html()<100){
        ore = parseInt($("#h").html());
        ore-=1;
        $("#h").html(ore);
      }
    });
    //Minuti
    $("#mInc").on("click", () => {
        if ($("#m").html() >= 0 && $("#m").html() < 59){
          minuti = parseInt($("#m").html());
          minuti+=1;
          $("#m").html(minuti);
        }
      });
    $("#mDec").on("click", () => {
    if ($("#m").html() >= 1 && $("#m").html() < 60){
        minuti = parseInt($("#m").html());
        minuti-=1;
        $("#m").html(minuti);
    }
    });
    //Secondi
    $("#sInc").on("click", () => {
        if ($("#s").html() >= 0 && $("#s").html() < 59){
          secondi = parseInt($("#s").html());
          secondi+=1;
          $("#s").html(secondi);
        }
      });
    $("#sDec").on("click", () => {
        if ($("#s").html() >= 1 && $("#s").html() < 60){
            secondi = parseInt($("#s").html());
            secondi-=1;
            $("#s").html(secondi);
    }
    });
    
    let button1 = $('#button1');
    let button2 = $('#button2');
    button2.hide();
    button1.on("click", () => {
        if (button1.text() == 'Avvia') {
            button1.text('Elimina');
            button2.show();
            var tempo = ore*60*60+minuti*60+secondi;
            display = document.querySelector('#timer');
            startTimer(tempo, display); 
        }
        else if (button1.text() == 'Elimina') {
            button1.text('Avvia');
            button2.text('Pausa');
            button2.hide();
            display.textContent = ore.toString().padStart(2, '0') + ":" + minuti.toString().padStart(2, '0') + ":" + secondi.toString().padStart(2, '0');
            stopTimer();
        }
    });
    button2.on("click", () => {
        if (button2.text() == 'Pausa') {
            button2.text('Riprendi');
            pauseTimer();
        }
        else if (button2.text() == 'Riprendi') {
            button2.text('Pausa');
            resumeTimer();
        }
    });
    
    var ore = 0;
    var minuti = 0;
    var secondi = 0;
    $("#h").html(ore);
    $("#m").html(minuti);
    $("#s").html(secondi);
    
    var timerId;
    var timeRemaining;

    function startTimer(duration, display) {
      var timer = duration, hours, minutes, seconds;
      timerId = setInterval(function () {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt((timer % 3600) / 60, 10);
        seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
          stopTimer();
          button1.text('Avvia');
          button2.text('Pausa');
          button2.hide();
        }
      }, 1000);
    }
    
    function stopTimer() {
      clearInterval(timerId);
    }

    function pauseTimer() {
      timeRemaining = document.querySelector('#timer').textContent;
      clearInterval(timerId);
    }

    function resumeTimer() {
      var timeArr = timeRemaining.split(':'),
      hours = parseInt(timeArr[0]),
      minutes = parseInt(timeArr[1]),
      seconds = parseInt(timeArr[2]),
      duration = (hours * 3600) + (minutes * 60) + seconds;
    
      startTimer(duration, document.querySelector('#timer'));
    }    
});
