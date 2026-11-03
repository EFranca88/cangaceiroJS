// client/app/domain/negociacao/Negociacao.js

// toda classe por convenção segue o mesmo padrão de escrita (PascalCase), onde o nome do arquivo que possui a declaração da classe inicia com a letra maiuscula.

class Negociacao{
    constructor(data, quantidade, valor) {
    // Cada valor recebido será atribuído às propriedades da classe    
        this._data = data
        this._quantidade = quantidade
        this._valor = valor
    }

    // Funções que definem um comportamento de uma classe são chamadas de métodos para alinhar o vocabulário com o paradigma da Orientação a Objetos.
    get volume() {
        return this._quantidade * this._valor
    }

    // Convencionarmos para que toda propriedade de uma classe seja prefixada com um underline ( _ ), ou seja,  não deve ser acessada fora dos métodos da própria classe. 
    // Esta será uma convenção que informará ao programador que as propriedades que contenham _ (underline) só poderão ser acessadas pelos próprios métodos da classe.
    // Obs. Conveção necessaria por não existir um modo apenas leitura na linguagem JavaScript
    get data() {
        return this._data
    }

    // Podemos utilizar a sintaxe get para acessarmos os métodos dentro da classe.
    get quantidade() {
        return this._quantidade
    }

    get valor() {
        return this._valor
    }
}