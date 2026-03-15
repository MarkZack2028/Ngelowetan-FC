/* =============================================
   NAVBAR.JS — Navigation Bar Logic
   Ngelowetan FC | sections/navbar/navbar.js
   ============================================= */

(function () {
  'use strict';

  // ── Konfigurasi link navigasi ──────────────────────────────────
  const NAV_LINKS = [
    { label: 'Beranda',     href: '#hero'         },
    { label: 'Tentang',     href: '#about'        },
    { label: 'Pemain',      href: '#squad'        },
    { label: 'Pencapaian',  href: '#achievements' },
    { label: 'Sponsor',     href: '#sponsors'     },
  ];

  // ── Render HTML Navbar ─────────────────────────────────────────
  function createNavbar() {
    const desktopLinks = NAV_LINKS.map(link => `
      <li class="navbar__link" data-section="${link.href.slice(1)}">
        <a href="${link.href}">${link.label}</a>
      </li>
    `).join('');

    const mobileLinks = NAV_LINKS.map(link => `
      <div class="navbar__mobile-link" data-section="${link.href.slice(1)}">
        <a href="${link.href}">${link.label}</a>
      </div>
    `).join('');

    const navbar = document.createElement('nav');
    navbar.id        = 'main-navbar';
    navbar.className = 'navbar navbar--top';
    navbar.setAttribute('role', 'navigation');
    navbar.setAttribute('aria-label', 'Navigasi utama');

    navbar.innerHTML = `
      <div class="navbar__inner">

        <!-- Brand / Logo -->
        <a href="#hero" class="navbar__brand" aria-label="Ngelowetan FC - Ke atas">
          <img
            src="public/Logo/LogoNgelowetan.jpg"
            alt="Ngelowetan FC"
            class="navbar__brand-logo"
          />
        </a>

        <!-- Desktop Links -->
        <ul class="navbar__links" role="list">
          ${desktopLinks}
        </ul>

        <!-- Desktop CTA -->
        <div class="navbar__cta">
          <a href="#sponsors" class="navbar__cta-btn">Jadi Sponsor</a>
        </div>

        <!-- Hamburger Button (Mobile) -->
        <button
          class="navbar__hamburger"
          id="navbar-hamburger"
          aria-label="Buka menu navigasi"
          aria-expanded="false"
          aria-controls="navbar-mobile"
        >
          <span class="navbar__hamburger-line"></span>
          <span class="navbar__hamburger-line"></span>
          <span class="navbar__hamburger-line"></span>
        </button>
      </div>

      <!-- Mobile Fullscreen Menu -->
      <div
        class="navbar__mobile"
        id="navbar-mobile"
        role="dialog"
        aria-label="Menu navigasi mobile"
        aria-hidden="true"
      >
        ${mobileLinks}
        <div class="navbar__mobile-cta">
          <a href="#sponsors">Jadi Sponsor</a>
        </div>
      </div>
    `;

    return navbar;
  }

  // ── Scroll Effect (transparan → solid) ────────────────────────
  function initScrollEffect(navbar) {
    const SCROLL_THRESHOLD = 60;

    function onScroll() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.remove('navbar--top');
        navbar.classList.add('navbar--scrolled');
      } else {
        navbar.classList.remove('navbar--scrolled');
        navbar.classList.add('navbar--top');
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // jalankan sekali saat load
  }

  // ── Active Link berdasarkan section yang terlihat ──────────────
  function initActiveLink() {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          const id = entry.target.id;

          // Update desktop links
          document.querySelectorAll('.navbar__link').forEach(el => {
            el.classList.toggle('active', el.dataset.section === id);
          });

          // Update mobile links
          document.querySelectorAll('.navbar__mobile-link').forEach(el => {
            el.classList.toggle('active', el.dataset.section === id);
          });
        });
      },
      {
        // Section dianggap "aktif" saat masuk 40% area tengah layar
        rootMargin: '-10% 0px -55% 0px',
        threshold: 0,
      }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // ── Hamburger Menu Toggle ──────────────────────────────────────
  function initHamburger() {
    const hamburger  = document.getElementById('navbar-hamburger');
    const mobileMenu = document.getElementById('navbar-mobile');
    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      hamburger.classList.add('is-open');
      mobileMenu.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-label', 'Tutup menu navigasi');
      document.body.style.overflow = 'hidden'; // cegah scroll body
    }

    function closeMenu() {
      hamburger.classList.remove('is-open');
      mobileMenu.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-label', 'Buka menu navigasi');
      document.body.style.overflow = '';
    }

    // Toggle saat klik hamburger
    hamburger.addEventListener('click', () => {
      if (hamburger.classList.contains('is-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Tutup menu saat link mobile diklik
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Tutup menu saat tekan Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
        closeMenu();
        hamburger.focus();
      }
    });
  }

  // ── Smooth Scroll untuk semua anchor link navbar ───────────────
  function initSmoothScroll(navbar) {
    navbar.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href').slice(1);
        const target   = document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  // ── Init ───────────────────────────────────────────────────────
  function init() {
    const navbar = createNavbar();

    // Sisipkan navbar sebagai elemen pertama di <body>
    document.body.insertBefore(navbar, document.body.firstChild);

    initScrollEffect(navbar);
    initActiveLink();
    initHamburger();
    initSmoothScroll(navbar);
  }

  // Jalankan setelah DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
