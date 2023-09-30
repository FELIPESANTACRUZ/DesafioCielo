import React from 'react';
import { Link } from 'react-router-dom';
import LogoCielo from '../Assets/cielo.png'

const Home = () => {
  return (
    <div className="container mt-5">
        <img
          src={LogoCielo}
          alt="Logotipo Cielo"
          className="img-fluid img-thumbnail mb-4"
          style={{ width: '200px' }} // Ajuste o tamanho aqui
        />
      <h1 className="display-4 text-center mb-5" style={{ color: 'blue', fontWeight: 'bold' }}>
            Gestão de Clientes CIELO
      </h1>
      <nav>
        <ul className="list-unstyled">
          <li className="mb-3">
            <Link to="/criar" className="btn btn-primary">
              Criar Cliente
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/listar" className="btn btn-primary">
              Listar Cliente
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/alterar" className="btn btn-primary">
              Alterar Cliente
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/excluir" className="btn btn-primary">
              Excluir Cliente
            </Link>
          </li>
          <li>
            <Link to="/FilaAtendimento" className="btn btn-primary">
              Fila de Atendimento
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
