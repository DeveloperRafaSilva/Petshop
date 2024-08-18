import React from 'react';

const Input = ({ tipo, id, label, name, valor, setValor, placeholder }) => {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        required
        type={tipo}
        id={id}
        label={label}
        name={name}
        value={valor}
        placeholder={placeholder}
        onChange={({ target }) => setValor(target.value)}
      />
    </>
  );
};

export default Input;
