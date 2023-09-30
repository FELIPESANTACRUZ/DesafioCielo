import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function AlterarCliente() {
  const { cnpj } = useParams();
  const [cliente, setCliente] = useState(null);
  const [formData, setFormData] = useState({
    cnpj: '',
    razaoSocial: '',
    mcc: '',
    cpfContato: '',
    nomeContato: '',
    emailContato: '',
  });

  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/clientes/${cnpj}`);
        setCliente(response.data);

        setFormData({
          cnpj: response.data.cnpj,
          razaoSocial: response.data.razaoSocial,
          mcc: response.data.mcc,
          cpfContato: response.data.cpfContato,
          nomeContato: response.data.nomeContato,
          emailContato: response.data.emailContato,
        });
      } catch (error) {
        console.error(`Erro ao carregar cliente com CNPJ ${cnpj}`, error);
      }
    };

    carregarCliente();
  }, [cnpj]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:9090/clientes/${cnpj}`, formData);
      console.log('Cliente alterado com sucesso');
    } catch (error) {
      console.error('Erro ao alterar cliente', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <div>
      <h1 style={{ textAlign: 'center', color: 'blue', fontSize: '2rem', marginBottom: '20px' }}>
            ALTERAR CLIENTE
        </h1>
        <div className="my-4">
        <Link to="/" className="btn btn-primary">Retornar à página inicial</Link>
      </div>
      </div>
      {cliente ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="cnpj" className="form-label">
              CNPJ:
            </label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="razaoSocial" className="form-label">
              Razão Social:
            </label>
            <input
              type="text"
              id="razaoSocial"
              name="razaoSocial"
              value={formData.razaoSocial}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mcc" className="form-label">
              MCC:
            </label>
            <input
              type="text"
              id="mcc"
              name="mcc"
              value={formData.mcc}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpfContato" className="form-label">
              CPF do Contato:
            </label>
            <input
              type="text"
              id="cpfContato"
              name="cpfContato"
              value={formData.cpfContato}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nomeContato" className="form-label">
              Nome do Contato:
            </label>
            <input
              type="text"
              id="nomeContato"
              name="nomeContato"
              value={formData.nomeContato}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailContato" className="form-label">
              Email do Contato:
            </label>
            <input
              type="text"
              id="emailContato"
              name="emailContato"
              value={formData.emailContato}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Salvar Alterações
          </button>
        </form>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default AlterarCliente;
