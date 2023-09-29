import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputMask from 'react-input-mask';
import validator from 'validator';
import axios from 'axios';

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

  const isCnpjValid = (cnpj) => {
    // Remove qualquer caracter não numérico do CNPJ
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) return false;

    // Verifica se todos os dígitos são iguais (situação inválida)
    if (/^(\d)\1+$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    if (resultado.toString() !== digitos.charAt(0)) return false;

    tamanho += 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

    return resultado.toString() === digitos.charAt(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { cnpj, mcc, emailContato } = formData;

    // Remove barras e traços do CNPJ antes de enviar
    const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');

    if (!isCnpjValid(cnpjLimpo)) {
      alert('CNPJ inválido');
      return;
    }

    if (!validator.isNumeric(mcc) || mcc.length !== 4) {
      alert('MCC deve conter exatamente 4 dígitos numéricos');
      return;
    }

    if (!validator.isEmail(emailContato)) {
      alert('Email do Contato inválido');
      return;
    }

    // Envie o CNPJ formatado com barras e traços (formData.cnpj) ou o CNPJ limpo (cnpjLimpo) conforme necessário
    axios.post('http://localhost:9090/clientes', { ...formData, cnpj: cnpjLimpo })
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
            mask="99.999.999/9999-99" // Mantenha o mask para exibição formatada
            maskChar="" // Remova o maskChar para aceitar apenas dígitos
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
            maskChar=""
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
            maskChar=""
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
