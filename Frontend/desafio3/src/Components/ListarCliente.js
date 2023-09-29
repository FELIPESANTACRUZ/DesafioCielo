import React, { useEffect, useState } from 'react';
import { listarClientes } from '../Service/ClienteService';
import { Link } from 'react-router-dom';

function ListarCliente() {
  const [clientesPorId, setClientesPorId] = useState([]);
  const inicioId = 0;
  const fimId = 5; 

  useEffect(() => {
    const buscarClientesPorId = async () => {
      const clientes = [];

      for (let id = inicioId; id <= fimId; id++) {
        try {
          const cliente = await listarClientes(id);
          clientes.push(cliente);
          console.info(`trouxe cliente ${id}:`);
        } catch (error) {
          console.error(`Erro ao buscar cliente com ID ${id}:`, error);
        }
      }

      setClientesPorId(clientes);
    };

    buscarClientesPorId();
  }, [inicioId, fimId]);

  return (
    <div>
      <div>
            <h1>Testeee ir para tela criar</h1>
            <Link to="/">retornar a página inicial</Link>
        </div>
      <h2>Lista de Clientes por ID</h2>
      <ul>
        {clientesPorId.map((cliente) => (
          <li key={cliente.body.id}>
            <strong>ID:</strong> {cliente.body.id}<br />
            <strong>CNPJ:</strong> {cliente.body.cnpj}<br />
            <strong>Razão Social:</strong> {cliente.body.razaoSocial}<br />
            <strong>MCC:</strong> {cliente.body.mcc}<br />
            <strong>CPF do Contato:</strong> {cliente.body.cpfContato}<br />
            <strong>Nome do Contato:</strong> {cliente.body.nomeContato}<br />
            <strong>Email do Contato:</strong> {cliente.body.emailContato}<br />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarCliente;
