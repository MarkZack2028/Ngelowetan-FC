/* =============================================
   SQUAD.JS — Squad Section Logic (20 Pemain + Filter)
   Ngelowetan FC | sections/squad/squad.js
   ============================================= */

// ── Data Pemain ──────────────────────────────────────────────────
const players = [
  // KIPER
  {
    id: 27,
    name: "Bagas",
    position: "Kiper",
    number: 27,
    photo: "public/AssetSquad/Bagas.jpeg",
  },
  {
    id: 1,
    name: "Sokib",
    position: "Kiper",
    number: 1,
    photo: "public/AssetSquad/Sokib.jpeg",
  },
  {
    id: 32,
    name: "Niko",
    position: "Kiper",
    number: 32,
    photo: "public/AssetSquad/NikoSD.jpeg",
  },
  {
    id: 17,
    name: "Farid",
    position: "Kiper",
    number: 17,
    photo: "public/AssetSquad/ulo.jpeg",
  },
  {
    id: 22,
    name: "Tegar",
    position: "Kiper",
    number: 22,
    photo: "public/AssetSquad/Tegar.jpeg",
  },

  // BERTAHAN
  {
    id: 31,
    name: "David",
    position: "Bertahan",
    number: 31,
    photo: "public/AssetSquad/David.jpeg",
  },
  {
    id: 28,
    name: "Niko",
    position: "Bertahan",
    number: 28,
    photo: "public/AssetSquad/Niko.jpeg",
  },
  {
    id: 6,
    name: "Rito",
    position: "Bertahan",
    number: 6,
    photo: "public/AssetSquad/Rito.jpeg",
  },
  {
    id: 47,
    name: "Faiz",
    position: "Penyerang",
    number: 47,
    photo: "public/AssetSquad/Faiz.jpeg",
  },
  {
    id: 33,
    name: "Ananda",
    position: "Penyerang",
    number: 33,
    photo: "public/AssetSquad/Konate.jpeg",
  },
  {
    id: 2,
    name: "Ego",
    position: "Bertahan",
    number: 2,
    photo: "public/AssetSquad/Ego.jpeg",
  },
  {
    id: 44,
    name: "Jamal",
    position: "Bertahan",
    number: 44,
    photo: "public/AssetSquad/Jamal.jpeg",
  },
  {
    id: 19,
    name: "Anam",
    position: "Bertahan",
    number: 19,
    photo: "public/AssetSquad/Anam.jpeg",
  },
  {
    id: 15,
    name: "Ajik",
    position: "Penyerang",
    number: 15,
    photo: "public/AssetSquad/Ajik.jpeg",
  },

  // TENGAH
  {
    id: 7,
    name: "Ikmal",
    position: "Penyerang",
    number: 7,
    photo: "public/AssetSquad/ikmall.jpeg",
  },
  {
    id: 12,
    name: "Dimas",
    position: "Penyerang",
    number: 12,
    photo: "public/AssetSquad/Dimas.jpeg",
  },
  {
    id: 24,
    name: "Daffa",
    position: "Tengah",
    number: 24,
    photo: "public/AssetSquad/Daffa.jpeg",
  },
  {
    id: 99,
    name: "Andre",
    position: "Penyerang",
    number: 99,
    photo: "public/AssetSquad/Andre.jpeg",
  },
  {
    id: 16,
    name: "Faisal",
    position: "Tengah",
    number: 16,
    photo: "public/AssetSquad/Faizal.jpeg",
  },
  {
    id: 25,
    name: "Dakek",
    position: "Penyerang",
    number: 25,
    photo: "public/AssetSquad/Dakek.jpeg",
  },
  {
    id: 76,
    name: "Ipek",
    position: "Tengah",
    number: 76,
    photo: "public/AssetSquad/Ipek.jpeg",
  },
  {
    id: 20,
    name: "Khabib",
    position: "Penyerang",
    number: 20,
    photo: "public/AssetSquad/Chabib.jpeg",
  },
  {
    id: 36,
    name: "Adrian",
    position: "Tengah",
    number: 36,
    photo: "public/AssetSquad/Adrian.jpeg",
  },
  {
    id: 3,
    name: "Mad",
    position: "Bertahan",
    number: 3,
    photo: "public/AssetSquad/Mad Sampo.jpeg",
  },

  // PENYERANG
  {
    id: 8,
    name: "Gustian",
    position: "Tengah",
    number: 8,
    photo: "public/AssetSquad/Tian.jpeg",
  },
  {
    id: 18,
    name: "Bagus",
    position: "Tengah",
    number: 18,
    photo: "public/AssetSquad/Bagus.jpeg",
  },
  {
    id: 9,
    name: "Kristianto",
    position: "Bertahan",
    number: 9,
    photo: "public/AssetSquad/Kristianto.jpeg",
  },
  {
    id: 30,
    name: "Fahri",
    position: "Penyerang",
    number: 30,
    photo: "public/AssetSquad/Fahri.jpeg",
  },
  {
    id: 34,
    name: "Nugraha",
    position: "Bertahan",
    number: 34,
    photo: "public/AssetSquad/Putra.jpeg",
  },
  {
    id: 11,
    name: "Deka",
    position: "Tengah",
    number: 11,
    photo: "public/AssetSquad/Deka.jpeg",
  },
  {
    id: 55,
    name: "Habibi",
    position: "Penyerang",
    number: 55,
    photo: "public/AssetSquad/hbb.jpeg",
  },
  {
    id: 14,
    name: "Anjis",
    position: "Bertahan",
    number: 14,
    photo: "public/AssetSquad/anjs.jpeg",
  },
  {
    id: 29,
    name: "Ranu",
    position: "Tengah",
    number: 29,
    photo: "public/AssetSquad/Ranu.jpeg",
  },
];

