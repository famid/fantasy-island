import React from 'react'
import Navbar from '../components/ui/navbar'
import Slider from '../components/ui/Slider'
import Hero from '../components/ui/hero'
import Videos from './../components/ui/Videos';

const landingPage = {
    heroHeadline: 'Fantasy Land Of The Universe',
heroIntroText:
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
footerHeadline: 'Get started with Game site, today.',
footerText:
 ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s'

}

function Home() {
  return (
    <div className="relative w-full">
    <Navbar />

    <main className="relative z-10">
    {/* <Slider/> */}
      {/* <div className="absolute top-0 left-0 right-0 bottom-0"> */}
      <Hero
        data={{
          heroHeadline: landingPage.heroHeadline,
          heroIntroText: landingPage.heroIntroText,
        }}
      />


      {/* </div> */}
      {/* <div style={{backgroundImage:'url("/assets/images/BENNER.png")', height:'100vh', width:'100vw', objectFit:'cover'}}>

      </div>
    <Hero
        data={{
          heroHeadline: landingPage.heroHeadline,
          heroIntroText: landingPage.heroIntroText,
        }}
      /> */}
    </main>
  </div>
  )
}

export default Home
