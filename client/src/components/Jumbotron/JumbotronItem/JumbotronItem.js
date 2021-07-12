import React from 'react';

import style from './JumbotronItem.module.css';

const JumbotronItem = ({ title, subTitle, image, alt }) => {
  return (
    <div className={style['jumbo-main']}>
      <div>
        <h2>{title}</h2>
        <p>{subTitle}</p>
      </div>
      <div>
        <img src={image} alt={alt} />
      </div>
    </div>
  );
};

export default JumbotronItem;
