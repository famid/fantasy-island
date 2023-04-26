import { useRef,useState,useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel } from "@mantine/carousel";
import { useViewportSize } from "@mantine/hooks";

export default function Slider() {
    const autoplay = useRef(Autoplay({ delay: 3000 }));
    const [mobile, setMobile] = useState(false);
    const { height, width } = useViewportSize();
    useEffect(() => {
        if (width > 1000) setMobile(false);
        else setMobile(true);
    }, [width]);

    const sliderImages = [
        {
            src: `/assets/images/${mobile ? 'mb3.jpg' :'BENNER.png'}`,
            clsnm: `w-full h-[100vh] object-cover `,
            alt: "",
        },
        {
            src:`/assets/images/${mobile ? 'mb1.jpg' :'b1.webp'}`,
            clsnm: `w-full h-[100vh] object-cover`,
            alt: "",
        },
        {
            src: `/assets/images/${mobile ? 'mb2.jpg' :'b2.webp'}`,
            clsnm: `w-full h-[100vh] object-cover`,
            alt: "",
        },
    ];

    return (
        <Carousel
            maw={"100%"}
            mx="auto"
            withIndicators
            // height={"110vh"}
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
                            // height="100vh"
                            className={slide.clsnm}
                        />
                    </Carousel.Slide>
                );
            })}
        </Carousel>
    );
}
