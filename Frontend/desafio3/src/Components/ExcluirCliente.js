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

  const handleExcluirCliente = async (cnpj) => { // Alterado para receber o CNPJ
    try {
      await axios.delete(`http://localhost:9090/clientes/${cnpj}`); // URL com o CNPJ
      setClientes(clientes.filter((cliente) => cliente.cnpj !== cnpj)); // Filtrar pelo CNPJ
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
                <button onClick={() => handleExcluirCliente(cliente.cnpj)}>Excluir</button> {/* Passa o CNPJ */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExcluirCliente;
