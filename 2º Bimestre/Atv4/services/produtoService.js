const produtos = require('../data/produtos');

function listarProdutos() {
    return produtos;
}

function buscarProdutoPorId(id) {
    return produtos.find(produto => produto.id === id);
}

function criarProduto(nome, preco) {
    const novoId = produtos.length > 0
        ? Math.max(...produtos.map(produto => produto.id)) + 1
        : 1;

    const novoProduto = {
        id: novoId,
        nome: nome,
        preco: preco
    };

    produtos.push(novoProduto);

    return novoProduto;
}

function atualizarProduto(id, nome, preco) {
    const produto = buscarProdutoPorId(id);

    if (!produto) {
        return null;
    }

    produto.nome = nome;
    produto.preco = preco;

    return produto;
}

function excluirProduto(id) {
    const indice = produtos.findIndex(produto => produto.id === id);

    if (indice === -1) {
        return false;
    }

    produtos.splice(indice, 1);

    return true;
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    excluirProduto
};