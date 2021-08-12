import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import defaultFavorite from '../../../fixtures/defaultFavorite.json';
import DeckHead from '../DeckHead/DeckHead';
import DeckDetails from '../DeckDetails/DeckDetails';
import DeckSlide from '../DeckSlide/DeckSlide';

import style from './DeckMain.module.css';
import { motion } from 'framer-motion';

const DeckMain = ({ slides }) => {
  const [selectFavoriteState, setSelectFavoriteState] = useState({
    id: slides[0]?.slideId || defaultFavorite.id,
    title: slides[0]?.title || slides[0]?.name || defaultFavorite.title,
    vote_average: slides[0]?.rate || defaultFavorite.vote_average,
    poster_path: slides[0]?.img || defaultFavorite.poster_path,
    overview: slides[0]?.overview || defaultFavorite.overview,
    genre_ids: slides[0]?.genre || defaultFavorite.genre_ids,
  });
  const [searchState, setSearchtState] = useState([]);
  const [isFavoriteState, setIsFavoriteState] = useState(false);
  const [spinnerState, setSpinnerState] = useState(false);
  const favorites = useSelector((state) => state.favoriteReducer.favorites);
  const api_key = `d9dc46e2b38f8641eb273674c087041b`;

  useEffect(() => {
    searchHandler(selectFavoriteState.title);
  }, []);

  useEffect(() => {
    setIsFavoriteState(!isFavoriteState);
  }, [slides]);

  const updateState = (result) => {
    const isExists = favorites.find(
      (favorite) =>
        favorite.slideId === result.id || favorite.slideId === result.slideId
    );
    isExists ? setIsFavoriteState(true) : setIsFavoriteState(false);
    setSelectFavoriteState({
      ...result,
    });
  };

  const searchHandler = async (search) => {
    setSpinnerState(true);
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${search}&page=1&include_adult=false`
    );
    const insuranceValues = response.data.results.filter(
      (result) =>
        result.id &&
        result.genre_ids &&
        result.overview &&
        result.poster_path &&
        result.vote_average &&
        (result.title || result.name)
    );
    setSearchtState(insuranceValues);
    setSpinnerState(false);
  };

  const variants = {
    init: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.9,
      },
    },
  };

  const exit = {
    opacity: 0,
  };

  return (
    <motion.div
      className={style['deck-main']}
      exit={exit}
      variants={variants}
      initial={'init'}
      animate={'animate'}
    >
      <div className={style['deck-main-left']}>
        <DeckHead
          search={searchHandler}
          isLoading={spinnerState}
          updateState={updateState}
          results={searchState}
        />
        <ul>
          {slides.length > 0 ? (
            slides.map((slide) => (
              <DeckSlide
                key={slide.slideId}
                result={slide}
                updateState={updateState}
              />
            ))
          ) : (
            <li className={style['deck-main-message']}>
              Add your best favorites
            </li>
          )}
        </ul>
        <DeckDetails
          isFavorite={isFavoriteState}
          results={selectFavoriteState}
        />
      </div>
      <div className={style['deck-main-right']}>
        <img
          src={`https://image.tmdb.org/t/p/w500${selectFavoriteState.poster_path}`}
          alt={'select-img'}
        />
      </div>
    </motion.div>
  );
};

export default DeckMain;
