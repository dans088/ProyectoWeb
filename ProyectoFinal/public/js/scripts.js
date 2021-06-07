/*!
* Start Bootstrap - Freelancer v7.0.0 (https://startbootstrap.com/theme/freelancer)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
*/
//
// Scripts
// 
var nombreValido = false , PrimerApellidoValido = false , SegundoApellidoValido = false ,
    CodigoPostalValido = false , CalleYNumeroValido = false, CLABEValido = false, NumeroEmergenciaValido = false;

var nameCounter = 0;
var toggle_count = 0; 
let formArray = [];

$(".elementoForma2").hide();
$(".elementoForma3").hide();
$(".elementoForma4").hide();
$("#submit").hide();

function toggleForm()
{
    switch (toggle_count){
        case 0 : 
        console.log("toggle", toggle_count);
        $(".elementoForma1").hide();
        $(".elementoForma2").show();
        toggle_count++;
        break;

        case 1 : 
        $(".elementoForma2").hide();
        $(".elementoForma3").show();
        toggle_count++;
        break;

        case 2 :
        $(".elementoForma3").hide();
        $(".elementoForma4").show();
        toggle_count++;
        break;

        default:
        $(".elementoForma1").show();
        
    }

}

function validateNames(field) {

    const regex=/^[A-zÀ-ú]+$/; 

    let nombre = field.value;
    if (!nombre.match(regex))
    {
        field.style.background = "red";

    } else if( field.value.length > 0 ) { 
        if(nameCounter == 0){
            formArray['nombreValido'] = true;
            console.log(formArray['nombreValido']);
            formArray.length++; //increase array size
            nameCounter++;      //increase counter
        }else if(nameCounter == 1){
            formArray['PrimerApellidoValido'] = true;
            //console.log(formArray['PrimerApellidoValido']);
            formArray.length++; 
            nameCounter++;
        }else{ 
            formArray['SegundoApellidoValido'] = true;
            //console.log(formArray['SegundoApellidoValido']);
            formArray.length++;
        }
    } 
}

function validatePhone(field)
{
    var phoneno = /^\d{10}$/;
    if(field.value.match(phoneno)){
        formArray['NumeroEmergenciaValido'] = true;
    }else{
        alert("Número de celular incorrecto");
        formArray['NumeroEmergenciaValido'] = false;
    }

}

      
    
async function prellenaDireccion(field) {

    let cp = field.value
    let token = 'da4b9d01-0456-427a-86cd-c829ec9d3fe1' // get token from website
    try {
    const res = await fetch(
      `https://api-sepomex.hckdrk.mx/query/info_cp/${cp}?=simplified&token=${token}`
    )
    const data = await res.json()
    if (data.error !== false) {
      const { response } = data[0];
      console.log("Response ", response);
      document.getElementById("Colonia").value =response.asentamiento;
      
      document.getElementById("Municipio").value =response.municipio;
      
      document.getElementById("Estado").value =response.estado;
      
      document.getElementById("Pais").value = 'México';

    }
  } catch (error) {
    console.log(error)
  }
}


function submitHandle(form) { 
    
        
            console.log(document.getElementById("Nombre").value);
            console.log(document.getElementById("PrimerApellido").value);
            console.log(document.getElementById("SegundoApellido").value);
            console.log(document.getElementById("CalleYNumero").value);
        
            
            if(formArray['NumeroEmergenciaValido'] == true){
                console.log(document.getElementById("TelefonoEmergencia").value);
                $("#submit").show();
            }else{
                $("#submit").hide();
                $('#check').prop('checked', false);
                alert("Uno o varios campos son incorrectos");
                
            }
            
}

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 72,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
