@extends('layouts.app')

@section('content')
<div class="">
    <div id='game'>

    </div>
    @viteReactRefresh

@vite(['resources/js/game/main.jsx'])
</div>

@endsection
