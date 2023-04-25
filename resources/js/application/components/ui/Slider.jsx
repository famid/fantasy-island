import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";

const sliderImages = [
    {
        src: "/assets/images/BENNER.png",
        clsnm: "w-full h-[100vh] object-cover",
        alt: "",
    },
    {
      src: "/assets/b1.webp",
      clsnm: "w-full h-[100vh] object-cover",
      alt: "",
  },
  {
    src: "/assets/b2.webp",
    clsnm: "w-full h-[100vh] object-cover",
    alt: "",
}
];

export default function Slider() {
    const autoplay = useRef(Autoplay({ delay: 3000 }));
    return (
        <Carousel
            maw={"100%"}
            mx="auto"
            withIndicators
            height={"100vh"}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
        >
            {sliderImages.map((slide, i) => {
                return (
                    <Carousel.Slide>
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            className={slide.clsnm}
                        />
                    </Carousel.Slide>
                );
            })}
        </Carousel>
    );
}
