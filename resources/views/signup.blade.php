@extends('layouts.app')

@section('content')
<div class="container h-screen mx-auto py-8 px-6">
  <div class="max-w-md mx-auto h-full flex justify-center items-center flex-col  rounded-lg overflow-hidden">
      <header class='mb-8 text-2xl md:text-3xl font-semibold text-center'>
        <h1>Register To Buy Tickets And Have A Chance To Win Prizes!</h1>
      </header>
    <div class="py-4 px-6 bg-[#A5D7E8] rounded-lg md:w-[400px] w-[300px]">
      <h2 class="text-2xl font-bold mb-2">Register</h2>
      <form method="POST" >
        <div class="mb-4">
          <label for="name" class="block text-gray-700 font-bold mb-2">Name</label>
          <input type="text" name="name" id="name" class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " required>
        </div>
        <div class="mb-4">
          <label for="phone" class="block text-gray-700 font-bold mb-2">Phone Number</label>
          <input type="tel" name="phone" id="phone" class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " required>
        </div>
        <div class="mb-4">
          <button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none " id="send-otp">Send OTP</button>
        </div>
        <div class="mb-4">
          <label for="otp" class="block text-gray-700 font-bold mb-2">OTP</label>
          <input type="text" name="otp" id="otp" class=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none " required>
        </div>
        <div class="mb-4">
          <button  type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none ">Submit</button>
        </div>
      </form>
    </div>
  </div>
</div>
@endsection