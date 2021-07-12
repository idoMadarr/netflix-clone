import React, { useState } from 'react';

import faqs from '../../../fixtures/faqs.json';
import AccordionItem from '../AccordionItem/AccordionItem';

import style from './AccordionContainer.module.css';

const AccordionContainer = () => {
  const [select, setSelect] = useState(null);

  const toggleHandler = (index) => {
    if (select === index) {
      return setSelect(null);
    }
    setSelect(index);
  };

  return (
    <div className={style['accordion-main']}>
      <h1>Frequency Questions</h1>
      {faqs.map((item, index) => (
        <AccordionItem
          key={item.id}
          toggle={toggleHandler}
          item={item}
          index={index}
          select={select}
        />
      ))}
    </div>
  );
};

export default AccordionContainer;
