import { useState, FormEvent} from 'react';
import { useHistory, useParams } from 'react-router-dom';

import deleteImg from '../../assets/delete.svg'

// import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';
import { Question } from '../../components/Question';
import { ModalComponent } from '../../components/ModalComponent';
import { database } from '../../services/firebase';

interface RoomParams {
  id: string;
}

export function AdminRoom() {
  // const {user} = useAuth();
  const history = useHistory();
  
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  
  const roomId = params.id;

  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if(window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button onClick={handleEndRoom} isOutlined>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        
        <div className="question-list">
          {questions.map(question => (
            <Question 
            key={question.id}
            content={question.content}
            author={question.author}
            >
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Deletar pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
}