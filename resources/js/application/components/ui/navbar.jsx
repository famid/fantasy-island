import * as React from 'react'
import LogoLink from "./logo-link";

export default function Navbar() {
  return (
    <div className="relative">
      <div className='hidden md:block'>
      <KeystaticBanner />
      </div>

      <header className="absolute shadow-md inset-x-0 z-20 md:py-4 py-2 sm:fixed sm:h-24 bg-transparent  sm:py-6 " style={{background:'rgba(226 232 240)'}}>
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between md:flex-row flex-col px-2 gap-2 lg:px-8 ">
          <div className='flex gap-6 items-center'>
          <LogoLink />
         <a href="/participants" className='font-medium ml-5 text-gray-600 hover:text-gray-900'>
          Participants
         </a>
          </div>


          <nav className="flex items-center justify-between sm:ml-16 sm:w-full">
            <div className="hidden gap-10 sm:flex">
            </div>
            <div className=' gap-12  md:gap-4 flex'>
            <a
              href="/order"
              className="rounded-full  bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-900"
            >
              Buy Ticket
            </a>
            <a
              href="/game"
              className="rounded-full bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-900"
            >
              Play Game
            </a>
            </div>

          </nav>
        </div>

      </header>
    </div>
  );
}

function KeystaticBanner() {
  return (
    <div className="absolute wrapper inset-x-0 top-[50px] z-20 bg-black fill-white px-4 py-3 text-center font-bold leading-5 text-sm text-green-100 sm:top-24">
      <span className='target'>
      Eid Mubarak from Fantasy Island, Buy tickets and Join the Celebration and win fantastic prizes.
      </span>
    </div>
  );
}
