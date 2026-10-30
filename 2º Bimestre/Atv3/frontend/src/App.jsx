import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    buscarProdutos();
  }, []);

  async function buscarProdutos() {
    try {
      const resposta = await fetch('http://localhost:3000/api/produtos');
      const dados = await resposta.json();

      setProdutos(dados);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro);
    }
  }

  async function cadastrarProduto(evento) {
    evento.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3000/api/produtos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: nome,
          preco: Number(preco)
        })
      });

      if (!resposta.ok) {
        throw new Error('Erro ao cadastrar produto');
      }

      setMensagem('Produto cadastrado com sucesso!');
      setNome('');
      setPreco('');

      buscarProdutos();
    } catch (erro) {
      setMensagem('Erro ao cadastrar produto.');
    }
  }

  async function excluirProduto(id) {
    try {
      const resposta = await fetch(`http://localhost:3000/api/produtos/${id}`, {
        method: 'DELETE'
      });

      if (!resposta.ok) {
        throw new Error('Erro ao excluir produto');
      }

      setMensagem('Produto excluído com sucesso!');

      buscarProdutos();
    } catch (erro) {
      setMensagem('Erro ao excluir produto.');
    }
  }

  return (
    <div>
      <h1>Gerenciador de Produtos</h1>

      <h2>Cadastrar Produto</h2>

      <form onSubmit={cadastrarProduto}>
        <input
          type="text"
          placeholder="Nome do produto"
          value={nome}
          onChange={(evento) => setNome(evento.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(evento) => setPreco(evento.target.value)}
          step="0.01"
          min="0"
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      <p>{mensagem}</p>

      <h2>Lista de Produtos</h2>

      {produtos.map((produto) => (
        <div key={produto.id}>
          <p>ID: {produto.id}</p>
          <p>Nome: {produto.nome}</p>
          <p>Preço: R$ {produto.preco.toFixed(2)}</p>

          <button onClick={() => excluirProduto(produto.id)}>
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;