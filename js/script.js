// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull’API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l’API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l’API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all’API quali sono le festività per il mese scelto
// Evidenziare le festività nella lista
// Buon lavoro! :grin: (edited) 

https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0

// {
//     "success": true,
//     "response": [
//         {
//             "name": "Capodanno",
//             "date": "2018-01-01"
//         },
//         {
//             "name": "Epifania",
//             "date": "2018-01-06"
//         }
//     ]
// }



$(document).ready(function(){   

    var currentDate = moment('2018-01-01');

    joinD(currentDate);
    joinHolid(currentDate);



    // FUNZIONI

    function joinD(date) {
        $('h1').html(date.format('MMMM') + ' ' + date.year())

        var daysInMon = date.daysInMonth();

        var source = $("#day-template").html();
        var template = Handlebars.compile(source);

        for (let i = 1; i < daysInMon; i++) {
            var context = {
                day: addZero(i),
                completeDate: date.format('YYYY') + '-' + date.format('MM') + '-' + addZero(i)
            };
            var html = template(context);
            $('.container').append(html)               
        }
    }

    function joinHolid(date) {

        $.ajax(
            {
                url: 'https://flynn.boolean.careers/exercises/api/holidays',
                method: 'GET',
                data:{
                    year: date.year(),
                    month: date.month()
                },
                success: function(x) {
                    for (var i = 0; i < x.response.length; i++) {
                        var list = $('div[data-complete-date="'+ x.response[i].date + '"]');
                        list.addClass('holiday');
                        list.append('<h3>' + x.response[i].name + '</h3>');
                    }
                },
                error: function(){
                    alert('errore');
                }
            }
        )

    }

    function addZero(data) {
        if (data < 10) {
            return '0' + data;
        }
        return data
    }

});