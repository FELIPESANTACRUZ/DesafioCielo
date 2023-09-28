import React, { useEffect, useState } from 'react';
import { listarClientes } from '../Service/ClienteService';

function ListarCliente() {
  const [clientesPorId, setClientesPorId] = useState([]);
  const inicioId = 0; // ID inicial
  const fimId = 10; // ID final (ajuste conforme necessário)

  useEffect(() => {
    const buscarClientesPorId = async () => {
      const clientes = [];

      for (let id = inicioId; id <= fimId; id++) {
        try {
          const cliente = await listarClientes(id);
          clientes.push(cliente);
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
      <h2>Lista de Clientes por ID</h2>
      <ul>
        {clientesPorId.map((cliente) => (
          <li key={cliente.id}>
            {cliente.id}: {cliente.nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListarCliente;
