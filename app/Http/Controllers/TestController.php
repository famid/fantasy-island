<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;

class TestController extends Controller {
    $testData = ['name' => "Anir", 'age' => 89];

    return response()->json($testData);
}
