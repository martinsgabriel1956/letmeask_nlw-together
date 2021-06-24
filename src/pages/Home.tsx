import { useHistory } from 'react-router-dom';

import '../styles/pages/auth.scss';

import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/Button';

import illustrationImg from '../assets/illustration.svg';
import logo from '../assets/logo.svg';
import googleIconImage from '../assets/google-icon.svg';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth()

  async function handleCreateRoom() {
    if(!user) {
      await signInWithGoogle();
    }
   
    history.push("/rooms/new");
  }

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
          <button className="create-room" onClick={handleCreateRoom}>
            <img src={googleIconImage} alt="Logo da Google" />
            Crie sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}