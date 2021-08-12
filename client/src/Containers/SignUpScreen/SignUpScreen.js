import React from 'react';

import HeaderContainer from '../../components/HeaderContainer/HeaderContainer';
import SignUpForm from '../../components/Forms/SignUpForm/SignUpForm';

import { motion } from 'framer-motion';
const SignUpScreen = () => {
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
        <SignUpForm />
      </HeaderContainer>
    </motion.div>
  );
};

export default SignUpScreen;
