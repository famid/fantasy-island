@extends('layouts.app')

@section('content')
<div class="">
    <div id='game' data-authUser="{{Auth::user()}}" data-csrf_token="{{ csrf_token() }}">

    </div>
    @viteReactRefresh

@vite(['resources/js/game/main.jsx'])
</div>

@endsection
