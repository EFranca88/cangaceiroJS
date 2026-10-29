// client/app/index.js

var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade')
]

console.log(campos); //verificando o conteudo do array

var tbody = document.querySelector('table tbody')

document.querySelector('.form').addEventListener('submit', function(event) {

    // substituindo o alert pelo novo código
    var tr = document.createElement('tr')

    campos.forEach(function(campo) {
        
        //cria uma td sem informações
        var td = document.createElement('td')

        // Atribui o valor do campo à td
        td.textContent = campo.value

        //adiciona a td na tr
        tr.appendChild(td)
    })
})

var tbody = document.querySelector('table tbody')

document.querySelector('.form').addEventListener('submit', function(event) {
    var tr = document.createElement('tr')
    
    campos.forEach(function(campo) {
        var td =document.createElement('td')
        td.textContent = campo.valuetr.appendChild(td)
    }
})

// nova td que armazenará o volume da negociação



/* pagina 34 ou 8 */
