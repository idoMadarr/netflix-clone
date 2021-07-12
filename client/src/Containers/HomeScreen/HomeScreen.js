import React, { Fragment } from 'react';

import HeaderContainer from '../../components/HeaderContainer/HeaderContainer';
import HomeContent from '../../components/GetStarted/GetStarted';
import JumboContainer from '../../components/Jumbotron/JumboContainer/JumboContainer';
import Accordion from '../../components/Accordion/AccordionContainer/AccordionContainer';

const HomeScreen = () => {
  return (
    <Fragment>
      <HeaderContainer>
        <HomeContent />
      </HeaderContainer>
      <JumboContainer />
      <Accordion />
    </Fragment>
  );
};

export default HomeScreen;
