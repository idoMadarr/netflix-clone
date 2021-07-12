import React from 'react';

import style from './AccordionItem.module.css';

const AccordionItem = ({ item, index, toggle, select }) => {
  return (
    <div className={style['accordion-item']}>
      <div onClick={() => toggle(index)} className={style['accordion-header']}>
        <h4>{item.header}</h4>
        <span>{select === index ? '-' : '+'}</span>
      </div>
      <div
        className={
          select === index
            ? style['accordion-body-show']
            : style['accordion-body']
        }
      >
        {item.body}
      </div>
    </div>
  );
};

export default AccordionItem;
