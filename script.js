/* ========================================================
   NEURAL MESH — Portfolio Scripts
   Particle canvas, scroll animations, theme toggle, 
   project filters, stat counters
   ======================================================== */

(function () {
  'use strict';

  // ===== NEURAL PARTICLE CANVAS =====
  const canvas = document.getElementById('neural-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let mouse = { x: null, y: null };
  const PARTICLE_COUNT = 50;
  const CONNECTION_DISTANCE = 120;
  const MOUSE_RADIUS = 150;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function isDark() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 2 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          this.vx -= (dx / dist) * force * 0.02;
          this.vy -= (dy / dist) * force * 0.02;
        }
      }

      // Speed limit
      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > 1.5) {
        this.vx = (this.vx / speed) * 1.5;
        this.vy = (this.vy / speed) * 1.5;
      }
    }

    draw() {
      const alpha = isDark() ? 0.4 : 0.35;
      const color = isDark() ? `rgba(0, 212, 255, ${alpha})` : `rgba(2, 132, 199, ${alpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new Particle());
    }
  }

  function drawConnections() {
    const lineAlpha = isDark() ? 0.06 : 0.04;
    const lineColor = isDark() ? '0, 212, 255' : '2, 132, 199';
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DISTANCE) {
          const alpha = (1 - dist / CONNECTION_DISTANCE) * lineAlpha;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    drawConnections();
    requestAnimationFrame(animateCanvas);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  resizeCanvas();
  initParticles();
  animateCanvas();


  // ===== NAVIGATION =====
  const nav = document.getElementById('nav');
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const mobileLinks = document.querySelectorAll('.mobile-menu__links a');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);


  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = themeToggle.querySelector('i');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    const themeLabel = document.querySelector('.theme-label');
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
      if (themeLabel) themeLabel.textContent = 'Light';
    } else {
      themeIcon.className = 'fas fa-moon';
      if (themeLabel) themeLabel.textContent = 'Dark';
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  setTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });


  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ===== STAT COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat__number');

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        // Skip if no valid data-target
        if (!target || isNaN(target)) return;
        animateCounter(el, target);
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statObserver.observe(el));

  function animateCounter(el, target) {
    let current = 0;
    const step = target / 40;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      el.textContent = Math.floor(current);
    }, 30);
  }


  // ===== PROJECT FILTERS =====
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategories = card.getAttribute('data-category') || '';
        const matches = filter === 'all' || cardCategories.includes(filter);
        
        if (matches) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.4s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });


  // ===== SCROLL TO TOP =====
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ===== FADE-IN-UP ANIMATION (for project filter) =====
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);

})();
