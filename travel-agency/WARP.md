# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Environment Setup
```powershell
# Copy environment configuration
copy .env.example .env

# Install PHP dependencies (if using Composer)
composer install

# Create database
# Run this SQL command in MySQL: CREATE DATABASE travel_agency;
```

### Development Server
```powershell
# Start development server with PHP built-in server
php -S localhost:8000 -t public/

# Alternative: Start with Composer script
composer run start
```

### Testing
```powershell
# Run tests (PHPUnit configured but tests directory doesn't exist yet)
composer run test

# Run individual test file
phpunit tests/SomeTest.php
```

### Database Operations
```powershell
# Database tables are auto-created when first accessing the application
# To manually trigger database setup, access any page that uses the database
```

## Architecture Overview

### Core Structure
This is a custom PHP MVC-like application with the following key architectural components:

**Front Controller Pattern**: `public/index.php` serves as the single entry point, routing all requests through the custom Router class.

**Custom Router**: `src/Router.php` provides a simple routing system supporting:
- Static routes (`/`, `/destinations`)
- Dynamic routes with parameters (`/destinations/{id}`)
- HTTP method differentiation (GET, POST)

**Controller Pattern**: Controllers in `src/Controllers/` handle request logic and prepare data for templates.

**Template System**: Simple PHP templates in `templates/` directory (not using a template engine like Twig despite it being in composer.json).

### Key Components

**Bootstrap Process** (`src/bootstrap.php`):
- Custom PSR-4 autoloader for `TravelAgency\` namespace
- Basic environment variable loading from `.env` file
- Session initialization

**Database Layer** (`config/database.php`):
- Custom Database class with PDO wrapper
- Prepared statement support for security
- Transaction support
- Auto table creation and data seeding
- Environment-based configuration

**Routing System**:
- Route definitions in `public/index.php`
- Pattern matching for dynamic routes
- Controller-action binding

### Database Schema
The application uses MySQL with the following main tables:
- `destinations`: Travel packages with pricing and details
- `bookings`: Customer reservations
- `customers`: Customer information (future use)
- `reviews`: Customer reviews and ratings (future use)

### File Structure Patterns
- **Controllers**: `src/Controllers/` - Handle HTTP requests and business logic
- **Config**: `config/` - Database and application configuration
- **Templates**: `templates/` - PHP template files for views
- **Assets**: `assets/` - Static files (CSS, JS, images)
- **Public**: `public/` - Web-accessible directory with front controller

### Environment Configuration
Environment variables are loaded from `.env` file and accessed via `$_ENV` superglobal:
- Database connection settings (`DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS`)
- Application settings (`APP_ENV`, `APP_DEBUG`, `APP_URL`)
- Future integrations (email, payment gateway)

### Security Features
- PDO prepared statements for SQL injection prevention
- Environment-based configuration to avoid hardcoded secrets
- Custom autoloader prevents unauthorized file inclusion
- Input validation through controller methods

### Development Patterns
- PSR-4 namespace structure (`TravelAgency\`)
- Controller classes extend no base class but follow consistent patterns
- Database operations centralized in Database class
- Template inclusion via PHP require/include statements
