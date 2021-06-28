import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast';

import './styles.scss';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { database } from '../../services/firebase';

import illustrationImg from '../../assets/illustration.svg';
import logo from '../../assets/logo.svg';
import googleIconImage from '../../assets/google-icon.svg';

export function Home() {
  const history = useHistory();
  const { user, signInWithGoogle } = useAuth();
  const [ roomCode, setRoomCode ] = useState('');

  async function handleCreateRoom() {
    if(!user) await signInWithGoogle();
    history.push("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if(roomCode.trim() === '') return;
    
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    
    if(!roomRef.exists()) {
      toast.error("Room does not exists.");
      return;
    }

    if(roomRef.val().endedAt) {
      toast.error(`Room already closed.`)
      return;
    }

    history.push(`/rooms/${roomCode}`);
  }

  function handleRoomCodeChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRoomCode(event.target.value);
  }

  return (
    <div id="page-auth">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
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
          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o código da sala"
              onChange={handleRoomCodeChange}
              value={roomCode}
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