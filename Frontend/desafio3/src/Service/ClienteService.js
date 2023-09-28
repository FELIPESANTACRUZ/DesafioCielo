import axios from 'axios';

// Função para listar todos os pré-cadastros de clientes
async function listarClientes() {
  try {
    const response = await axios.get('http://localhost:9090/clientes');
    return response.data; // Retorna os dados da resposta da API
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    throw error; // Trata ou relança o erro
  }
}

export { listarClientes };
