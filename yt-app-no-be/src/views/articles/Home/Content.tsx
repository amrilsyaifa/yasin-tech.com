import Link from '@components/Link';
import { AiOutlineRight } from 'react-icons/ai';
import Slider from 'react-slick';
import Card from './Card';

const Content = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
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
  return (
    <div className='flex flex-col bg-white'>
      <div className='mx-auto flex w-full max-w-screen-xl flex-col flex-wrap space-y-20 py-4'>
        {/* Main Wrapper */}
        <div className='flex w-full flex-col'>
          <div className='flex flex-row items-center justify-between'>
            <p className='font-semi-bold text-xl text-yt-gray-600'>
              Featured Article --
            </p>

            <Link
              href='#'
              className='font-semi-bold flex flex-row items-center space-x-1 text-lg text-yt-gray-600'
            >
              See All Article
              <span>
                <AiOutlineRight />
              </span>
            </Link>
          </div>
          <Slider
            className='flex flex-row flex-wrap items-center space-x-6 pb-6'
            {...settings}
          >
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </Slider>
        </div>
        <div className='flex w-full flex-col'>
          <div className='flex flex-row items-center justify-between'>
            <p className='font-semi-bold text-xl text-yt-gray-600'>
              Featured Article --
            </p>

            <Link
              href='#'
              className='font-semi-bold flex flex-row items-center space-x-1 text-lg text-yt-gray-600'
            >
              See All Article
              <span>
                <AiOutlineRight />
              </span>
            </Link>
          </div>
          <div className='mt-6 flex flex-row flex-wrap items-center space-x-6'>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <div className='flex w-full flex-col'>
          <div className='flex flex-row items-center justify-between'>
            <p className='font-semi-bold text-xl text-yt-gray-600'>
              Featured Article --
            </p>

            <Link
              href='#'
              className='font-semi-bold flex flex-row items-center space-x-1 text-lg text-yt-gray-600'
            >
              See All Article
              <span>
                <AiOutlineRight />
              </span>
            </Link>
          </div>
          <div className='mt-6 flex flex-row flex-wrap items-center space-x-6'>
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
