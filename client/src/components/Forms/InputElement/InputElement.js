import React from 'react';

import style from './InputElement.module.css';

const InputElement = ({
  inputType,
  value,
  holder,
  name,
  insertFunc,
  error,
}) => {
  return (
    <div className={style['input-element-main']}>
      <input
        type={inputType}
        value={value}
        placeholder={holder}
        name={name}
        onChange={insertFunc}
      />
      <div className={style['input-error']}>
        <small>{error || null}</small>
      </div>
    </div>
  );
};

export default InputElement;
