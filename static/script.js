// Mobile menu toggle
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth scroll for nav links
const links = document.querySelectorAll('.nav-links a');
for (const link of links) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
      navLinks.classList.remove('active');
    }
  });
}

// AOS.js initialization
AOS.init({
  duration: 900,
  once: true,
  easing: 'ease-in-out',
});

// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('.toggle-icon');
function setTheme(dark) {
  if (dark) {
    body.classList.add('dark');
    icon.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    icon.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
}
// Initial theme
setTheme(localStorage.getItem('theme') === 'dark');
themeToggle.addEventListener('click', () => {
  setTheme(!body.classList.contains('dark'));
});

// Scroll-down arrow smooth scroll
const scrollArrow = document.getElementById('scroll-arrow');
if (scrollArrow) {
  scrollArrow.addEventListener('click', () => {
    const nextSection = document.querySelector('main > section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Parallax effect for header background
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  const scrollY = window.scrollY;
  if (header) {
    header.style.backgroundPosition = `center ${scrollY * 0.2}px`;
  }
});

// Contact form: prevent default and show success message
