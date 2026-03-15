/* =============================================
   SQUAD.JS — Squad Section Logic (20 Pemain + Filter)
   Ngelowetan FC | sections/squad/squad.js
   ============================================= */

// ── Data Pemain ──────────────────────────────────────────────────
const players = [
  // KIPER
  { id: 1, name: 'Farid', position: 'Kiper', number: 1, photo: 'public/assetMinsoc/Farid.jpg' },
  { id: 2, name: 'Sokib', position: 'Kiper', number: 12, photo: 'public/assetMinsoc/Sokib.jpg' },
  { id: 3, name: 'NikoSD', position: 'Kiper', number: 26, photo: 'public/assetMinsoc/NikoSD.jpeg' },
  { id: 4, name: 'Bagas', position: 'Kiper', number: 21, photo: 'public/assetMinsoc/Bagas.jpg' },
  { id: 5, name: 'Tegar', position: 'Kiper', number: 22, photo: 'public/assetMinsoc/Tegar.jpg' },

  // ANCHOR
  { id: 6, name: 'David', position: 'Anchor', number: 2, photo: 'public/assetMinsoc/David.jpg' },
  { id: 7, name: 'Niko', position: 'Anchor', number: 3, photo: 'public/assetMinsoc/Niko.jpg' },
  { id: 8, name: 'Rito', position: 'Anchor', number: 27, photo: 'public/assetMinsoc/Rito.jpeg' },
  { id: 9, name: 'Faiz', position: 'Anchor', number: 4, photo: 'public/assetMinsoc/Faiz.jpg' },
  { id: 29, name: 'Kristianto', position: 'Pivot', number: 17, photo: 'public/assetMinsoc/Kristianto.jpg' },
  { id: 11, name: 'Ego', position: 'Anchor', number: 15, photo: 'public/assetMinsoc/Ego.jpg' },
  { id: 12, name: 'Jamal', position: 'Anchor', number: 28, photo: 'public/assetMinsoc/Jamal.jpeg' },
  { id: 14, name: 'Anam', position: 'Anchor', number: 23, photo: 'public/assetMinsoc/Anam.jpg' },
  { id: 13, name: 'Deka', position: 'Anchor', number: 18, photo: 'public/assetMinsoc/Deka.jpg' },

  // FLANK
  { id: 16, name: 'Ikmal', position: 'Flank', number: 5, photo: 'public/assetMinsoc/Ikmal.jpg' },
  { id: 15, name: 'Dimas', position: 'Flank', number: 25, photo: 'public/assetMinsoc/Dimas.jpeg' },
  { id: 17, name: 'Andre', position: 'Flank', number: 10, photo: 'public/assetMinsoc/Andre.jpg' },
  { id: 18, name: 'Daffa', position: 'Flank', number: 7, photo: 'public/assetMinsoc/Daffa.jpg' },
  { id: 19, name: 'Dakek', position: 'Flank', number: 8, photo: 'public/assetMinsoc/Dakek.jpg' },
  { id: 20, name: 'Faizal', position: 'Flank', number: 11, photo: 'public/assetMinsoc/Faizal.jpg' },
  { id: 21, name: 'Ipek', position: 'Flank', number: 14, photo: 'public/assetMinsoc/Ipek.jpg' },
  { id: 22, name: 'Chabib', position: 'Flank', number: 19, photo: 'public/assetMinsoc/Chabib.jpg' },
  { id: 24, name: 'Adrian', position: 'Flank', number: 20, photo: 'public/assetMinsoc/Adrian.jpg' },
  { id: 23, name: 'Mad Sampo', position: 'Flank', number: 29, photo: 'public/assetMinsoc/Mad Sampo.jpeg' },

  // PIVOT
  { id: 26, name: 'Ajik', position: 'Pivot', number: 9, photo: 'public/assetMinsoc/Ajik.jpg' },
  { id: 25, name: 'Bagus', position: 'Pivot', number: 24, photo: 'public/assetMinsoc/Bagus.jpeg' },
  { id: 27, name: 'Konate', position: 'Pivot', number: 13, photo: 'public/assetMinsoc/Konate.jpg' },
  { id: 28, name: 'Fahri', position: 'Pivot', number: 16, photo: 'public/assetMinsoc/Fahri.jpg' },
  { id: 10, name: 'Putra', position: 'Anchor', number: 6, photo: 'public/assetMinsoc/Putra.jpg' },
];

// ── Warna badge per posisi ───────────────────────────────────────
const positionColors = {
  Kiper: { bg: '#1d4ed8', label: '#93c5fd' }, // biru
  Anchor: { bg: '#15803d', label: '#86efac' }, // hijau
  Flank: { bg: '#7e22ce', label: '#d8b4fe' }, // ungu
  Pivot: { bg: '#b45309', label: '#fcd34d' }, // kuning
};

// ── Render Filter Buttons ────────────────────────────────────────
function renderFilterButtons() {
  const container = document.getElementById('squad-filter');
  if (!container) return;

  const positions = ['Semua', 'Kiper', 'Anchor', 'Flank', 'Pivot'];

  container.innerHTML = positions.map(pos => `
    <button
      class="filter-btn ${pos === 'Semua' ? 'filter-btn--active' : ''}"
      data-filter="${pos}"
      id="filter-btn-${pos.toLowerCase()}"
    >
      ${pos}
      <span class="filter-count">${pos === 'Semua'
      ? players.length
      : players.filter(p => p.position === pos).length
    }</span>
    </button>
  `).join('');

  // Event listener setiap tombol filter
  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');

      // Jalankan filter
      filterPlayers(btn.dataset.filter);
    });
  });
}

// ── Filter Pemain ────────────────────────────────────────────────
function filterPlayers(position) {
  const cards = document.querySelectorAll('.player-card');

  cards.forEach(card => {
    const cardPos = card.dataset.position;
    const match = position === 'Semua' || cardPos === position;

    if (match) {
      card.classList.remove('player-card--hidden');
      card.classList.add('player-card--visible');
    } else {
      card.classList.add('player-card--hidden');
      card.classList.remove('player-card--visible');
    }
  });
}

// ── Render Player Cards ──────────────────────────────────────────
function renderPlayers() {
  const grid = document.getElementById('players-grid');
  if (!grid) return;

  grid.innerHTML = players.map(player => {
    const colors = positionColors[player.position] || { bg: '#f97316', label: '#fed7aa' };
    return `
      <div
        class="player-card player-card--visible fade-in"
        id="player-card-${player.id}"
        data-position="${player.position}"
      >
        <div class="player-photo-wrap">
          <img
            src="${player.photo}"
            alt="${player.name}"
            class="player-photo"
            loading="lazy"
            onerror="this.src='public/placeholder-user.jpg'"
          />
          <!-- Badge Posisi -->
          <span class="player-badge" style="background:${colors.bg}; color:${colors.label};">
            ${player.position}
          </span>
        </div>

        <!-- Hover Overlay -->
        <div class="player-overlay">
          <div class="player-info">
            <p class="player-number-big">#${player.number}</p>
            <h3 class="player-name">${player.name}</h3>
            <p class="player-position" style="color:${colors.label};">${player.position}</p>
          </div>
        </div>

        <!-- Bottom Bar (always visible) -->
        <div class="player-bottom-bar">
          <span class="player-name-short">${player.name}</span>
          <span class="player-num-tag">#${player.number}</span>
        </div>

        <div class="player-border"></div>
      </div>
    `;
  }).join('');
}
