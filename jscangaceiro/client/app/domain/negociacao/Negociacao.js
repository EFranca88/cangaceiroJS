// client/app/domain/negociacao/Negociacao.js

// toda classe por convenção segue o mesmo padrão de escrita (PascalCase), onde o nome do arquivo que possui a declaração da classe inicia com a letra maiuscula.

class Negociacao{
    constructor() {
        this.data = new Date() // data atual
        this.quantidade = 1
        this.valor = 0.0
    }
}