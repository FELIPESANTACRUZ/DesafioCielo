import axios from 'axios';

// Função para listar todos os pré-cadastros de clientes
async function listarClientes(id) {
  try {
    const response = await axios.get(`http://localhost:9090/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar cliente com ID ${id}:`, error);
    throw error;
  }
}


export { listarClientes };
