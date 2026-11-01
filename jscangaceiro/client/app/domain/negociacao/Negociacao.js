// client/app/domain/negociacao/Negociacao.js

// toda classe por convenção segue o mesmo padrão de escrita (PascalCase), onde o nome do arquivo que possui a declaração da classe inicia com a letra maiuscula.

class Negociacao{
    constructor(data, quantidade, valor) {
    // cada valor recebido será atribuido Às propriedades da classe    
        this.data = data
        this.quantidade = quantidade
        this.valor = valor
    }
}