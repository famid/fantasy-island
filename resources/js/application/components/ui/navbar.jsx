import * as React from 'react'
import LogoLink from "./logo-link";

export default function Navbar() {
  return (
    <div className="relative">
      {/* <KeystaticBanner /> */}
      <header className="absolute inset-x-0 z-20 py-4 sm:fixed sm:h-24 bg-transparent  sm:py-6 bg-slate-100">
        <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-6 lg:px-8">
          <LogoLink />
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
    <div className="absolute inset-x-0 top-20 z-20 bg-black fill-white px-4 py-3 text-center text-sm text-white sm:top-24">
      You're looking at a{" "}
      Game site official page
      <a
        href="https://keystatic.thinkmill.com.au"
        className="text-white mx-1 underline hover:text-yellow-300"
        target="_blank"
        rel="noopener noreferrer"
      >

        Learn more about Game site
        <span className="sr-only">opens in a new tab</span>
      </a>{" "}
      and start the game.
    </div>
  );
}
