<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo htmlspecialchars($pageTitle ?? 'Wanderlust Travel Agency'); ?></title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-logo">
                    <h1>🌍 Wanderlust</h1>
                </div>
                <ul class="nav-menu">
                    <li class="nav-item">
                        <a href="/" class="nav-link">Home</a>
                    </li>
                    <li class="nav-item">
                        <a href="/destinations" class="nav-link">Destinations</a>
                    </li>
                    <li class="nav-item">
                        <a href="/booking" class="nav-link">Book Now</a>
                    </li>
                    <li class="nav-item">
                        <a href="/contact" class="nav-link">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Discover Your Next Adventure</h1>
            <p>Explore amazing destinations around the world with our expertly curated travel packages</p>
            <a href="/destinations" class="cta-button">Explore Destinations</a>
        </div>
    </section>

    <!-- Featured Destinations -->
    <section class="featured-destinations">
        <div class="container">
            <h2>Featured Destinations</h2>
            <div class="destinations-grid">
                <?php if (!empty($featuredDestinations)): ?>
                    <?php foreach ($featuredDestinations as $destination): ?>
                        <div class="destination-card">
                            <div class="card-image">
                                <img src="<?php echo htmlspecialchars($destination['image']); ?>" 
                                     alt="<?php echo htmlspecialchars($destination['name']); ?>">
                            </div>
                            <div class="card-content">
                                <h3><?php echo htmlspecialchars($destination['name']); ?></h3>
                                <p><?php echo htmlspecialchars($destination['description']); ?></p>
                                <div class="card-footer">
                                    <span class="price"><?php echo htmlspecialchars($destination['price']); ?></span>
                                    <a href="/destinations/<?php echo $destination['id']; ?>" class="view-details">View Details</a>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <p>No featured destinations available at the moment.</p>
                <?php endif; ?>
            </div>
        </div>
    </section>

    <!-- About Section -->
    <section class="about">
        <div class="container">
            <div class="about-content">
                <h2>Why Choose Wanderlust?</h2>
                <div class="features-grid">
                    <div class="feature">
                        <h3>🗺️ Expert Planning</h3>
                        <p>Our travel experts craft personalized itineraries just for you</p>
                    </div>
                    <div class="feature">
                        <h3>💰 Best Prices</h3>
                        <p>We guarantee the best prices for all your travel needs</p>
                    </div>
                    <div class="feature">
                        <h3>🌟 24/7 Support</h3>
                        <p>Round-the-clock customer support throughout your journey</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>🌍 Wanderlust</h3>
                    <p>Your gateway to amazing adventures around the world</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/destinations">Destinations</a></li>
                        <li><a href="/booking">Book Now</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact Info</h4>
                    <p>📧 info@wanderlust.com</p>
                    <p>📞 +1 (555) 123-4567</p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; <?php echo date('Y'); ?> Wanderlust Travel Agency. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script src="/assets/js/script.js"></script>
</body>
</html>
