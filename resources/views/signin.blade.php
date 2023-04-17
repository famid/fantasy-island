@extends('layouts.app')

@section('content')
<div class="container h-screen mx-auto py-8 px-6">
  {{-- @dd(Auth::user())) --}}
  <div id='auth' data-page='signin' data-authUser="{{Auth::user()}}" data-csrf_token="{{ csrf_token() }}">
  </div>
</div>

 @viteReactRefresh
@vite(['resources/js/auth/App.jsx'])
@endsection

<script>



</script>