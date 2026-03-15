/* =============================================
   MAIN.JS — Inisialisasi & Scroll Animation
   Ngelowetan FC | sections/main.js
   ============================================= */

/**
 * Scroll Fade-In Animation
 * Mengamati semua elemen .fade-in dan memberi class .visible
 * saat masuk ke viewport, sehingga animasi CSS berjalan.
 */
function initScrollAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  // Tambahkan fade-in ke elemen-elemen static (bukan yang di-render JS)
  const staticElements = document.querySelectorAll(
    '.section-header, .stats-grid, .about-quote, .recent-achievements, .sponsor-cta'
  );

  staticElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Observe semua .fade-in (termasuk yang sudah di-render oleh masing-masing JS section)
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/**
 * DOMContentLoaded — Titik masuk utama
 * Memanggil semua fungsi render section dan inisialisasi lainnya.
 * Fungsi renderPlayers, renderAchievements, renderSponsors, initSponsorButton
 * didefinisikan di file JS masing-masing section (dimuat lebih dulu di index.html).
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Render dinamis per section
  renderPlayers();
  renderFilterButtons(); // harus setelah renderPlayers agar filter bisa langsung bekerja
  renderAchievements();
  renderSponsors();

  // 2. Interaksi tombol sponsor
  initSponsorButton();

  // 3. Aktifkan scroll animation (requestAnimationFrame agar DOM selesai di-render)
  requestAnimationFrame(() => {
    initScrollAnimation();
  });

  console.log('✅ Ngelowetan FC website loaded successfully!');
});
