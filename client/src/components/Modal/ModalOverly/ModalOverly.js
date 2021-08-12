import ReactDOM from 'react-dom';
import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '../../../store/actions/favoriteAction';

import SpinnerGreen from '../../UIElements/SpinnerGreen/SpinnerGreen';
import Backdrop from '../Backdrop/Backdrop';

import style from './ModalOverly.module.css';
import { motion } from 'framer-motion';

const ModalOverly = (props) => {
  const isLoading = useSelector((state) => state.favoriteReducer.isLoading);
  const message = useSelector((state) => state.favoriteReducer.message);
  const dispatch = useDispatch();

  const variants = {
    init: {
      y: '-100vh',
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
      },
    },
    hidden: {
      y: '-100vh',
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const content = (
    <motion.div
      variants={variants}
      exit={'hidden'}
      initial={'init'}
      animate={'animate'}
      className={style['modal-main']}
    >
      <div className={style['modal-content']}>
        <small>{message}</small>
        <small>{props.content.genres[0]?.name}</small>
        <h2>{props.content.name || props.content.title}</h2>
        <small>"{props.content.tagline || 'NETFLIX'}"</small>
        <p>
          Rate: 10/{props.content.vote_average}{' '}
          {props.content.vote_average > 8 ? (
            <i className='fas fa-star color'></i>
          ) : props.content.vote_average > 6 ? (
            <i className='fas fa-star-half-alt'></i>
          ) : (
            <i className='far fa-star'></i>
          )}
        </p>
        <p>Popularity: {props.content.popularity}</p>
        <span>Status: {props.content.status}</span>
        <small>Overview: {props.content.overview}</small>
        <div className={style['modal-controller']}>
          <button onClick={() => props.closeModal()}>Close</button>
          <button onClick={() => dispatch(addFavorite(props.content))}>
            {isLoading ? <SpinnerGreen /> : 'Favorite'}
          </button>
        </div>
      </div>
      <div className={style['modal-img']}>
        <img
          src={
            props.content.poster_path
              ? `https://image.tmdb.org/t/p/w500${props.content.poster_path}`
              : `https://storiavoce.com/wp-content/plugins/lightbox/images/No-image-found.jpg`
          }
          alt={props.content.poster_path}
        />
      </div>
    </motion.div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'));
};

const Modal = (props) => {
  const variants = {
    animate: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <Fragment>
      <motion.div variants={variants} exit={'hidden'} animate={'animate'}>
        {props.show && <Backdrop onClose={props.closeModal} />}
      </motion.div>
      <ModalOverly {...props} />
    </Fragment>
  );
};

export default Modal;
