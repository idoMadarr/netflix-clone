import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFavorite } from '../../store/actions/favoriteAction';

import HeaderContainer from '../../components/HeaderContainer/HeaderContainer';
import DeckMain from '../../components/FavoriteDeck/DeckMain/DeckMain';

import SpinnerWhite from '../../components/UIElements/SpinnerWhite/SpinnerWhite';
import { motion } from 'framer-motion';

const FavoriteScreen = () => {
  const favorites = useSelector((state) => state.favoriteReducer.favorites);
  const getSlidesResults = useSelector(
    (state) => state.favoriteReducer.getSlidesResults
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorite());
  }, [dispatch]);

  const variants = {
    init: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  const exit = {
    opacity: 0,
  };

  return (
    <motion.div
      exit={exit}
      variants={variants}
      initial={'init'}
      animate={'animate'}
    >
      <HeaderContainer>
        {getSlidesResults ? <DeckMain slides={favorites} /> : <SpinnerWhite />}
      </HeaderContainer>
    </motion.div>
  );
};

export default FavoriteScreen;
