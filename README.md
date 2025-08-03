# LANDING PAGE
# Tendr - Event Management Platform

A modern React application for Tendr, a professional event management platform. This project has been converted from a static HTML landing page to a dynamic React application with enhanced functionality and modern development practices.

## 🚀 Features

- **Modern React Architecture**: Built with React 18 and functional components
- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**: Enhanced user interactions with JavaScript functionality
- **Modular Structure**: Organized component-based architecture
- **Beautiful UI**: Maintains the original elegant design with improved interactions
- **Performance Optimized**: Efficient rendering and smooth animations

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.js   # Navigation bar with scroll effects
│   ├── Hero.js         # Hero section with CTA
│   ├── Services.js     # Services showcase
│   ├── CorporateBooking.js # Corporate events section
│   ├── Events.js       # Events gallery
│   ├── Partner.js      # Partner registration
│   ├── Footer.js       # Footer with links and social media
│   └── *.css          # Component-specific styles
├── App.js              # Main application component
├── App.css             # Global application styles
├── index.js            # React entry point
└── index.css           # Global styles and utilities
```

## 🛠️ Technologies Used

- **React 18.2.0**: Modern React with hooks
- **JavaScript ES6+**: Modern JavaScript features
- **CSS3**: Advanced styling with gradients and animations
- **HTML5**: Semantic markup
- **Responsive Design**: Mobile-first approach

## 🎨 Design Features

- **Color Scheme**: Warm brown and cream tones (#8B4513, #CD853F, #DEB887)
- **Typography**: Outfit font family for modern readability
- **Animations**: Smooth hover effects and transitions
- **Gradients**: Beautiful gradient backgrounds and buttons
- **Glass Morphism**: Modern backdrop blur effects

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

## 📱 Components Overview

### Navigation
- Fixed navigation bar with scroll effects
- Logo with hover animations
- Sign in/Sign up buttons with gradient effects

### Hero Section
- Full-screen hero with background image
- Animated call-to-action button
- Gradient text effects

### Services
- Interactive service cards
- Hover animations and click handlers
- Responsive grid layout

### Corporate Booking
- Feature highlights with icons
- Interactive booking button
- Split layout with image

### Events Gallery
- Event showcase with overlay effects
- Click handlers for event selection
- Responsive image grid

### Partner Section
- Call-to-action for partner registration
- Background parallax effect
- Animated button with arrow

### Footer
- Organized link sections
- Social media icons with hover effects
- Responsive grid layout

## 🎯 Key Features

### Interactive Elements
- **Click Handlers**: All buttons and links have JavaScript functionality
- **Hover Effects**: Smooth animations on user interaction
- **Scroll Effects**: Navigation changes on scroll
- **Responsive Design**: Adapts to all screen sizes

### Performance Optimizations
- **Component-based Architecture**: Reusable and maintainable code
- **CSS-in-JS**: Scoped styles for each component
- **Optimized Images**: Responsive image handling
- **Smooth Animations**: Hardware-accelerated transitions

## 🔧 Customization

### Adding New Services
Edit `src/components/Services.js`:
```javascript
const services = [
  {
    id: 5,
    title: 'New Service',
    image: 'path/to/image.jpg'
  }
];
```

### Modifying Colors
Update CSS variables in component files:
```css
:root {
  --primary-color: #CD853F;
  --secondary-color: #DEB887;
  --accent-color: #8B4513;
}
```

### Adding New Events
Edit `src/components/Events.js`:
```javascript
const events = [
  {
    id: 6,
    title: 'New Event',
    image: 'path/to/image.jpg'
  }
];
```

## 📄 License

This project is part of the Tendr event management platform. All rights reserved.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions about this React application, please contact the development team.

---

**Built with ❤️ using React and modern web technologies** 
