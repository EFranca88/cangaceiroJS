// client/app/index.js

var campos = [
    document.querySelector('#data'),
    document.querySelector('#valor'),
    document.querySelector('#quantidade')
]

// verificando o conteúdo do array
console.log(campos); 

// precisamos de tbody, pois ele receberá a tr que vamos construir
var tbody = document.querySelector('table tbody')

document.querySelector('.form').addEventListener('submit', function(event) {

    // Cancelando a submissão do formulario
    event.preventDefault()

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
    
    //Nova td que armazenará o volume da negociação
    var tdVolume = document.createElement('td')

    // as posições 1 e 2 do array armazenam os campos de quantidade e valor, respectivamente
    tdVolume.textContent = campos[1].value * campos[2].value
    // adicionando a td que faltava à tr
    tr.appendChild(tdVolume)
    // adicionando a tr
    tbody.appendChild(tr)

    // limpa o campo da data
    campos[0].value = ''
    // limpa o campo da quantidade
    campos[1].value = 1
    // limpa o campo do valor
    campos[2].value = 0
    // limpa o campo da data
    campos[0].focus()
})

















/* pagina 34 ou 8 */
