import React, { useEffect, useState } from 'react';
import { listarClientes } from '../Service/ClienteService';
import { Link } from 'react-router-dom';

function ListarCliente() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const buscarClientes = async () => {
      try {
        const clientesData = await listarClientes();
        setClientes(clientesData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    buscarClientes();
  }, []);

  return (
    <div>
      <div>
        <h1>Testeee ir para tela criar</h1>
        <Link to="/">retornar a página inicial</Link>
      </div>
      <h2>Lista de Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}>
            <strong>ID:</strong> {cliente.id}<br />
            <strong>CNPJ:</strong> {cliente.cnpj}<br />
            <strong>Razão Social:</strong> {cliente.razaoSocial}<br />
            <strong>MCC:</strong> {cliente.mcc}<br />
            <strong>CPF do Contato:</strong> {cliente.cpfContato}<br />
            <strong>Nome do Contato:</strong> {cliente.nomeContato}<br />
            <strong>Email do Contato:</strong> {cliente.emailContato}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarCliente;
