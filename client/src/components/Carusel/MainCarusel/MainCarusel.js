import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import './MainCarusel.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

import SwiperCore, { EffectFade, Pagination, Navigation } from 'swiper/core';
SwiperCore.use([EffectFade, Pagination, Navigation]);

const MainCarusel = ({ slides }) => {
  return (
    <Swiper
      className={'swiper-main'}
      effect={'slide'}
      centeredSlidesBounds={true}
      slidesPerView={1}
      centeredSlides={true}
      loop={true}
      pagination={{ type: 'bullets' }}
      navigation={true}
    >
      {slides.map((slide) => {
        if (slide.backdrop_path) {
          return (
            <SwiperSlide key={slide.id} className={'swiper-main-slide'}>
              <div className={'slider-content'}>
                <h1>{slide.title}</h1>
                <p>{slide.overview}</p>
                <small>{'Coming Soon'}</small>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/original${slide.backdrop_path}`}
                alt={slide.name}
              />
            </SwiperSlide>
          );
        }
      })}
    </Swiper>
  );
};

export default MainCarusel;
