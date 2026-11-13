const produtoService = require('../services/produtoService');

function listarProdutos(req, res) {
    const produtos = produtoService.listarProdutos();
    res.status(200).json(produtos);
}

function buscarProdutoPorId(req, res) {
    const id = Number(req.params.id);
    const produto = produtoService.buscarProdutoPorId(id);

    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json(produto);
}

function criarProduto(req, res) {
    const { nome, preco } = req.body;

    const novoProduto = produtoService.criarProduto(nome, preco);

    res.status(201).json(novoProduto);
}

function atualizarProduto(req, res) {
    const id = Number(req.params.id);
    const { nome, preco } = req.body;

    const produto = produtoService.atualizarProduto(id, nome, preco);

    if (!produto) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json(produto);
}

function excluirProduto(req, res) {
    const id = Number(req.params.id);
    const excluido = produtoService.excluirProduto(id);

    if (!excluido) {
        return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
}

module.exports = {
    listarProdutos,
    buscarProdutoPorId,
    criarProduto,
    atualizarProduto,
    excluirProduto
};