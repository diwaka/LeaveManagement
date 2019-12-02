<?php

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

$router->get('/', function () use ($router) {
    return $router->app->version();
});
$router->group(['prefix' => 'Holiday'], function () use ($router) {
     $router->get('GetHolidays[/{data}]','HolidayController@GetHolidays');
     $router->post('Store','HolidayController@Store');
     $router->put('Update/{id}','HolidayController@Update');
});
$router->group(['prefix' => 'Event'], function () use ($router) {
    $router->get('GetEvents[/{data}]','EventController@GetEvents');
    $router->post('Store','EventController@Store');
    $router->put('Update/{id}','EventController@Update');
});