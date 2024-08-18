import React, { useRef, useEffect, useState } from 'react';
import Logo from './assets/logo.svg';
import Style from './style.module.css';
import Calendario from './Componentes/Calendario';
import Modal from './Componentes/Modal';
import HorariosMarcados from './Componentes/HorariosMarcados';

const App = () => {
  const modalRef = useRef();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && modalRef.current.contains(event.target)) {
        setModal(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modal]);

  const modalAbrir = () => {
    setModal(true);
  };

  return (
    <>
      <div className={Style.logo}>
        <img src={Logo} alt="Logo" />
      </div>
      <div ref={modalRef} className={Style.containerAgendamento}>
        <div className={Style.topoAgenda}>
          <div>
            <h2>Sua Agenda</h2>
            <p>
              Aqui você pode ver todos os clientes e serviços agendados para
              hoje.
            </p>
          </div>
          <div></div>
        </div>
        <Calendario />
      </div>
      <div className={Style.btnAgendar}>
        <button onClick={modalAbrir}>NOVO AGENDAMENTO</button>
      </div>
      {modal && <Modal ref={modalRef} />}
    </>
  );
};

export default App;
