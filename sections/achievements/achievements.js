/* =============================================
   ACHIEVEMENTS.JS — Achievements Section Logic
   Ngelowetan FC | sections/achievements/achievements.js
   ============================================= */

const achievements = [
  { id: 1, title: 'Juara 1 Futsal Trofeo Liga Ramadhan 2026', count: 5, year: '2026', icon: '🏆' },
];

function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  if (!grid) return;

  grid.innerHTML = achievements.map(a => `
    <div class="achievement-card fade-in" id="achievement-card-${a.id}">
      <div class="achievement-icon">${a.icon}</div>
      <div class="achievement-count">${a.count}</div>
      <h3 class="achievement-title">${a.title}</h3>
      <p class="achievement-year">${a.year}</p>
    </div>
  `).join('');
}
