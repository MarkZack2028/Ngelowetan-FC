/* =============================================
   SPONSORS.JS — Sponsors Section Logic
   Ngelowetan FC | sections/sponsors/sponsors.js
   ============================================= */

const sponsors = [
  { id: 1, name: 'Toko Dadi Mumbul', category: 'Main Sponsor' },
];

function renderSponsors() {
  const grid = document.getElementById('sponsors-grid');
  if (!grid) return;

  grid.innerHTML = sponsors.map(sponsor => `
    <div
      class="sponsor-card fade-in"
      id="sponsor-card-${sponsor.id}"
      role="img"
      aria-label="${sponsor.name} - ${sponsor.category}"
    >
      <div class="sponsor-card-inner">
        <div class="sponsor-default-view">
          <div class="sponsor-logo-placeholder">
            <span>${sponsor.name.charAt(0)}</span>
          </div>
          <h3 class="sponsor-name-gray">${sponsor.name}</h3>
        </div>
        <div class="sponsor-hover-view">
          <h3 class="sponsor-name-white">${sponsor.name}</h3>
          <p class="sponsor-category">${sponsor.category}</p>
        </div>
      </div>
      <div class="sponsor-border"></div>
    </div>
  `).join('');
}

function initSponsorButton() {
  const btn = document.getElementById('sponsor-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const pesan = encodeURIComponent(
      'Halo Tim Marketing Ngelowetan FC 👋\n\n' +
      'Saya tertarik untuk menjadi sponsor Ngelowetan FC.\n' +
      'Mohon informasi lebih lanjut mengenai paket sponsorship yang tersedia.\n\n' +
      'Terima kasih 🙏'
    );
    window.open(`https://wa.me/6285600618066?text=${pesan}`, '_blank', 'noopener,noreferrer');
  });
}
