<?php
require_once '../src/bootstrap.php';

use TravelAgency\Router;
use TravelAgency\Controllers\HomeController;
use TravelAgency\Controllers\DestinationController;
use TravelAgency\Controllers\BookingController;

// Initialize router
$router = new Router();

// Define routes
$router->get('/', [HomeController::class, 'index']);
$router->get('/destinations', [DestinationController::class, 'index']);
$router->get('/destinations/{id}', [DestinationController::class, 'show']);
$router->get('/booking', [BookingController::class, 'index']);
$router->post('/booking', [BookingController::class, 'store']);

// Get the current URL
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$method = $_SERVER['REQUEST_METHOD'];

try {
    // Route the request
    $router->dispatch($method, $uri);
} catch (Exception $e) {
    http_response_code(500);
    echo "An error occurred: " . $e->getMessage();
}
