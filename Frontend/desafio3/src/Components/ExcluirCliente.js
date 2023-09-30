import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ExcluirCliente() {
  const [clientes, setClientes] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState(null);

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

  const handleExcluirCliente = (cliente) => {
    setClienteToDelete(cliente);
    setShowConfirmationModal(true);
  };

  const confirmExclusao = async () => {
    try {
      await axios.delete(`http://localhost:9090/clientes/${clienteToDelete.cnpj}`);
      setClientes(clientes.filter((cliente) => cliente.cnpj !== clienteToDelete.cnpj));
      console.log('Cliente excluído com sucesso');
    } catch (error) {
      console.error('Erro ao excluir cliente', error);
    } finally {
      setShowConfirmationModal(false);
    }
  };

  const cancelarExclusao = () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="container mt-5">
      <div>
      <h1 style={{ textAlign: 'center', color: 'blue', fontSize: '2rem', marginBottom: '20px' }}>
            EXCLUIR CLIENTE
        </h1>
        <div className="my-4">
        <Link to="/" className="btn btn-primary">Retornar à página inicial</Link>
      </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>CNPJ</th>
            <th>Razão Social</th>
            <th>MCC</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr>
              <td>{cliente.cnpj}</td>
              <td>{cliente.razaoSocial}</td>
              <td>{cliente.mcc}</td>
              <td>
                <button onClick={() => handleExcluirCliente(cliente)} className="btn btn-danger">
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showConfirmationModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button type="button" className="btn-close" onClick={cancelarExclusao}></button>
              </div>
              <div className="modal-body">
                <p>Deseja realmente excluir o cliente {clienteToDelete.razaoSocial}?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={confirmExclusao}>
                  Confirmar Exclusão
                </button>
                <button type="button" className="btn btn-secondary" onClick={cancelarExclusao}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExcluirCliente;
