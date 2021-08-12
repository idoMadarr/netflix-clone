import React, { Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/core';

import './SectionCarusel.css';
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/navigation/navigation.min.css';

import SwiperCore, { Pagination, Navigation } from 'swiper/core';
SwiperCore.use([Pagination, Navigation, Autoplay]);

const SectionCarusel = ({ icon, genre, delayPlay, slides, openModal }) => {
  return (
    <Fragment>
      <div className={'swiper-genre'}>
        <i className={icon}></i>
        <p>{genre} :</p>
      </div>
      <hr className={'line'} />
      <Swiper
        className={'swiper-section'}
        centeredSlidesBounds={true}
        slidesPerView={6}
        centeredSlides={true}
        loop={true}
        spaceBetween={10}
        autoplay={{ delay: delayPlay, disableOnInteraction: false }}
        breakpoints={{
          1340: {
            slidesPerView: 6,
            spaceBetween: 10,
          },
          780: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          580: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          375: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          0: {
            slidesPerView: 1,
          },
        }}
        navigation={true}
      >
        {slides.map((slide) => {
          if (slide.poster_path && slide.overview) {
            return (
              <SwiperSlide key={slide.id} className={'swiper-section-slide'}>
                <img
                  onClick={() => openModal(slide.id, genre)}
                  src={`https://image.tmdb.org/t/p/w500${slide.poster_path}`}
                  alt={slide.poster_path}
                />
              </SwiperSlide>
            );
          }
        })}
      </Swiper>
    </Fragment>
  );
};

export default SectionCarusel;
