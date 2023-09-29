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
    <div>
      <div>
        <h1>TELA ALTERAR CLIENTE</h1>
        <Link to="/">Retornar à página inicial</Link>
      </div>
      {cliente ? (
        <form onSubmit={handleSubmit}>
          <label>
            CNPJ:
            <input
              type="text"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
            />
          </label>
          <label>
            Razão Social:
            <input
              type="text"
              name="razaoSocial"
              value={formData.razaoSocial}
              onChange={handleChange}
            />
          </label>
          <label>
            MCC:
            <input
              type="text"
              name="mcc"
              value={formData.mcc}
              onChange={handleChange}
            />
          </label>
          <label>
            CPF do Contato:
            <input
              type="text"
              name="cpfContato"
              value={formData.cpfContato}
              onChange={handleChange}
            />
          </label>
          <label>
            Nome do Contato:
            <input
              type="text"
              name="nomeContato"
              value={formData.nomeContato}
              onChange={handleChange}
            />
          </label>
          <label>
            Email do Contato:
            <input
              type="text"
              name="emailContato"
              value={formData.emailContato}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Salvar Alterações</button>
        </form>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
}

export default AlterarCliente;
