<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/languages', [TranslationController::class, 'languages']);
Route::post('/translate', [TranslationController::class, 'translate']);

// Product routes
Route::get('/products', [ProductController::class, 'index']);
Route::post('/products', [ProductController::class, 'store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Product Routes
Route::get('/products', [\App\Http\Controllers\API\ProductController::class, 'index']);
Route::post('/products', [\App\Http\Controllers\API\ProductController::class, 'store']);

// Translation Routes
Route::get('/languages', [\App\Http\Controllers\API\TranslationController::class, 'languages']);
Route::post('/translate', [\App\Http\Controllers\API\TranslationController::class, 'translate']);
