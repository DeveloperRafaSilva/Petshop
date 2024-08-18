import React from 'react';
import Style from './Calendario.module.css';
import DatePicker from 'react-datepicker';
import Calendarioimg from '../assets/Calendar Minimalistic.svg';
import 'react-datepicker/dist/react-datepicker.css';
import HorariosMarcados from './HorariosMarcados';
const Calendario = () => {
  const [data, setData] = React.useState('');

  function dataChange(data) {
    setData(data);
  }

  const dataSelecionada = data ? data.toLocaleDateString('pt-BR') : '';

  return (
    <div>
      <div className={Style.Calendario}>
        <img src={Calendarioimg} alt="" />
        <DatePicker
          selected={data}
          onChange={dataChange}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/AAAA"
        />
      </div>
      {dataSelecionada && (
        <HorariosMarcados dataSelecionada={dataSelecionada} />
      )}
    </div>
  );
};

export default Calendario;
