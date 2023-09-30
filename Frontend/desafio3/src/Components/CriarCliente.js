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

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isCnpjValid = (cnpj) => {
    cnpj = cnpj.replace(/\D/g, '');

    if (cnpj.length !== 14) return false;

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

    axios
      .post('http://localhost:9090/clientes', { ...formData, cnpj: cnpjLimpo })
      .then((response) => {
        setShowSuccessModal(true);
        setFormData({
          cnpj: '',
          razaoSocial: '',
          mcc: '',
          cpfContato: '',
          nomeContato: '',
          emailContato: '',
        });
      })
      .catch((error) => {
        console.error('Erro ao cadastrar cliente', error);
      });
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <h1 style={{ textAlign: 'center', color: 'blue', fontSize: '2rem', marginBottom: '20px' }}>
            CRIAR CLIENTE
        </h1>

          <div className="my-4">
        <Link to="/" className="btn btn-primary">Retornar à página inicial</Link>
      </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                CNPJ:
                <InputMask
                  type="text"
                  className="form-control"
                  name="cnpj"
                  value={formData.cnpj}
                  onChange={handleChange}
                  mask="99.999.999/9999-99"
                  maskChar=""
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Razão Social:
                <input
                  type="text"
                  className="form-control"
                  name="razaoSocial"
                  value={formData.razaoSocial}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                MCC:
                <InputMask
                  type="text"
                  className="form-control"
                  name="mcc"
                  value={formData.mcc}
                  onChange={handleChange}
                  mask="9999"
                  maskChar=""
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                CPF do Contato:
                <InputMask
                  type="text"
                  className="form-control"
                  name="cpfContato"
                  value={formData.cpfContato}
                  onChange={handleChange}
                  mask="999.999.999-99"
                  maskChar=""
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Nome do Contato:
                <input
                  type="text"
                  className="form-control"
                  name="nomeContato"
                  value={formData.nomeContato}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Email do Contato:
                <input
                  type="text"
                  className="form-control"
                  name="emailContato"
                  value={formData.emailContato}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-primary">Cadastrar Cliente</button>
          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Sucesso!</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Cliente cadastrado com sucesso!</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={closeModal}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CriarCliente;
