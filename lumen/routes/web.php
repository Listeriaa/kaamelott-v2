<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->post(
    'quote',
    [
        'as' => 'quote-add',
        'uses' => 'QuoteController@add'
    ]
);

$router->get(
    'quote/{id}',
    [
        'as' => 'quote-load',
        'uses' => 'QuoteController@load'
    ]
);

$router->get(
    'quote/random',
    [
        'as' => 'quote-getRandomQuote',
        'uses' => 'QuoteController@getRandomQuote'
    ]
);

