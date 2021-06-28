import React, { useState } from 'react';
import Modal from 'react-modal';

import { useAuth } from '../../hooks/useAuth';

import deleteImg from '../../assets/delete-logo.svg';
import deleteIcon from '../../assets/delete.svg';

import './styles.scss';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '8px',
    border: '1px solid #FFF'
  },
};

export function ModalComponent() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }
  
  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>
        <img src={deleteIcon} alt="Remover a pergunta" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        overlayClassName="Overlay"
        contentLabel="Example Modal"
      >
        <div className="modal-info">
          <img src={deleteImg} alt="excluir pergunta" />
          <h2 className="delete-question">Excluir pergunta</h2>
          <span>Tem certeza que você deseja excluir esta pergunta?</span>
          <form>
            <button className="cancel" onClick={closeModal}>Cancelar</button>
            <button className="accept">Sim, excluir</button>
          </form>
          
        </div>
      </Modal>
    </div>
  );
}