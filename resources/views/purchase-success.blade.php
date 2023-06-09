@extends('layouts.app')

@section('content')
    <div  class="container h-screen w-screen mx-auto bg-transparent py-8 px-6">
        <div class="max-w-xl mx-auto h-full flex justify-center items-center flex-col  rounded-lg overflow-hidden">
            <div class="py-4  bg-[#A5D7E8] rounded-lg px-3">
                <div class="w-full mx-auto  flex justify-center items-center flex-col ">
                    <img class='object-cover'
                        src="https://besnik-space.fra1.cdn.digitaloceanspaces.com/random/GAPunnR2bGbYNrqiSMdz1666970861.png"
                        alt="">
                    <h2 class="font-bold md:text-2xl text-xl  text-[#191919] mt-3 pb-2">Congratulations on your purchase. 👋
                    </h2>
                    <p class="font-medium  text-center text-[14px] leading-[22px] text-[#808191] my-4">Congratulations, you
                        just bought your tickets. We're so excited to have you as a customer, and we look forward to
                        serving you in Fantasy Island</p>
                    <div class='flex gap-3 justify-center w-full px-3 items-center md:px-14 mt-3 md:flex-row flex-col'>
                        <a href="/game"
                            class="rounded-full  border border-white text-white px-5 py-2.5  text-center font-medium bg-[#E94E77] hover:bg-[#C15B8A]">
                            Solve Puzzle
                        </a>
                        <div id='download-ticket' data-authUser="{{ Auth::user() }}" data-csrf_token="{{ csrf_token() }}">
                        </div>
                    </div>
                </div>
            </div>

        </div>
        @viteReactRefresh

        @vite(['resources/js/download-ticket/main.jsx'])
    </div>
@endsection



