import React, { Fragment } from 'react';

import style from './Footer.module.css';

const Footer = () => {
  const footerData = [
    {
      id: 1,
      p1: 'FAQ',
      p2: 'Investor Relations',
      p3: 'Alternative Screen',
    },
    {
      id: 2,
      p1: 'Help Center',
      p2: 'Join Us',
      p3: 'Terms of Use',
    },
    {
      id: 3,
      p1: 'Account',
      p2: 'Gift Cards',
      p3: 'Privacy',
    },
    {
      id: 4,
      p1: 'Media Center',
      p2: 'Cookie Prefernces',
      p3: 'Legal',
    },
  ];

  return (
    <Fragment>
      <div className={style['footer-main']}>
        {footerData.map((data) => {
          return (
            <div key={data.id}>
              <p>{data.p1}</p>
              <p>{data.p2}</p>
              <p>{data.p3}</p>
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

export default Footer;
