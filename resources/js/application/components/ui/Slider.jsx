

import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';

export default function Slider() {
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      maw={'100%'}
      mx="auto"
      withIndicators
      height={'100vh'}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide>
        <img src="/assets/images/a1.jpg" alt="" className='w-full h-[100vh] object-cover' />
      </Carousel.Slide>
      <Carousel.Slide>
      <img src="/assets/images/a1.jpg" alt=""  className='w-full h-[100vh] object-cover' />
      </Carousel.Slide>
      <Carousel.Slide>
      <img src="/assets/images/a1.jpg"alt=""  className='w-full h-[100vh] object-cover' />
      </Carousel.Slide>

    </Carousel>
  );
}