import Videos from "./Videos";


export default function Hero({
  data: { heroHeadline, heroIntroText },
}) {
  return (
    <section id='hero' className="relative overflow-auto h-full bg-gradient-to-br from-white/50 to-transparent">
      {/* Blob 2 */}

      <div className="relative z-10 mx-auto grid max-w-5xl py-48 px-6 sm:py-32  justify-center md:py-48 lg:px-8">

          <h1 className="mt-0 text-4xl gradient-text leading-[50px] text-center font-bold sm:text-5xl md:mt-20 md:text-6xl lg:text-7xl">
            {heroHeadline}
          </h1>
          <p className="mt-6 sm:mt-10 sm:text-xl mx-auto font-semibold text-center max-w-[700px] sm:leading-8">
            {heroIntroText}
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-wrap justify-center items-center gap-6 md:mt-20 md:gap-6">
            <a href="/order"               className="rounded-full bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-900">
                Buy Ticket
            </a>
            <a
              href="/game"
              className="rounded-full border border-black px-5 py-2.5 font-medium hover:bg-gray-200/25"
            >
              Play Game
            </a>
          </div>
          <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="mt-24 max-w-4xl text-3xl font-bold sm:text-5xl md:mt-40">
          Play Game And Win Prizes
        </h2>
        <section className="text-gray-600 body-font  flex justify-center items-center">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white ">
                  <div>
                    <h2 className="text-gray-900 text-lg font-bold">1st Prize</h2>
                    <h3 className="mt-2 text-xl font-bold text-yellow-500 text-left">15000 TAKA</h3>

                  </div>
                  <div
                    className="bg-gradient-to-tr from-yellow-500 to-yellow-400 w-32 h-32  rounded-full shadow-2xl shadow-yellow-400 border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-2xl">DIAMOND</h1>
                    </div>
                  </div>
                </div>

              </div>


              <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white ">
                  <div>
                    <h2 className="text-gray-900 text-lg font-bold">2nd Prize</h2>
                    <h3 className="mt-2 text-xl font-bold text-cyan-500 text-left">150.000 Taka</h3>

                  </div>
                  <div
                    className="bg-gradient-to-tr from-cyan-500 to-cyan-400 w-32 h-32  rounded-full shadow-2xl shadow-cyan-400 border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-2xl">GOLD</h1>
                    </div>
                  </div>
                </div>

              </div>
              <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                <div className=" flex items-center  justify-between p-4  rounded-lg bg-white ">
                  <div>
                    <h2 className="text-gray-900 text-lg font-bold">First Prize</h2>
                    <h3 className="mt-2 text-xl font-bold text-indigo-500 text-left">150.000 TAKA</h3>

                  </div>
                  <div
                    className="bg-gradient-to-tr from-indigo-500 to-indigo-400 w-32 h-32  rounded-full shadow-2xl shadow-[#304FFE] border-white  border-dashed border-2  flex justify-center items-center ">
                    <div>
                      <h1 className="text-white text-2xl">Silver</h1>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </section>
        <Videos />
      </div>
        </div>

    </section>
  );
}
