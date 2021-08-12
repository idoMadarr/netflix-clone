import React from 'react';

import HeaderContainer from '../../components/HeaderContainer/HeaderContainer';
import HomeContent from '../../components/GetStarted/GetStarted';
import JumboContainer from '../../components/Jumbotron/JumboContainer/JumboContainer';
import Accordion from '../../components/Accordion/AccordionContainer/AccordionContainer';

import { motion } from 'framer-motion';

const HomeScreen = () => {
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
        <HomeContent />
      </HeaderContainer>
      <JumboContainer />
      <Accordion />
    </motion.div>
  );
};

export default HomeScreen;
