# Modern Portfolio Website

A highly polished, responsive, and interactive single-page portfolio website with a minimalist yet professional design. Built with vanilla HTML, CSS, and JavaScript for optimal performance.

## 🌟 Features

### Design & Layout
- **Modern Aesthetic**: Clean design with neutral color palette and smooth gradients
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Fade-in effects, hover animations, and micro-interactions
- **Dark/Light Theme**: Toggle between themes with persistent user preference

### Sections
1. **Sticky Navigation**: Smooth-scrolling navigation with active link highlighting
2. **Hero Section**: Animated introduction with typing effect and background particles
3. **About Me**: Professional introduction with statistics and download CV button
4. **Skills**: Interactive skill cards with progress animations
5. **Projects**: Filterable project gallery with hover effects
6. **Contact**: Working contact form with validation and social links
7. **Footer**: Social media links and additional navigation

### Interactive Features
- **Mobile Navigation**: Hamburger menu with smooth animations
- **Project Filtering**: Filter projects by category (All, Web, Mobile, Design)
- **Contact Form**: Client-side validation with success/error messages
- **Scroll Animations**: Intersection Observer API for performance-optimized animations
- **Lazy Loading**: Images load only when needed
- **Custom Cursor**: Enhanced cursor effect on desktop (optional)
- **Loading Animation**: Smooth page loading experience

### Performance & Accessibility
- **Semantic HTML**: Proper HTML5 structure for SEO and accessibility
- **Keyboard Navigation**: Full keyboard support with proper focus management
- **Screen Reader Friendly**: ARIA labels and semantic markup
- **Optimized Assets**: Minimal JavaScript, CSS Grid/Flexbox layout
- **Reduced Motion Support**: Respects user preferences for animations

## 🚀 Quick Start

1. **Clone or Download** the project files
2. **Customize Content**:
   - Replace placeholder text with your information
   - Update project images and descriptions
   - Add your social media links
   - Replace placeholder images with your photos
3. **Deploy**: Upload to any web hosting service

## 📁 File Structure

```
portfolio-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # This file
```

## 🛠️ Customization Guide

### Colors & Theme
Edit CSS variables in `styles.css` (lines 8-25):
```css
:root {
  --hue: 230; /* Change for different color scheme */
  --first-color: hsl(var(--hue), 69%, 61%);
  /* ... other color variables */
}
```

### Personal Information
Update these sections in `index.html`:
- Navigation logo (line 21)
- Hero section content (lines 39-65)
- About section (lines 89-145)
- Skills (lines 151-295)
- Projects (lines 305-475)
- Contact information (lines 485-530)
- Footer (lines 600-635)

### Adding Projects
Each project card should have this structure:
```html
<div class="projects__card mix [category]">
    <img src="project-image.jpg" alt="Project Name" class="projects__img">
    <div class="projects__data">
        <h3 class="projects__title">Project Name</h3>
        <p class="projects__description">Project description</p>
        <div class="projects__tags">
            <span class="projects__tag">Technology</span>
        </div>
        <div class="projects__buttons">
            <a href="#" class="projects__link">
                <i class="fas fa-external-link-alt"></i> Demo
            </a>
            <a href="#" class="projects__link">
                <i class="fab fa-github"></i> Code
            </a>
        </div>
    </div>
</div>
```

### Social Media Links
Update social media URLs in:
- Contact section (lines 515-540)
- Footer section (lines 610-630)

## 🎨 Color Schemes

The website supports easy color customization. Here are some popular schemes:

**Blue (Default)**
```css
--hue: 230;
```

**Purple**
```css
--hue: 270;
```

**Green**
```css
--hue: 140;
```

**Orange**
```css
--hue: 25;
```

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance Tips

1. **Optimize Images**: Use WebP format when possible, compress images
2. **Minimize HTTP Requests**: The website uses CDNs for fonts and icons
3. **Enable Gzip**: Configure your server to compress files
4. **Use a CDN**: For faster global loading times

## 🔧 Advanced Features

### Contact Form Integration
To make the contact form functional, integrate with:
- [Formspree](https://formspree.io/)
- [Netlify Forms](https://docs.netlify.com/forms/setup/)
- [EmailJS](https://www.emailjs.com/)

### Analytics Integration
Add Google Analytics or similar:
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### SEO Optimization
- Update meta descriptions
- Add structured data (JSON-LD)
- Create a sitemap.xml
- Add robots.txt

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 💡 Tips for Customization

1. **Images**: Use high-quality images with consistent aspect ratios
2. **Content**: Keep descriptions concise and impactful
3. **Colors**: Maintain good contrast ratios for accessibility
4. **Performance**: Test on different devices and connection speeds
5. **SEO**: Update meta tags for better search engine visibility

## 🤝 Contributing

Feel free to fork this project and make improvements. Some areas for enhancement:
- Additional animation effects
- More project filter categories
- Blog integration
- Multi-language support

## 📞 Support

If you need help customizing this portfolio, feel free to:
- Open an issue on GitHub
- Check the browser console for any errors
- Refer to the comments in the code files

---

**Happy coding! 🚀**
