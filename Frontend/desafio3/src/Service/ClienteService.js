import axios from 'axios';

// Função para listar todos os pré-cadastros de clientes
 async function listarClientes() {
  try {
    const response = await axios.get('http://localhost:9090/clientes');
    return response.data;
  } catch (error) {
    throw error;
  }
}


export { listarClientes };
