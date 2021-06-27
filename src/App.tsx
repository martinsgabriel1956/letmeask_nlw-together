import { BrowserRouter, Route} from 'react-router-dom';

import './styles/global.scss'

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

import { AuthContextProvider } from './contexts/AuthContext'

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" exact component={NewRoom} />
        <Route path="/rooms/:id" component={Room} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}