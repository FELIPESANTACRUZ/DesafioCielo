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
    <div className="container mt-5">
      <div className="mb-3">
        <Link to="/" className="btn btn-primary">
          Retornar à página inicial
        </Link>
      </div>
      <h1 style={{ textAlign: 'center', color: 'blue', fontSize: '2rem', marginBottom: '20px' }}>
            Próximo Cliente na Fila de Atendimento
        </h1>
      {cliente ? (
        <ul className="list-unstyled">
          <li>
            <strong>CNPJ:</strong> {cliente.cnpj}
          </li>
          <li>
            <strong>Razão Social:</strong> {cliente.razaoSocial}
          </li>
          <li>
            <strong>MCC:</strong> {cliente.mcc}
          </li>
          <li>
            <strong>CPF do Contato:</strong> {cliente.cpfContato}
          </li>
          <li>
            <strong>Nome do Contato:</strong> {cliente.nomeContato}
          </li>
          <li>
            <strong>Email do Contato:</strong> {cliente.emailContato}
          </li>
        </ul>
      ) : (
        <p className="alert alert-info">Não há clientes na fila de atendimento.</p>
      )}
    </div>
  );
}

export default FilaAtendimento;
