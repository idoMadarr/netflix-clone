import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from '../../components/Header/Header';
import SectionCarusel from '../../components/Carusel/SectionCarusel/SectionCarusel';
import MainCarusel from '../../components/Carusel/MainCarusel/MainCarusel';
import Modal from '../../components/Modal/ModalOverly/ModalOverly';

import { motion, AnimatePresence } from 'framer-motion';

const MainScreen = () => {
  const [trendsState, setTrendsState] = useState([]);
  const [moviesState, setMoviesState] = useState([]);
  const [seriesState, setSeriesState] = useState([]);
  const [topRatedState, setTopRatedState] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [modalContentState, setModalContentState] = useState({});
  const api_key = `d9dc46e2b38f8641eb273674c087041b`;

  // Trends Movies:
  useEffect(() => {
    const fetchTrends = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${api_key}&language=en-US&page=1`
      );
      setTrendsState(response.data.results);
    };
    fetchTrends();
  }, [api_key]);

  // Hot Movies:
  useEffect(() => {
    const fetchHotMovies = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${api_key}&language=en-US&page=1`
      );
      setMoviesState(response.data.results);
    };
    fetchHotMovies();
  }, [api_key]);

  // Now On The Air:
  useEffect(() => {
    const fetchHotSeries = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/on_the_air?api_key=${api_key}&language=en-US&page=1`
      );
      setSeriesState(response.data.results);
    };
    fetchHotSeries();
  }, [api_key]);

  // Top Series Rated:
  useEffect(() => {
    const fetchRated = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1`
      );
      setTopRatedState(response.data.results);
    };
    fetchRated();
  }, [api_key]);

  // Modal:
  const openModalHandler = async (id, genre) => {
    if (genre === 'Hot Movies') {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`
      );
      setModalContentState(response.data);
    }

    if (genre === 'Series On the Air' || genre === 'Top Rated') {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${api_key}&language=en-US`
      );
      setModalContentState(response.data);
    }
    setModalState(!modalState);
  };

  const closeModalHandler = () => {
    setModalState(!modalState);
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
      exit={exit}
      variants={variants}
      initial={'init'}
      animate={'animate'}
    >
      <AnimatePresence>
        {modalState && (
          <Modal
            show={modalState}
            closeModal={closeModalHandler}
            content={modalContentState}
          ></Modal>
        )}
      </AnimatePresence>
      <Header />
      <MainCarusel slides={trendsState} />
      <SectionCarusel
        icon={'fas fa-video fa-lg'}
        genre={'Hot Movies'}
        delayPlay={5000}
        slides={moviesState}
        openModal={openModalHandler}
      />
      <SectionCarusel
        icon={'fas fa-tv fa-lg'}
        genre={'Series On the Air'}
        delayPlay={3300}
        slides={seriesState}
        openModal={openModalHandler}
      />
      <SectionCarusel
        icon={'fas fa-star fa-lg'}
        genre={'Top Rated'}
        delayPlay={4000}
        slides={topRatedState}
        openModal={openModalHandler}
      />
    </motion.div>
  );
};

export default MainScreen;
