<?php
namespace TravelAgency\Controllers;

class HomeController {
    public function index($params = []) {
        $pageTitle = "Welcome to Wanderlust Travel Agency";
        $featuredDestinations = [
            [
                'id' => 1,
                'name' => 'Paris, France',
                'image' => '/assets/images/paris.jpg',
                'price' => '$899',
                'description' => 'Experience the city of love with our romantic getaway package'
            ],
            [
                'id' => 2,
                'name' => 'Tokyo, Japan',
                'image' => '/assets/images/tokyo.jpg',
                'price' => '$1299',
                'description' => 'Discover the perfect blend of tradition and modernity'
            ],
            [
                'id' => 3,
                'name' => 'Bali, Indonesia',
                'image' => '/assets/images/bali.jpg',
                'price' => '$699',
                'description' => 'Relax in paradise with beautiful beaches and temples'
            ]
        ];
        
        include '../templates/home.php';
    }
}
