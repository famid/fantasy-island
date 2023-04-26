
export default function Hero({ data: { heroHeadline, heroIntroText } }) {
    return (
        <section
            id="hero"
            className="relative h-full bg-gradient-to-br from-white/50 to-transparent overflow-auto"
        >
            <div className="relative z-10 mx-auto grid h-screen max-w-5xl py-48 px-6 sm:py-32  justify-center md:py-48 lg:px-8">
                <h1 className="mt-0 text-4xl  leading-[50px] text-center font-bold sm:text-5xl md:mt-20 md:text-6xl lg:text-7xl text-white">
                    {heroHeadline}
                </h1>
            </div>
        </section>
    );
}
