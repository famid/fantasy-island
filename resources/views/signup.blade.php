@extends('layouts.app')

@section('content')
<div class="container h-screen mx-auto py-8 px-6">
  <div id='signup'>
  </div>
</div>

 @viteReactRefresh
@vite(['resources/js/auth/App.jsx'])
@endsection

<script>



</script>