import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import validator from 'validator';
import axios from 'axios';
import { validate } from 'cnpj';
import { v4 as uuidv4 } from 'uuid';


function CriarCliente() {
  const [formData, setFormData] = useState({
    cnpj: '',
    razaoSocial: '',
    mcc: '',
    cpfContato: '',
    nomeContato: '',
    emailContato: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = uuidv4();

    const updatedFormData = {
      ...formData,
      id: id,
    };

    // Validações
    if (!validate(formData.cnpj)) { // Usar a função de validação de CNPJ
      alert('CNPJ inválido');
      return;
    }

    if (!validator.isNumeric(formData.mcc) || formData.mcc.length !== 4) {
      alert('MCC deve conter exatamente 4 dígitos numéricos');
      return;
    }

    if (!validator.isEmail(formData.emailContato)) {
      alert('Email do Contato inválido');
      return;
    }

    // Aqui você pode fazer a requisição POST para a API com os dados do cliente
    // Exemplo de requisição fictícia usando Axios:
     axios.post('http://localhost:9090/clientes', updatedFormData)
       .then((response) => {
         console.log('Cliente cadastrado com sucesso', response.data);
       })
       .catch((error) => {
        console.error('Erro ao cadastrar cliente', error);
       });
  };

  return (
    <div>
      <div>
        <h1>TELA CRIAR CLIENTE</h1>
        <Link to="/">Retornar à página inicial</Link>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          CNPJ:
          <InputMask
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            mask="99.999.999/9999-99"
            maskChar="_"
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
          <InputMask
            type="text"
            name="mcc"
            value={formData.mcc}
            onChange={handleChange}
            mask="9999"
            maskChar="_"
          />
        </label>
        <label>
          CPF do Contato:
          <InputMask
            type="text"
            name="cpfContato"
            value={formData.cpfContato}
            onChange={handleChange}
            mask="999.999.999-99"
            maskChar="_"
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
        <button type="submit">Cadastrar Cliente</button>
      </form>
    </div>
  );
}

export default CriarCliente;
