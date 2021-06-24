import { Link } from 'react-router-dom';

import '../styles/pages/auth.scss';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import illustrationImg from '../assets/illustration.svg';
import logo from '../assets/logo.svg';

export function NewRoom() {
  // const { user } = useAuth();

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>    
      <main>
        <div className="main-content">
          <img src={logo} alt="letMeAsk" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input 
              type="text" 
              placeholder="Nome da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <span>Quer entrar em uma sala existente? <Link to="/" href="#">Clique aqui</Link></span>
        </div>
      </main>
    </div>
  );
}