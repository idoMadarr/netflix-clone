import React from 'react';

import HeaderContainer from '../../components/HeaderContainer/HeaderContainer';
import SignInForm from '../../components/Forms/SignInForm/SignInForm';

import { motion } from 'framer-motion';

const RegisterScreen = () => {
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
        <SignInForm />
      </HeaderContainer>
    </motion.div>
  );
};

export default RegisterScreen;
