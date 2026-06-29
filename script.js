// Theme toggle logic with saved preference.
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const savedTheme = localStorage.getItem('lunalace-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  themeIcon.className = 'fa-solid fa-sun';
} else {
  document.body.classList.remove('dark');
  themeIcon.className = 'fa-solid fa-moon';
}

themeToggle?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('lunalace-theme', isDark ? 'dark' : 'light');
  themeIcon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
});

// Mobile navigation menu.
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-nav');

navToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

mainNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Smooth reveal animations for sections.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

// Back to top button visibility.
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 420);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Newsletter submission feedback.
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmail = document.getElementById('newsletterEmail');

newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = newsletterEmail.value.trim();

  if (email) {
    newsletterForm.innerHTML = '<p class="newsletter-success">Thanks for subscribing! We will send updates to ' + email + '.</p>';
  }
});

// Footer year.
document.getElementById('year').textContent = new Date().getFullYear();

// Simple add-to-cart feedback.
const addButtons = document.querySelectorAll('.add-to-cart');
addButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const previousText = button.textContent;
    button.textContent = 'Added';
    button.disabled = true;

    setTimeout(() => {
      button.textContent = previousText;
      button.disabled = false;
    }, 1200);
  });
});
