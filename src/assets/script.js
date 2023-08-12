
container = document.querySelector('.container');
var seats = document.querySelectorAll('.row .seat');
var count = document.getElementById('count');
var total = document.getElementById('total');
var asientos = document.getElementById('asientos');
var totalF = 0;
//window.localStorage.clear();
window.localStorage.removeItem("selectedSeats");
//populateUI();

//guardar indice y valor de eventos del select
function setEventoData(eventoIndex, eventoPrecio){
    localStorage.setItem('selectedEventoIndex', eventoIndex);
    localStorage.setItem('selectedEventoPrice', eventoPrecio);
}


//funcionesConteo

function conteo(ticketPrecio) {
    const asientosSeleccionados = document.querySelectorAll('.row .seat.seleccionado');
    const numasientosSeleccionados = asientosSeleccionados.length;
    
    const eventoSelect = document.getElementById('evento');
    //let ticketPrecio = +eventoSelect.getAttribute('data-value');
    totalF = totalF + ticketPrecio;
    count.innerText = numasientosSeleccionados;
   // total.innerText = numasientosSeleccionados * ticketPrecio;
    total.innerText = totalF;
    localStorage.setItem('precioTotal', totalF);
    //almacenamiento interno
    const asientosIndex = [...asientosSeleccionados].map(function (seat){
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('asientosSeleccionados', JSON.stringify(asientosIndex));
}


//obtener datos del almacenamiento y llenar la interfaz
function populateUI(){
    const asientosSeleccionados = JSON.parse(localStorage.getItem('asientosSeleccionados'));

    if(asientosSeleccionados !== null && asientosSeleccionados.length > 0 ){
        seats.forEach((seat, index) => {
            if(asientosSeleccionados.indexOf(index) > -1){
                seat.classList.add('seleccionado'); //53:26 min
            }
        });
    }

    const selectedEventoIndex = localStorage.getItem('selectedEventoIndex');

    if(selectedEventoIndex != null){
        eventoSelect.selectedIndex = selectedEventoIndex;
    }


}


//evento cuando cambia el valor del select
/*
eventoSelect.addEventListener('change', e => {
    ticketPrecio = +e.target.value;

    //almacenamiento
    setEventoData(e.target.selectedIndex, e.target.value);


    conteo();
})*/

container.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('ocupado')){
        e.target.classList.toggle('seleccionado');
    }
    //const eventoSelect = document.getElementById('evento');
    let ticketPrecio = +e.target.getAttribute('data-value');
    //localStorage.setItem('selectedEventoPrice', ticketPrecio);
    if(e.target.classList.contains('seleccionado')){
        conteo(ticketPrecio);
    }else if(e.target.classList.contains('ocupado')){
        //
    }else{
        conteo(-ticketPrecio);
    }
 //   asientos.innerText = JSON.parse(localStorage.getItem('asientosSeleccionados'));
});

conteo(0);