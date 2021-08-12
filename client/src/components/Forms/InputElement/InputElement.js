import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import style from './InputElement.module.css';

const InputElement = ({
  inputType,
  value,
  holder,
  name,
  insertFunc,
  error,
  location,
}) => {
  const path = location.pathname;
  const emailSign = useSelector((state) => state.authReducer.emailSign);

  return (
    <div className={style['input-element-main']}>
      <input
        type={inputType}
        value={value}
        placeholder={holder}
        name={name}
        onChange={insertFunc}
        readOnly={
          inputType === 'email' && path === '/sign-up' && emailSign !== ''
            ? true
            : false
        }
      />
      <div className={style['input-error']}>
        <small>{error || null}</small>
      </div>
    </div>
  );
};

export default withRouter(InputElement);
