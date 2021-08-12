import React, { useState } from 'react';

import Spinner from '../../UIElements/Spinner/Spinner';

import style from './DeckHead.module.css';

const DeckHead = ({ search, isLoading, results, updateState }) => {
  const [inputState, setInputState] = useState('');

  const searchHandler = () => {
    setInputState('');
    search(inputState);
  };

  const searchResults = results.map((result) => (
    <li key={result.id} onClick={() => updateState(result)}>
      {result.title || result.name}
      <small>{result.vote_average}</small>
    </li>
  ));

  const noResultsMessage = (
    <p className={style['no-results-message']}>No results has been found</p>
  );

  return (
    <div className={style['deck-main-head']}>
      <h1>
        <i className='fas fa-user-circle'></i> Your Favorites:
      </h1>
      <div>
        <input
          type={'text'}
          onChange={(e) => setInputState(e.target.value)}
          value={inputState}
          placeholder={'Search'}
        />
        <button onClick={searchHandler}>
          {isLoading ? <Spinner /> : 'Find'}
        </button>
      </div>
      <ul className={style['search-result']}>
        {searchResults.length > 0 ? searchResults : noResultsMessage}
      </ul>
    </div>
  );
};

export default DeckHead;
