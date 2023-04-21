@extends('layouts.app')

@section('content')
        <div class='' id="participants"  data-authUser="{{Auth::user()}}" data-csrf_token="{{ csrf_token() }}">

        </div>
        @viteReactRefresh

        @vite(['resources/js/participants/main.jsx'])
    </div>
@endsection



