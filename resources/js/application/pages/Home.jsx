import React from "react";
import Navbar from "../components/ui/navbar";

import Hero from "../components/ui/hero";
import Slider from "./../components/ui/Slider";
import Videos from "../components/ui/Videos";
import { prizePool } from "../../uitls";

const landingPage = {
    heroHeadline: "Fantasy Island",
    heroIntroText:
        "Eid Offer - Buy tickets to Fantasy Island for you and your family and Solve puzzle and win Prizes ",
    footerHeadline: "Get started with Game site, today.",
    footerText:
        " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s",
};

function Home() {
    return (
        <div className=" w-full">
            <Navbar />

            <main className="">
              {/* <div className="mt-8"> */}
                <Slider />
              {/* </div> */}

                {/* <div className="absolute top-0 left-0 right-0 bottom-0 overflow-auto">
                    <Hero
                        data={{
                            heroHeadline: landingPage.heroHeadline,
                            heroIntroText: landingPage.heroIntroText,
                        }}
                    />
                </div> */}

                <div className="w-full h-auto bg-gray-200 py-8">
                <div className="mx-auto max-w-5xl px-6 lg:px-8 ">
                    <h2 className="mt-24 max-w-4xl text-3xl font-bold sm:text-5xl md:mt-40">
                        Play Game And Win Prizes
                    </h2>
                    <section className="text-gray-600 body-font  flex justify-center items-center">
                        <div className="container px-5 py-24 mx-auto">
                            <div className="flex flex-wrap -m-4 text-center">
                                {prizePool.map((prize, i) => (
                                    <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500">
                                        <div className=" flex items-center  justify-between p-4  rounded-lg bg-white ">
                                            <div>
                                                <h2 className="text-gray-900 text-lg font-bold text-left">
                                                    {prize.prizeIndex} Prize
                                                </h2>
                                                <h3 className="mt-2 text-xl font-bold text-indigo-500 text-left">
                                                    {prize.prizeAmount} TAKA
                                                </h3>
                                            </div>
                                            <div className="bg-gradient-to-tr from-indigo-500 to-indigo-400 w-32 h-32  rounded-full shadow-2xl shadow-[#304FFE] border-white  border-dashed border-2  flex justify-center items-center ">
                                                <div>
                                                    <h1 className="text-white text-lg">
                                                        {prize.type}
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <Videos />
                </div>
                </div>

            </main>
        </div>
    );
}

export default Home;
