import React from 'react'
import Navbar from '../components/ui/navbar'

import Hero from '../components/ui/hero'


const landingPage = {
    heroHeadline: 'Fantasy Island',
heroIntroText:
  'Eid Offer - By tickets to Fantasy Island for you and your family and Solve puzzle and win Prizes ',
footerHeadline: 'Get started with Game site, today.',
footerText:
 ' Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s'

}

function Home() {
  return (
    <div className=" w-full">
    <Navbar />

    <main className=" ">
    {/* <Slider/> */}
      <div className="absolute top-0 left-0 right-0 bottom-0 overflow-auto">
      <Hero
        data={{
          heroHeadline: landingPage.heroHeadline,
          heroIntroText: landingPage.heroIntroText,
        }}
      />


      </div>

    </main>
  </div>
  )
}

export default Home
