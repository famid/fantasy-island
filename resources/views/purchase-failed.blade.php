@extends('layouts.app')

@section('content')

<div class="flex flex-col items-center justify-center h-screen">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 text-red-500" viewBox="0 0 20 20" fill="currentColor">
    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.293 6.293a1 1 0 011.414 0L10 7.586l.293-.293a1 1 0 011.414 0l.293.293a1 1 0 010 1.414L11.414 9l.293.293a1 1 0 010 1.414l-.293.293a1 1 0 01-1.414 0L10 10.414l-.293.293a1 1 0 01-1.414 0l-.293-.293a1 1 0 010-1.414L8.586 9l-.293-.293a1 1 0 010-1.414z" clip-rule="evenodd" />
  </svg>
  <p class="text-3xl font-semibold text-red-500 my-4">Purchase Failed</p>
  <p class="text-gray-300 text-center text-xl">We're sorry, your purchase could not be completed at this time.</p>
  <a href='/order' class="bg-red-500 text-white font-semibold py-2 px-4 rounded mt-6 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
    Try Again
  </a>
</div>

@endsection
