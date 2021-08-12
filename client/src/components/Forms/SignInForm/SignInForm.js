import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../../store/actions/authActions';

import InputElement from '../InputElement/InputElement';
import Spinner from '../../UIElements/Spinner/Spinner';

import style from './SignInForm.module.css';

const SignInForm = ({ history }) => {
  const emailSign = useSelector((state) => state.authReducer.emailSign);
  const message = useSelector((state) => state.authReducer.message);
  const isLoading = useSelector((state) => state.authReducer.isLoading);

  const [formState, setFormState] = useState({
    email: emailSign || '',
    password: '',
    rememberMe: false,
  });
  const { email, password, rememberMe } = formState;

  const [errorState, setErrorState] = useState({
    emailErr: '',
    passwordErr: '',
  });
  const { emailErr, passwordErr } = errorState;

  const dispatch = useDispatch();

  const signinHandler = (event) => {
    event.preventDefault();
    const isValid = validator();
    if (isValid) {
      dispatch(signIn(formState, history));
    }
  };

  const validator = () => {
    let emailErr = null;
    let passwordErr = null;

    if (!email.includes('@')) emailErr = 'Valid email is required';
    if (password.length < 6 || password.length > 9)
      passwordErr = 'Password must be between 6 to 9 characters';

    if (emailErr || passwordErr) {
      setErrorState((prevState) => {
        return {
          ...prevState,
          emailErr,
          passwordErr,
        };
      });
      return false;
    }
    return true;
  };

  const updateState = (event) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };

  const formConfig = [
    {
      id: 1,
      inputType: 'email',
      value: email,
      holder: 'Email',
      name: 'email',
      error: emailErr,
    },
    {
      id: 2,
      inputType: 'password',
      value: password,
      holder: 'Password',
      name: 'password',
      error: passwordErr,
    },
  ];

  return (
    <div className={style['sign-in-main']}>
      <div className={style['sign-in-header']}>
        <h2>Sign In</h2>
      </div>
      <form onSubmit={signinHandler} className={style['sign-in-form']}>
        {formConfig.map((input) => (
          <InputElement
            key={input.id}
            inputType={input.inputType}
            value={input.value}
            holder={input.holder}
            name={input.name}
            insertFunc={updateState}
            error={input.error}
          />
        ))}
        <button type={'submit'}>{isLoading ? <Spinner /> : 'Sign In'}</button>
        <div className={style['sign-in-remember']}>
          <div>
            <input
              type={'checkbox'}
              value={rememberMe}
              name={'rememberMe'}
              onChange={() =>
                setFormState({ ...formState, rememberMe: !rememberMe })
              }
            />
            <label htmlFor={'remember'}>Remember me</label>
          </div>
          <small>Need help?</small>
        </div>
      </form>
      <div className={style['error-message']}>
        <small>{message}</small>
      </div>
      <div className={style['sign-in-footer']}>
        <small>
          New to Netflix? <Link to={'/'}>Sign up now</Link>
        </small>
        <small>
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </small>
      </div>
    </div>
  );
};

export default withRouter(SignInForm);
