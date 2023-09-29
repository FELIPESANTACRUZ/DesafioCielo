import React from 'react';
import { Link } from 'react-router-dom';

const Home = () =>{
  return (
    <div>
      <h1>Página Inicial</h1>
      <nav>
        <ul>
          <li>
            <Link to="/criar">Criar Cliente</Link>
          </li>
          <li>
            <Link to="/listar">Listar Cliente</Link>
          </li>
          <li>
            <Link to="/alterar">Alterar Cliente</Link>
          </li>
          <li>
            <Link to="/excluir">Excluir Cliente</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;