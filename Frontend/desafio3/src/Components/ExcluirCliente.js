import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExcluirCliente() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const carregarClientes = async () => {
      try {
        const response = await axios.get('http://localhost:9090/clientes');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao carregar a lista de clientes', error);
      }
    };

    carregarClientes();
  }, []);

  const handleExcluirCliente = async (id) => {
    try {
      await axios.delete(`http://localhost:9090/clientes/${id}`);
      setClientes(clientes.filter((cliente) => cliente.id !== id));
      console.log('Cliente excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir cliente', error);
    }
  };

  return (
    <div>
      <div>
        <h1>Excluir Clientes</h1>
        <Link to="/">Retornar à página inicial</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>CNPJ</th>
            <th>Razão Social</th>
            <th>MCC</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.cnpj}</td>
              <td>{cliente.razaoSocial}</td>
              <td>{cliente.mcc}</td>
              <td>
                <button onClick={() => handleExcluirCliente(cliente.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcluirCliente;
