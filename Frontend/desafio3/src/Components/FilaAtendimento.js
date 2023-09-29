import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function FilaAtendimento() {
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const buscarProximoCliente = async () => {
      try {
        const response = await axios.get('http://localhost:9090/fila-atendimento/fila-atendimento/proximo');
        setCliente(response.data);
      } catch (error) {
        console.error('Erro ao buscar próximo cliente na fila de atendimento:', error);
      }
    };

    buscarProximoCliente();
  }, []);

  return (
    <div>
      <div>
        <Link to="/">Retornar à página inicial</Link>
      </div>
      <h2>Próximo Cliente na Fila de Atendimento</h2>
      {cliente ? (
        <ul>
          <li>
            <strong>CNPJ:</strong> {cliente.cnpj}<br />
            <strong>Razão Social:</strong> {cliente.razaoSocial}<br />
            <strong>MCC:</strong> {cliente.mcc}<br />
            <strong>CPF do Contato:</strong> {cliente.cpfContato}<br />
            <strong>Nome do Contato:</strong> {cliente.nomeContato}<br />
            <strong>Email do Contato:</strong> {cliente.emailContato}<br />
          </li>
        </ul>
      ) : (
        <p>Não há clientes na fila de atendimento.</p>
      )}
    </div>
  );
}

export default FilaAtendimento;
