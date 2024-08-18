import React from 'react';
import Style from './Horarios.module.css';
import Manha from '../assets/lua.svg';
import Sol from '../assets/cloud.svg';

const HorariosMarcados = ({ dataSelecionada }) => {
  const [horariosData, setHorariosData] = React.useState([]);

  const [dados, setDados] = React.useState();

  React.useEffect(() => {
    fetch('http://localhost:3000/agenamentos')
      .then((response) => response.json())
      .then((dados) => {
        setHorariosData(dados);
      });
  }, [dados]);

  const dataSelecionadaISO = dataSelecionada.split('/').reverse().join('-');

  const dataMarcada = horariosData.filter(({ agendamento }) => {
    return agendamento === dataSelecionadaISO;
  });

  function removerAgendamento(id) {
    fetch(`http://localhost:3000/agenamentos/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((dados) => {
        setDados(dados);
      });
  }

  if (dataMarcada.length == 0) {
    return (
      <p style={{ color: '#ffff', margin: '2rem 0' }}>Sem horarios marcados</p>
    );
  }

  return (
    <div className={Style.horarios}>
      {dataMarcada
        .filter(({ horarios }) => {
          const hora = parseInt(horarios.split(':')[0], 10);
          return hora < 12;
        })
        .map((marcados) => (
          <div key={marcados.id} className={Style.horariosManha}>
            <div key={marcados.id}>
              <div className={Style.topoHorario}>
                <img src={Manha} alt="Ícone manhã" />
                <h2>Manhã</h2>
              </div>
              <div className={Style.cardMarcados}>
                <div>
                  <h2>{marcados.horarios}</h2>
                  <p>{marcados.pet} / </p>
                  <p className={Style.ligth}>{marcados.tutor}</p>
                </div>
                <div>
                  <p className={Style.ligth}>{marcados.descricao}</p>
                </div>
                <div>
                  <p
                    onClick={() => removerAgendamento(marcados.id)}
                    className={Style.ligth}
                  >
                    Remover agendamento
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      {dataMarcada
        .filter(({ horarios }) => {
          const hora = parseInt(horarios.split(':')[0], 10);
          return hora >= 12;
        })
        .map((marcados) => (
          <div key={marcados.id} className={Style.horariosManha}>
            <div key={marcados.id}>
              <div className={Style.topoHorario}>
                <img src={Sol} alt="Ícone tarde" />
                <h2>Tarde</h2>
              </div>
              <div className={Style.cardMarcados}>
                <div>
                  <h2>{marcados.horarios}</h2>
                  <p>{marcados.pet} / </p>
                  <p className={Style.ligth}>{marcados.tutor}</p>
                </div>
                <div>
                  <p className={Style.ligth}>{marcados.descricao}</p>
                </div>
                <div>
                  <p
                    onClick={() => removerAgendamento(marcados.id)}
                    className={Style.ligth}
                  >
                    Remover agendamento
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default HorariosMarcados;
