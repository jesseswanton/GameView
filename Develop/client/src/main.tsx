import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import MainPage from './pages/Home.tsx';
import GameList from './components/GameList.tsx'; // Display list of games
import GameCard from './components/GameCard.tsx';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/games',
        element: <GameList />, // Route for showing a list of games
      },
      {
        path: '/new-game',
        element: <GameCard id={0} name={''} genres={''} handleDelete={function (): void {
          throw new Error('Function not implemented.');
        } } />, // Route for creating a new game
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <RouterProvider router={router} />
  );
}