import React, { Fragment } from 'react';

import jumboData from '../../../fixtures/jumbo.json';
import JumbotronItem from '../JumbotronItem/JumbotronItem';

const JumboContainer = () => {
  return (
    <Fragment>
      {jumboData.map((item) => {
        return (
          <JumbotronItem
            key={item.id}
            title={item.title}
            subTitle={item.subTitle}
            image={item.image}
            alt={item.alt}
            direction={item.direction}
          />
        );
      })}
    </Fragment>
  );
};

export default JumboContainer;
