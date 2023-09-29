import { lazy } from 'react';

const Home = lazy(() => import('./Pages/Home'));
const CriarCliente = lazy(() => import('./Components/CriarCliente'));
const ListarCliente = lazy(() => import('./Components/ListarCliente'));
const AlterarCliente = lazy(() => import('./Components/AlterarCliente'));
const ExcluirCliente = lazy(() => import('./Components/ExcluirCliente'));
const FilaAtendimento = lazy(() => import('./Components/FilaAtendimento'));


const routes = [
  { path: '/', element: <Home /> },
  { path: '/criar', element: <CriarCliente /> },
  { path: '/listar', element: <ListarCliente /> },
  { path: '/alterar', element: <AlterarCliente /> },
  { path: '/excluir', element: <ExcluirCliente /> },
  { path: '/FilaAtendimento', element: <FilaAtendimento /> },
];

export default routes;