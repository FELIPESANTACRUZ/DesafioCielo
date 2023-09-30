import React, { useEffect, useState } from 'react';
import { listarClientes } from '../Service/ClienteService';
import { Link } from 'react-router-dom';

function ListarCliente() {
  const [clientes, setClientes] = useState([]);
  const [showNoClientsMessage, setShowNoClientsMessage] = useState(false);

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const clientesData = await listarClientes();
        setClientes(clientesData);

        // Verifica se não há clientes cadastrados
        if (clientesData.length === 0) {
          setShowNoClientsMessage(true);
        }
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    buscarClientes();
  }, []);

  return (
    <div className="container">
      <div className="my-4">
        <Link to="/" className="btn btn-primary">Retornar à página inicial</Link>
      </div>
      <h1 style={{ textAlign: 'center', color: 'blue', fontSize: '2rem', marginBottom: '20px' }}>
           LISTA DE CLIENTES
        </h1>
      {showNoClientsMessage ? (
        <div className="alert alert-warning" role="alert">
          Não há clientes cadastrados.
        </div>
      ) : (
        <ul className="list-group">
          {clientes.map((cliente) => (
            <li key={cliente.id} className="list-group-item">
              <strong>CNPJ:</strong> {cliente.cnpj}<br />
              <strong>Razão Social:</strong> {cliente.razaoSocial}<br />
              <strong>MCC:</strong> {cliente.mcc}<br />
              <strong>CPF do Contato:</strong> {cliente.cpfContato}<br />
              <strong>Nome do Contato:</strong> {cliente.nomeContato}<br />
              <strong>Email do Contato:</strong> {cliente.emailContato}<br />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListarCliente;
