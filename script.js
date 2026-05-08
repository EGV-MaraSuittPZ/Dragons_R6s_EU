// ==========================================
//  DATOS — cargados desde archivos externos
//  · matches-data.js      → matchesData
//  · roster-data.js       → rosterData
//  · achievements-data.js → achievementsStats / achievementsList / achievementsEmpty
//  · sponsors-data.js     → sponsorsData
//  · mvp-data.js          → mvpData
// ==========================================

// ── Helpers ───────────────────────────────────────────
function getInitials(name) {
  if (!name) return "?";
  const parts = name.split(/[-_\s]/);
  return parts.length >= 2
    ? (parts[0][0] + (parts[1][0] || "")).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

function buildCard(p, index, extraClass) {
  extraClass = extraClass || "";
  const initials = getInitials(p.name);
  const num = String(index + 1).padStart(2, "0");
  return `
    <div class="mw-player-card ${extraClass} reveal">
      ${p.position ? `<span class="mw-badge">${p.position}</span>` : ""}
      <span class="mw-num">${num}</span>
      <div class="mw-avatar">
        ${p.photo
          ? `<img src="${p.photo}" alt="${p.name}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
             <div class="mw-avatar-bg" style="display:none"><div class="mw-glow"></div><span class="mw-initial">${initials}</span></div>`
          : `<div class="mw-avatar-bg"><div class="mw-glow"></div><span class="mw-initial">${initials}</span></div>`
        }
      </div>
      <div class="mw-info">
        <div class="mw-name">${p.name || "TBD"}</div>
        ${p.position ? `<div class="mw-pos">${p.position}</div>` : ""}
      </div>
      ${p.twitter ? `
        <div class="mw-social-popup">
          <a href="https://x.com/${p.twitter}" target="_blank" title="Twitter/X">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>` : ""}
    </div>`;
}

// ── Roster ────────────────────────────────────────────
function renderRoster() {
  const grid = document.getElementById("roster-grid");
  const subs = document.getElementById("roster-subsections");
  if (!grid) return;

  const jugadores = rosterData.filter(p => p.role === "jugador" && p.name);
  const streamers = rosterData.filter(p => p.role === "streamer" && p.name);
  const direccion = rosterData.filter(p => p.role === "staff"    && p.name);

  grid.innerHTML = jugadores.map((p, i) => buildCard(p, i, "")).join("");

  if (!subs) return;
  subs.innerHTML = "";

  if (streamers.length > 0) {
    subs.innerHTML += `
      <div class="mw-subsection">
        <div class="mw-subsection-title">// Streamers Asociados</div>
        <div class="mw-sub-grid">
          ${streamers.map((p, i) => buildCard(p, i, "streamer-card")).join("")}
        </div>
      </div>`;
  }

  if (direccion.length > 0) {
    subs.innerHTML += `
      <div class="mw-subsection">
        <div class="mw-subsection-title">// Dirección</div>
        <div class="mw-sub-grid">
          ${direccion.map((p, i) => buildCard(p, i, "staff-card")).join("")}
        </div>
      </div>`;
  }
}

// ── MVP ───────────────────────────────────────────────
function renderMvp() {
  const grid = document.getElementById("mvp-grid");
  if (!grid || !mvpData || mvpData.length === 0) return;
  grid.innerHTML = mvpData.map(m => `
    <div class="mvp-card${m.current ? " current" : ""} reveal">
      ${m.current ? '<span class="mvp-badge-current">MVP ACTUAL</span>' : ''}
      <div style="text-align:center;margin-bottom:6px;">
        <span style="font-family:'Share Tech Mono',monospace;font-size:0.75rem;color:#888;">
          ${m.month} ${m.year}
        </span>
      </div>
      <img class="mvp-img" src="${m.image}" alt="${m.player}"
        onerror="this.style.display='none'">
      <div style="text-align:center;margin-top:10px;font-family:'Barlow Condensed',sans-serif;
        font-weight:700;font-size:1.1rem;color:#fff;text-transform:uppercase;">${m.player}</div>
    </div>
  `).join("");
}

// ── Partidos ──────────────────────────────────────────
let activeStatus = "all";
let activeLeague = "all";

function renderMatches() {
  const container = document.getElementById("matches-list");
  if (!container) return;
  container.innerHTML = "";

  const filtered = matchesData.filter(m => {
    const okStatus = activeStatus === "all" || m.status === activeStatus;
    const okLeague = activeLeague === "all" || m.league === activeLeague;
    return okStatus && okLeague;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center;color:#888;padding:40px;
      font-family:'Share Tech Mono',monospace;">No hay partidos con este filtro.</div>`;
    return;
  }

  filtered.forEach(match => {
    const isUpcoming  = match.status === "upcoming";
    const scoreText   = isUpcoming ? "VS" : `${match.ourScore} - ${match.opponentScore}`;
    const borderColor = match.status === "win"  ? "#2ecc71"
                      : match.status === "loss" ? "#e74c3c" : "#3498db";

    const card = document.createElement("div");
    card.className = `match-card ${match.status} reveal`;
    card.style.cssText = `background:rgba(255,255,255,0.02);border-left:4px solid ${borderColor};
      padding:15px 20px;display:flex;flex-direction:column;gap:15px;
      border-radius:4px;transition:all 0.3s ease;`;

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;
        border-bottom:1px solid rgba(255,255,255,0.05);padding-bottom:8px;">
        <div style="display:flex;align-items:center;gap:8px;">
          ${match.leagueLogo ? `<img src="${match.leagueLogo}" alt="" style="height:18px;">` : ""}
          <span style="font-family:'Share Tech Mono',monospace;font-size:0.8rem;
            color:#888;text-transform:uppercase;">${match.leagueName}</span>
        </div>
        <span style="font-family:'Share Tech Mono',monospace;font-size:0.85rem;color:#666;">
          ${match.date}</span>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:15px;">
        <div style="display:flex;align-items:center;gap:12px;flex:1;justify-content:flex-end;">
          <span style="color:#fff;font-family:'Barlow Condensed',sans-serif;font-weight:700;
            font-size:1.2rem;text-transform:uppercase;">DRAGONS</span>
          <img src="Logos/logo.png" alt="" style="height:35px;width:35px;object-fit:contain;"
            onerror="this.style.display='none'">
        </div>
        <div style="min-width:80px;text-align:center;">
          <span style="background:rgba(255,255,255,0.07);padding:6px 16px;border-radius:4px;
            font-family:'Share Tech Mono',monospace;color:#fff;font-weight:bold;font-size:1.1rem;
            border:1px solid rgba(255,255,255,0.1);">${scoreText}</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;flex:1;justify-content:flex-start;">
          <img src="${match.opponentLogo}" alt="${match.opponent}"
            style="height:35px;width:35px;object-fit:contain;" onerror="this.style.display='none'">
          <span style="color:#aaa;font-family:'Barlow Condensed',sans-serif;font-weight:600;
            font-size:1.2rem;text-transform:uppercase;">${match.opponent}</span>
        </div>
      </div>`;

    card.addEventListener("mouseenter", () => {
      card.style.background = "rgba(255,255,255,0.05)";
      card.style.transform  = "translateY(-2px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.background = "rgba(255,255,255,0.02)";
      card.style.transform  = "translateY(0)";
    });

    container.appendChild(card);
  });

  // re-observar las nuevas cards para la animación de entrada
  observeReveal();
}

// ── Filtros de liga dinámicos ─────────────────────────
function buildLeagueFilters() {
  const container = document.getElementById("league-filters");
  if (!container) return;

  const ligas = {};
  matchesData.forEach(m => {
    if (m.league && !ligas[m.league]) {
      ligas[m.league] = { name: m.leagueName, logo: m.leagueLogo || "" };
    }
  });

  const botones = Object.entries(ligas).map(([key, liga]) => `
    <button class="res-filter" data-league="${key}">
      ${liga.logo ? `<img src="${liga.logo}" alt="" style="height:16px;width:auto;margin-right:6px;vertical-align:middle;" onerror="this.style.display='none'">` : ""}
      ${liga.name}
    </button>
  `).join("");

  container.innerHTML = `
    <button class="res-filter active" data-league="all">Todas las Ligas</button>
    ${botones}
  `;

  container.querySelectorAll(".res-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".res-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeLeague = btn.getAttribute("data-league");
      renderMatches();
    });
  });
}

// ── Palmarés ──────────────────────────────────────────
function renderAchievements() {
  const statTorneos   = document.querySelector(".pal-stat-card:nth-child(1) .pal-stat-num");
  const statGanancias = document.querySelector(".pal-stat-card:nth-child(2) .pal-stat-num");
  if (statTorneos)   statTorneos.textContent   = achievementsStats.torneosGanados;
  if (statGanancias) statGanancias.textContent = achievementsStats.ganancias;

  const palEmpty = document.querySelector(".pal-empty");
  if (!palEmpty) return;

  if (achievementsList.length > 0) {
    palEmpty.style.display = "none";
    const lista = document.createElement("div");
    lista.style.cssText = "display:flex;flex-direction:column;gap:16px;margin-top:24px;";
    lista.innerHTML = achievementsList.map(a => `
      <div class="match-card reveal" style="background:rgba(255,255,255,0.02);
        border-left:4px solid #f1c40f;padding:15px 20px;border-radius:4px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div>
            <span style="font-family:'Barlow Condensed',sans-serif;font-weight:700;font-size:1.2rem;
              color:#fff;text-transform:uppercase;">${a.position} — ${a.title}</span>
            <div style="font-family:'Share Tech Mono',monospace;font-size:0.8rem;color:#888;margin-top:4px;">
              ${a.league} · ${a.date}
            </div>
            ${a.description ? `<div style="color:#aaa;font-size:0.9rem;margin-top:6px;">${a.description}</div>` : ""}
          </div>
          ${a.prize ? `<span style="font-family:'Share Tech Mono',monospace;color:#f1c40f;font-size:1rem;">${a.prize}</span>` : ""}
        </div>
      </div>
    `).join("");
    palEmpty.parentNode.insertBefore(lista, palEmpty);
  } else {
    const icon  = palEmpty.querySelector(".pal-empty-icon");
    const title = palEmpty.querySelector(".pal-empty-title");
    const sub   = palEmpty.querySelector(".pal-empty-sub");
    if (icon)  icon.textContent  = achievementsEmpty.icon;
    if (title) title.textContent = achievementsEmpty.title;
    if (sub)   sub.textContent   = achievementsEmpty.subtitle;
  }
}

// ── Sponsors ──────────────────────────────────────────
function renderSponsors() {
  const grid = document.getElementById("sponsors-grid");
  if (!grid) return;
  grid.innerHTML = sponsorsData.map(s => `
    <div class="sponsor-card reveal">
      <div class="sponsor-logo">
        ${s.logo
          ? `<img src="${s.logo}" alt="${s.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ""}
        <span class="sponsor-initials" style="${s.logo ? "display:none" : ""}">${s.name.charAt(0)}</span>
      </div>
      <div class="sponsor-info">
        <div class="sponsor-tag">${s.tag}</div>
        <h3 class="sponsor-name">${s.name}</h3>
        <p class="sponsor-desc">${s.description}</p>
        ${s.link ? `<a href="${s.link}" target="_blank" class="sponsor-link">Visitar →</a>` : ""}
      </div>
    </div>
  `).join("");
}

// ── Menú responsive ───────────────────────────────────
function toggleMenu() {
  const nav = document.getElementById("nav-mobile");
  const ham = document.getElementById("hamburger");
  if (nav && ham) { nav.classList.toggle("open"); ham.classList.toggle("active"); }
}

// ── Animaciones de entrada (reveal) ───────────────────
function observeReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".reveal:not(.visible)").forEach(el => observer.observe(el));
}

// ── ARRANCA TODO ──────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

  // Estadísticas hero con contador animado
  const jugados   = matchesData.filter(m => m.status === "win" || m.status === "loss");
  const victorias = jugados.filter(m => m.status === "win").length;
  const derrotas  = jugados.filter(m => m.status === "loss").length;
  const winRate   = jugados.length > 0 ? Math.round((victorias / jugados.length) * 100) : 0;

  function contar(elId, hasta, sufijo = "") {
    const el = document.getElementById(elId);
    if (!el) return;
    const inicio = performance.now();
    const dur = 1800;
    (function paso(ahora) {
      const t = Math.min((ahora - inicio) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(ease * hasta) + sufijo;
      if (t < 1) requestAnimationFrame(paso);
    })(inicio);
  }
  contar("rec-wins",    victorias);
  contar("rec-losses",  derrotas);
  contar("rec-wr",      winRate, "%");
  contar("rec-players", rosterData.filter(p => p.role === "jugador").length);
  const elPlayed = document.getElementById("rec-played");
  if (elPlayed) elPlayed.textContent = jugados.length;

  // Ticker automático
  const ticker = document.getElementById("ticker-inner");
  if (ticker) {
    const items = matchesData.map(m => {
      if (m.status === "upcoming") return `PRÓXIMO: DRAGONS vs ${m.opponent.toUpperCase()} (${m.date})`;
      if (m.status === "win")      return `✓ DRAGONS ${m.ourScore} - ${m.opponentScore} ${m.opponent.toUpperCase()}`;
      return `✗ DRAGONS ${m.ourScore} - ${m.opponentScore} ${m.opponent.toUpperCase()}`;
    });
    const text = items.join("   ///   ") + "   ///   ";
    ticker.textContent = text + text;
  }

  // Render de todas las secciones
  renderRoster();
  renderMvp();
  buildLeagueFilters();
  renderMatches();
  renderAchievements();
  renderSponsors();

  // Filtros de estado
  document.querySelectorAll("#status-filters .res-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#status-filters .res-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeStatus = btn.getAttribute("data-status");
      renderMatches();
    });
  });

  // Animaciones de entrada
  observeReveal();
});
