import React, { FC, useState } from 'react';
// import react slick
import Slider from 'react-slick';
import Image from 'next/image';
import { AiFillCaretLeft, AiFillCaretRight, AiFillStar } from 'react-icons/ai';
import { Testimony } from '@hooks/api/useListTestimony/interface';
interface TestimonyProps {
  testimonies: Testimony[];
}

const Testimony: FC<TestimonyProps> = ({ testimonies }) => {
  const settings = {
    dots: true,
    dotsClass: 'slick-dots w-max absolute mt-20  ',
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [sliderRef, setSliderRef] = useState<any>();

  return (
    <>
      <Slider
        {...settings}
        arrows={false}
        ref={(sliderRef) => setSliderRef(sliderRef)}
        className='flex items-stretch justify-items-stretch'
      >
        {testimonies.map((listTestimonis) => (
          <div className='flex items-stretch px-3' key={listTestimonis.id}>
            <div className='flex flex-col rounded-lg border-2 border-yt-gray-600 bg-white p-8 transition-all hover:border-white'>
              <div className='flex w-full flex-col items-stretch xl:flex-row xl:items-center'>
                <div className='order-2 flex xl:order-1'>
                  <Image
                    src={listTestimonis.image}
                    height={50}
                    width={70}
                    alt='Icon People'
                  />
                  <div className='ml-5 flex flex-col text-left'>
                    <p className='text-black-600 text-lg capitalize'>
                      {listTestimonis.name}
                    </p>
                    <p className='text-black-500 text-sm capitalize'>
                      {listTestimonis.company}
                    </p>
                    <p className='text-black-500 text-sm capitalize'>
                      {listTestimonis.jobTitle}
                    </p>
                  </div>
                </div>
                <div className='order-1 ml-auto flex flex-none items-center xl:order-2'>
                  <p className='text-sm'>{listTestimonis.rating}</p>
                  <span className='ml-4 flex'>
                    <AiFillStar />
                  </span>
                </div>
              </div>
              <p className='mt-5 text-left'>“{listTestimonis.descEn}”.</p>
            </div>
          </div>
        ))}
      </Slider>
      <div className='flex w-full items-center justify-end'>
        <div className='mt-14 flex w-auto flex-none justify-between'>
          <div
            className='hover:text-white-500 mx-4 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white bg-white text-yt-blue-600 transition-all hover:bg-yt-blue-600 hover:text-white'
            onClick={sliderRef?.slickPrev}
          >
            <AiFillCaretLeft />
          </div>
          <div
            className='hover:text-white-500 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white bg-white text-yt-blue-600 transition-all hover:bg-yt-blue-600 hover:text-white'
            onClick={sliderRef?.slickNext}
          >
            <AiFillCaretRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimony;
