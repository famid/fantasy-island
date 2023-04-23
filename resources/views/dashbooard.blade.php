@extends('layouts.app')

@section('content')
<div class="">
    <div id='dashboard' data-authUser="{{Auth::user()}}" data-csrf_token="{{ csrf_token() }}">

    </div>
    @viteReactRefresh

@vite(['resources/js/dashboard/main.jsx'])
</div>

@endsection
