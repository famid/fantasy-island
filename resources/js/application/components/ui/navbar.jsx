import * as React from 'react'
import LogoLink from "./logo-link";

export default function Navbar() {
  return (
    <div className="relative">
      <KeystaticBanner />
      <header className="absolute inset-x-0 z-20 py-4 sm:fixed sm:h-24 bg-transparent  sm:py-6 " style={{background:'rgba(226 232 240)'}}>
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6 lg:px-8">
          <a href="/"><LogoLink /></a>

          <nav className="flex items-center justify-between sm:ml-16 sm:w-full">
            <div className="hidden gap-10 sm:flex">
            </div>
            <a
              href="/order"
              className="rounded-full bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-900"
            >
              Buy Ticket
            </a>
          </nav>
        </div>

      </header>
    </div>
  );
}

function KeystaticBanner() {
  return (
    <div className="absolute wrapper inset-x-0 top-19 z-20 bg-black fill-white px-4 py-3 text-center font-bold leading-5 text-sm text-green-100 sm:top-24 ">
      <span className='target'>
      Eid Mubarak from Fantasy Island, Buy tickets and win fantastic prizes.

      </span>
    </div>
  );
}