// ── Warna badge per posisi ───────────────────────────────────────
const positionColors = {
  Kiper: { bg: "#1d4ed8", label: "#93c5fd" }, // biru
  Bertahan: { bg: "#15803d", label: "#86efac" }, // hijau
  Tengah: { bg: "#7e22ce", label: "#d8b4fe" }, // ungu
  Penyerang: { bg: "#b45309", label: "#fcd34d" }, // kuning
};

// ── Render Filter Buttons ────────────────────────────────────────
function renderFilterButtons() {
  const container = document.getElementById("squad-filter");
  if (!container) return;

  const positions = ["Semua", "Kiper", "Bertahan", "Tengah", "Penyerang"];

  container.innerHTML = positions
    .map(
      (pos) => `
    <button
      class="filter-btn ${pos === "Semua" ? "filter-btn--active" : ""}"
      data-filter="${pos}"
      id="filter-btn-${pos.toLowerCase()}"
    >
      ${pos}
      <span class="filter-count">${
        pos === "Semua"
          ? players.length
          : players.filter((p) => p.position === pos).length
      }</span>
    </button>
  `,
    )
    .join("");

  // Event listener setiap tombol filter
  container.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      container
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");

      // Jalankan filter
      filterPlayers(btn.dataset.filter);
    });
  });
}

// ── Filter Pemain ────────────────────────────────────────────────
function filterPlayers(position) {
  const cards = document.querySelectorAll(".player-card");

  cards.forEach((card) => {
    const cardPos = card.dataset.position;
    const match = position === "Semua" || cardPos === position;

    if (match) {
      card.classList.remove("player-card--hidden");
      card.classList.add("player-card--visible");
    } else {
      card.classList.add("player-card--hidden");
      card.classList.remove("player-card--visible");
    }
  });
}

// ── Render Player Cards ──────────────────────────────────────────
function renderPlayers() {
  const grid = document.getElementById("players-grid");
  if (!grid) return;

  grid.innerHTML = players
    .map((player) => {
      const colors = positionColors[player.position] || {
        bg: "#f97316",
        label: "#fed7aa",
      };
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
    })
    .join("");
}
