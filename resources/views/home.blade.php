@extends('layouts.app')

@section('content')
<div class="container">
    <div id='application'>

    </div>
    @viteReactRefresh

@vite(['resources/js/application/App.jsx'])
</div>
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="{{asset('assets/js/product.js')}}">

</script>
@endsection
