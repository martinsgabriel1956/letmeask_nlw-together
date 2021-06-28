import React, { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './styles.scss';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';

import illustrationImg from '../../assets/illustration.svg';
import logo from '../../assets/logo.svg';

import { database } from '../../services/firebase';

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    if(newRoom.trim() === '') return;

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  function handleInputValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewRoom(event.target.value);
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
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom} >
            <input 
              type="text" 
              placeholder="Nome da sala"
              onChange={handleInputValueChange}
              value={newRoom}
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