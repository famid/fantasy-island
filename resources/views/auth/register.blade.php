@extends('layouts.app')

@section('content')
<div class="container mx-auto">
  <div class="flex justify-center">
    <div class="w-full md:w-2/3 lg:w-1/2">
      <div class="bg-white rounded-lg shadow-lg">
        <div class="p-6">
          <h2 class="text-2xl font-semibold mb-6">{{ __('Register') }}</h2>

          <form method="POST" action="{{ route('register') }}">
            @csrf

            <div class="mb-4">
              <label for="name" class="block text-gray-700">{{ __('Name') }}</label>

              <input id="name" type="text" class="form-input mt-1 block w-full @error('name') border-red-500 @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

              @error('name')
                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
              @enderror
            </div>

            <div class="mb-4">
              <label for="email" class="block text-gray-700">{{ __('Email Address') }}</label>

              <input id="email" type="email" class="form-input mt-1 block w-full @error('email') border-red-500 @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

              @error('email')
                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
              @enderror
            </div>

            <div class="mb-4">
              <label for="password" class="block text-gray-700">{{ __('Password') }}</label>

              <input id="password" type="password" class="form-input mt-1 block w-full @error('password') border-red-500 @enderror" name="password" required autocomplete="new-password">

              @error('password')
                <p class="text-red-500 text-xs mt-1">{{ $message }}</p>
              @enderror
            </div>

            <div class="mb-6">
              <label for="password-confirm" class="block text-gray-700">{{ __('Confirm Password') }}</label>

              <input id="password-confirm" type="password" class="form-input mt-1 block w-full" name="password_confirmation" required autocomplete="new-password">
            </div>

            <div class="flex items-center justify-between">
              <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {{ __('Register') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
