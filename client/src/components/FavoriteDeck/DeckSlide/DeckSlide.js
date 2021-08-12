import React from 'react';

import style from './DeckSlide.module.css';

const DeckSlide = ({ result, updateState }) => {
  const resultTransform = {
    id: result.slideId,
    title: result.title || result.name,
    vote_average: result.rate,
    poster_path: result.img,
    overview: result.overview,
    genre_ids: result.genre,
  };

  return (
    <li
      onClick={() => updateState(resultTransform)}
      className={style['slide-main']}
    >
      <p>{result.title}</p>
      <p>
        {' '}
        {result.rate} <i className='fas fa-bookmark'></i>{' '}
      </p>
    </li>
  );
};

export default DeckSlide;
