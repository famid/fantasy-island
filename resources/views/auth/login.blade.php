@extends('layouts.app')

@section('content')
<div class="container mx-auto">
  <div class="flex justify-center px-4">
    <div class="w-full max-w-md mt-8">
      <div class="bg-white rounded-lg border border-gray-300 shadow-xl">
        <div class="p-4 border-b">
          <h2 class="text-xl font-semibold text-gray-600">{{ __('Login') }}</h2>
        </div>
        <div class="p-4">
          <form method="POST" action="{{ url('/admin/login') }}">
            @csrf
            <div class="mb-4">
              <label for="email" class="block mb-2 font-semibold text-gray-600">{{ __('Email Address') }}</label>
              <input id="email" type="email" class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 @error('email') border-red-500 @enderror" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
              @error('email')
                <span class="text-sm text-red-500 mt-1">{{ $message }}</span>
              @enderror
            </div>
            <div class="mb-4">
              <label for="password" class="block mb-2 font-semibold text-gray-600">{{ __('Password') }}</label>
              <input id="password" type="password" class="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500 @error('password') border-red-500 @enderror" name="password" required autocomplete="current-password">
              @error('password')
                <span class="text-sm text-red-500 mt-1">{{ $message }}</span>
              @enderror
            </div>
            <div class="mb-4 flex items-center">
              <input class="mr-2 leading-tight" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>
              <label for="remember" class="font-semibold text-gray-600">{{ __('Remember Me') }}</label>
            </div>
            <div class="mb-4 flex justify-end">
              <a class="text-sm text-gray-600 hover:text-blue-500" href="{{ route('password.request') }}">
                {{ __('Forgot Your Password?') }}
              </a>
            </div>
            <div class="mb-4">
              <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                {{ __('Login') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection
