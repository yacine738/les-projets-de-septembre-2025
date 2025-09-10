<?php
// Database Configuration for Travel Agency

class Database {
    private $host;
    private $database;
    private $username;
    private $password;
    private $pdo;
    
    public function __construct() {
        // Load database configuration from environment variables
        $this->host = $_ENV['DB_HOST'] ?? 'localhost';
        $this->database = $_ENV['DB_NAME'] ?? 'travel_agency';
        $this->username = $_ENV['DB_USER'] ?? 'root';
        $this->password = $_ENV['DB_PASS'] ?? '';
    }
    
    public function connect() {
        if ($this->pdo === null) {
            try {
                $dsn = "mysql:host={$this->host};dbname={$this->database};charset=utf8mb4";
                $this->pdo = new PDO($dsn, $this->username, $this->password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false
                ]);
            } catch (PDOException $e) {
                throw new Exception("Database connection failed: " . $e->getMessage());
            }
        }
        
        return $this->pdo;
    }
    
    public function query($sql, $params = []) {
        $stmt = $this->connect()->prepare($sql);
        $stmt->execute($params);
        return $stmt;
    }
    
    public function fetch($sql, $params = []) {
        return $this->query($sql, $params)->fetch();
    }
    
    public function fetchAll($sql, $params = []) {
        return $this->query($sql, $params)->fetchAll();
    }
    
    public function lastInsertId() {
        return $this->connect()->lastInsertId();
    }
    
    public function beginTransaction() {
        return $this->connect()->beginTransaction();
    }
    
    public function commit() {
        return $this->connect()->commit();
    }
    
    public function rollback() {
        return $this->connect()->rollback();
    }
    
    public function createTables() {
        $sql = [
            // Destinations table
            "CREATE TABLE IF NOT EXISTS destinations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                country VARCHAR(100) NOT NULL,
                description TEXT,
                price DECIMAL(10,2) NOT NULL,
                image_url VARCHAR(500),
                duration_days INT DEFAULT 7,
                available_from DATE,
                available_to DATE,
                max_capacity INT DEFAULT 50,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",
            
            // Bookings table
            "CREATE TABLE IF NOT EXISTS bookings (
                id INT AUTO_INCREMENT PRIMARY KEY,
                destination_id INT NOT NULL,
                customer_name VARCHAR(255) NOT NULL,
                customer_email VARCHAR(255) NOT NULL,
                customer_phone VARCHAR(50),
                number_of_travelers INT NOT NULL DEFAULT 1,
                travel_date DATE NOT NULL,
                special_requests TEXT,
                total_amount DECIMAL(10,2) NOT NULL,
                booking_status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (destination_id) REFERENCES destinations(id)
            )",
            
            // Customers table (for future use)
            "CREATE TABLE IF NOT EXISTS customers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                first_name VARCHAR(100) NOT NULL,
                last_name VARCHAR(100) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                phone VARCHAR(50),
                address TEXT,
                city VARCHAR(100),
                country VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )",
            
            // Reviews table (for future use)
            "CREATE TABLE IF NOT EXISTS reviews (
                id INT AUTO_INCREMENT PRIMARY KEY,
                destination_id INT NOT NULL,
                customer_name VARCHAR(255) NOT NULL,
                customer_email VARCHAR(255) NOT NULL,
                rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
                review_text TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (destination_id) REFERENCES destinations(id)
            )"
        ];
        
        foreach ($sql as $query) {
            $this->query($query);
        }
    }
    
    public function seedData() {
        // Check if data already exists
        $existingDestinations = $this->fetchAll("SELECT COUNT(*) as count FROM destinations");
        if ($existingDestinations[0]['count'] > 0) {
            return; // Data already seeded
        }
        
        $destinations = [
            [
                'name' => 'Paris, France',
                'country' => 'France',
                'description' => 'Experience the city of love with our romantic getaway package. Visit the Eiffel Tower, Louvre Museum, and enjoy French cuisine.',
                'price' => 899.00,
                'image_url' => '/assets/images/paris.jpg',
                'duration_days' => 5,
                'available_from' => '2025-01-01',
                'available_to' => '2025-12-31',
                'max_capacity' => 30
            ],
            [
                'name' => 'Tokyo, Japan',
                'country' => 'Japan',
                'description' => 'Discover the perfect blend of tradition and modernity in Japan\'s capital city. Experience temples, technology, and amazing food.',
                'price' => 1299.00,
                'image_url' => '/assets/images/tokyo.jpg',
                'duration_days' => 7,
                'available_from' => '2025-01-01',
                'available_to' => '2025-12-31',
                'max_capacity' => 25
            ],
            [
                'name' => 'Bali, Indonesia',
                'country' => 'Indonesia',
                'description' => 'Relax in paradise with beautiful beaches, ancient temples, and vibrant culture. Perfect for both adventure and relaxation.',
                'price' => 699.00,
                'image_url' => '/assets/images/bali.jpg',
                'duration_days' => 6,
                'available_from' => '2025-01-01',
                'available_to' => '2025-12-31',
                'max_capacity' => 40
            ]
        ];
        
        foreach ($destinations as $destination) {
            $this->query(
                "INSERT INTO destinations (name, country, description, price, image_url, duration_days, available_from, available_to, max_capacity) 
                 VALUES (:name, :country, :description, :price, :image_url, :duration_days, :available_from, :available_to, :max_capacity)",
                $destination
            );
        }
    }
}
