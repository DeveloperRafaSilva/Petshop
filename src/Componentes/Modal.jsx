import React, { useRef, useState, useEffect } from 'react';
import Style from './Modal.module.css';
import User from '../assets/User.svg';
import Pet from '../assets/pet.svg';
import Phone from '../assets/Phone.svg';
import Horario from '../assets/Clock Circle.svg';
import Input from './Input';

const Modal = () => {
  const [tutor, setTutor] = useState('');
  const [pet, setPet] = useState('');
  const [numero, setNumero] = useState('');
  const [agendamento, setAgendamento] = useState('');
  const [descricao, setDescricao] = useState('');
  const [horarios, setHorarios] = useState('');
  const [loading, setLoading] = React.useState(false);

  const agendarHoraio = () => {
    if (tutor && pet && numero && agendamento && horarios) {
      setLoading(true);
      fetch('http://localhost:3000/agenamentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tutor,
          pet,
          numero,
          agendamento,
          descricao,
          horarios,
        }),
      })
        .then((response) => response.json())
        .then((dados) => {
          console.log(dados);
          console.log(loading);
          setLoading(false);
        });
    }
  };

  return (
    <div className={Style.ModalContainer}>
      <div className={Style.Topo}>
        <h2>Agendar Atendimento</h2>
        <p>Preencha os dados do cliente para realizar o agendamento:</p>
      </div>

      <div>
        <form className={Style.formCadastro}>
          <div className={Style.divInputs}>
            <label htmlFor="nome">Nome do tutor</label>
            <Input
              tipo="text"
              id="nome"
              name="nome"
              value={tutor}
              placeholder="Nome do Tutor"
              setValor={setTutor}
            />
            <img src={User} alt="Usuario icone" />
          </div>
          <div className={Style.divInputs}>
            <label htmlFor="pet">Nome do Pet</label>
            <Input
              tipo="text"
              id="pet"
              name="pet"
              value={pet}
              placeholder="Nome do pet"
              setValor={setPet}
            />
            <img src={Pet} alt="icone pessoas" />
          </div>
          <div className={Style.divInputs}>
            <label htmlFor="numero">Número de telefone</label>
            <Input
              tipo="text"
              id="numero"
              name="numero"
              value={numero}
              placeholder="(00 99999-9900)"
              setValor={setNumero}
            />
            <img src={Phone} alt="Icone telefone" />
          </div>
          <div className={Style.divInputs}>
            <label htmlFor="descricao">Descrição do serviço</label>
            <textarea
              name="descricao"
              id="descricao"
              value={descricao}
              onChange={({ target }) => setDescricao(target.value)}
              placeholder="Cortar as unhas"
            ></textarea>
          </div>
        </form>
      </div>
      <div className={Style.dadosHorario}>
        <input
          type="date"
          name="data"
          id="data"
          onChange={({ target }) => setAgendamento(target.value)}
        />
        <div className={Style.divInputs}>
          <img
            className={Style.horarioIcone}
            src={Horario}
            alt="Icone horario"
          />
          <select
            onChange={({ target }) => setHorarios(target.value)}
            name="horario"
            id="horario"
            value={horarios}
          >
            <option value="">Selecione um horário</option>
            <option value="9:00">9:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
          </select>
        </div>
      </div>
      <div className={Style.btnAgendar}>
        <button onClick={agendarHoraio}>
          {loading ? 'Carregando' : 'Agendar'}
        </button>
      </div>
    </div>
  );
};

export default Modal;
