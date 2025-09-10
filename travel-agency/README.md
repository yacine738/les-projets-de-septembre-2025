# 🌍 Wanderlust Travel Agency

A modern PHP-based travel agency website for booking trips and managing destinations. This project provides a clean, responsive interface for customers to explore and book travel packages.

## ✨ Features

- **Homepage**: Modern landing page with featured destinations
- **Destination Browsing**: Explore various travel destinations with detailed information
- **Booking System**: Simple booking form for travel packages
- **Responsive Design**: Mobile-friendly interface
- **Database Integration**: MySQL database for destinations and bookings
- **Clean Architecture**: Organized PHP code with MVC-like structure

## 🛠️ Technology Stack

- **Backend**: PHP 8.0+
- **Database**: MySQL
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Architecture**: Custom routing system with controller-based structure
- **Package Management**: Composer
- **Version Control**: Git

## 📁 Project Structure

```
travel-agency-php/
├── public/                 # Web-accessible directory
│   └── index.php          # Main entry point
├── src/                   # PHP source code
│   ├── bootstrap.php      # Application bootstrap
│   ├── Router.php         # URL routing system
│   └── Controllers/       # Controller classes
│       └── HomeController.php
├── config/                # Configuration files
│   └── database.php       # Database configuration and setup
├── templates/             # HTML templates
│   └── home.php          # Homepage template
├── assets/                # Static assets
│   ├── css/
│   │   └── style.css     # Main stylesheet
│   ├── js/
│   │   └── script.js     # JavaScript functionality
│   └── images/           # Image assets
├── composer.json          # PHP dependencies
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
└── README.md             # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- PHP 8.0 or higher
- MySQL 5.7 or higher
- Web server (Apache/Nginx) or PHP built-in server
- Composer (optional, for dependency management)

### Installation

1. **Clone the repository** (if applicable):
   ```bash
   git clone <repository-url>
   cd travel-agency-php
   ```

2. **Set up environment variables**:
   ```bash
   copy .env.example .env
   ```
   
   Edit `.env` file with your database credentials:
   ```env
   DB_HOST=localhost
   DB_NAME=travel_agency
   DB_USER=your_username
   DB_PASS=your_password
   ```

3. **Create the database**:
   ```sql
   CREATE DATABASE travel_agency;
   ```

4. **Set up the database tables**:
   The application will automatically create tables when first accessed. You can also manually run the database setup by including the database configuration file.

5. **Start the development server**:
   ```bash
   php -S localhost:8000 -t public/
   ```

6. **Access the application**:
   Open your browser and go to `http://localhost:8000`

### Using Composer (Optional)

If you want to use Composer for dependency management:

1. **Install dependencies**:
   ```bash
   composer install
   ```

2. **Start with Composer script**:
   ```bash
   composer run start
   ```

## 📊 Database Schema

The application uses the following main tables:

- **destinations**: Travel destinations with pricing and details
- **bookings**: Customer bookings and reservations
- **customers**: Customer information (for future expansion)
- **reviews**: Customer reviews and ratings (for future expansion)

## 🎯 Usage

### Homepage
Visit the homepage to see:
- Hero section with call-to-action
- Featured destinations grid
- Company information and features

### Booking Process
1. Browse available destinations
2. Select a destination
3. Fill out booking form
4. Submit reservation

### Administration
Future versions will include:
- Admin panel for managing destinations
- Booking management system
- Customer management
- Analytics dashboard

## 🔧 Configuration

### Environment Variables

Key configuration options in `.env`:

- `DB_HOST`: Database host (default: localhost)
- `DB_NAME`: Database name (default: travel_agency)
- `DB_USER`: Database username
- `DB_PASS`: Database password
- `APP_ENV`: Application environment (development/production)
- `APP_DEBUG`: Enable debug mode (true/false)

### Customization

- **Styling**: Modify `assets/css/style.css` for custom styling
- **Content**: Update `templates/home.php` for homepage content
- **Destinations**: Add destinations through the database
- **Features**: Extend controllers for additional functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Guidelines

- Follow PSR-4 autoloading standards
- Use meaningful variable and function names
- Comment your code appropriately
- Keep security in mind (SQL injection prevention, XSS protection)
- Test your changes before submitting

## 🔒 Security Considerations

- All database queries use prepared statements
- User input is properly sanitized and validated
- Environment variables are used for sensitive configuration
- Session management is implemented for user state

## 🚧 Future Enhancements

- [ ] User authentication and registration
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Advanced search and filtering
- [ ] Multi-language support
- [ ] API endpoints for mobile app
- [ ] Image upload for destinations
- [ ] Booking calendar integration
- [ ] Customer reviews and ratings

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact: info@wanderlust.com
- Phone: +1 (555) 123-4567

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Modern CSS Grid and Flexbox for responsive design
- PHP community for excellent documentation
- Travel industry inspiration for features and design

---

**Happy Travels!** ✈️ 🏝️ 🗺️
