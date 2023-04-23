@extends('layouts.app')


@section('content')
   <div id='order' class='overflow-auto'   data-authUser="{{Auth::user()}}" data-csrf_token="{{ csrf_token() }}">

   </div>
       @viteReactRefresh

@vite(['resources/js/order/App.jsx'])
@endsection

