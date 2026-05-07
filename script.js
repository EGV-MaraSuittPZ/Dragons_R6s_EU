// ==========================================
//  PARTIDOS — edita aquí
// ==========================================
const matchesData = [
  {
    opponent: "S.O.T", opponentLogo: "Logos/sot.png",
    ourScore: 0, opponentScore: 0, status: "upcoming",
    league: "esp", leagueName: "Competición Española",
    leagueLogo: "competicion_española.png", date: "0 MAY, 2026"
  },
  {
    opponent: "(FW)ProdigiFive", opponentLogo: "Logos/p5.png",
    ourScore: 0, opponentScore: 7, status: "loss",
    league: "esp", leagueName: "Competición Española",
    leagueLogo: "competicion_española.png", date: "1 MAY, 2026"
  },
  {
    opponent: "SCRAV", opponentLogo: "Logos/scrav.png",
    ourScore: 7, opponentScore: 4, status: "win",
    league: "esp", leagueName: "Competición Española",
    leagueLogo: "competicion_española.png", date: "25 ABR, 2026"
  },
  {
    opponent: "YoungCracks", opponentLogo: "Logos/yn.png",
    ourScore: 8, opponentScore: 6, status: "win",
    league: "esp", leagueName: "Competición Española",
    leagueLogo: "competicion_española.png", date: "19 ABR, 2026"
  },
  {
    opponent: "UDR", opponentLogo: "Logos/udr.png",
    ourScore: 7, opponentScore: 0, status: "win",
    league: "esp", leagueName: "Competición Española",
    leagueLogo: "competicion_española.png", date: "12 ABR, 2026"
  },
];

// ==========================================
//  ROSTER — edita aquí
// ==========================================
const rosterData = [
 const rosterData = [
  // JUGADORES
  { name: "GwrciaRetun",  role: "jugador",  position: "FLEX",    photo: "" },
  { name: "Xx_Druiazul",  role: "jugador",  position: "IGL",     photo: "" },
  { name: "GABYBEBEE",    role: "jugador",  position: "Support", photo: "Jugadores/Gabybebee.png",  },
  { name: "qSxntxxx",     role: "jugador",  position: "Rifler",  photo: ""  },

  // DIRECCIÓN
  { name: "WZA-copeete",  role: "staff", position: "CEO", photo: "", },
  { name: "MaraSuitt_PZ", role: "staff", position: "CEO", photo: ""},
];
// ── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name) {
  if (!name) return "?";
  const parts = name.split(/[-_\s]/);
  return parts.length >= 2
    ? (parts[0][0] + (parts[1][0] || "")).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

function buildCard(p, index, extraClass) {
  extraClass = extraClass || "";
  const initials  = getInitials(p.name);
  const hasSocial = p.twitter;
  const photoHTML = p.photo
    ? `<img src="${p.photo}" alt="${p.name}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
    : "";

  return `
    <div class="mw-player-card ${extraClass}">
      ${p.position ? `<span class="mw-badge">${p.position}</span>` : ""}
      <span class="mw-num">0${index + 1}</span>
      <div class="mw-avatar">
        ${photoHTML}
        <div class="mw-avatar-bg" ${p.photo ? 'style="display:none"' : ""}>
          <div class="mw-glow"></div>
          <span class="mw-initial">${initials}</span>
        </div>
      </div>
      <div class="mw-info">
        <div class="mw-name">${p.name || "TBD"}</div>
        ${p.position ? `<div class="mw-pos">${p.position}</div>` : ""}
      </div>
      ${hasSocial ? `
        <div class="mw-social-popup">
          <a href="https://x.com/${p.twitter}" target="_blank" title="Twitter/X">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>` : ""}
    </div>`;
}

function renderRoster() {
  const grid = document.getElementById("roster-grid");
  const subs  = document.getElementById("roster-subsections");
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
// ==========================================
//  SPONSORS — edita aquí
// ==========================================
const sponsorsData = [
  { name: "-", logo: "", description: "-", link: "", tag: "Patrocinador Principal" },
];

// ==========================================
//  ESTADO FILTROS
// ==========================================
let activeStatus = "all";
let activeLeague = "all";

// ==========================================
//  MENÚ RESPONSIVE
// ==========================================
function toggleMenu() {
  const nav = document.getElementById("nav-mobile");
  const ham = document.getElementById("hamburger");
  if (nav && ham) { nav.classList.toggle("open"); ham.classList.toggle("active"); }
}

// ==========================================
//  ROSTER: filtro + render
// ==========================================
function filterRoster(btn, role) {
  document.querySelectorAll(".role-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderRoster(role);
}

function renderRoster(role = "all") {
  const grid = document.getElementById("roster-grid");
  if (!grid) return;

  const filtered = role === "all" ? rosterData : rosterData.filter(p => p.role === role);

  grid.innerHTML = filtered.map(p => `
    <div class="roster-card" data-role="${p.role}">
      <div class="rc-photo">
        ${p.photo
          ? `<img src="${p.photo}" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
          : ""}
        <span class="rc-initials" style="${p.photo ? 'display:none' : ''}">${p.name.charAt(0)}</span>
      </div>
      <div class="rc-info">
        <span class="rc-role-badge">${p.role}</span>
        <span class="rc-name">${p.name}</span>
        <span class="rc-position">${p.position}</span>
      </div>
    </div>
  `).join("");
}

// ==========================================
//  RENDER PARTIDOS
// ==========================================
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
    const borderColor = match.status === "win" ? "#2ecc71"
                      : match.status === "loss" ? "#e74c3c" : "#3498db";

    const card = document.createElement("div");
    card.className = `match-card ${match.status}`;
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
          <img src="logo.png" alt="" style="height:35px;width:35px;object-fit:contain;"
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
}

// ==========================================
//  ARRANCA TODO — UN SOLO DOMContentLoaded
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

  // Estadísticas automáticas
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

  // Sponsors
  const sponsorsGrid = document.getElementById("sponsors-grid");
  if (sponsorsGrid) {
    sponsorsGrid.innerHTML = sponsorsData.map(s => `
      <div class="sponsor-card">
        <div class="sponsor-logo">
          ${s.logo ? `<img src="${s.logo}" alt="${s.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">` : ""}
          <span class="sponsor-initials" style="${s.logo ? 'display:none' : ''}">${s.name.charAt(0)}</span>
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

  // Roster inicial
  renderRoster("all");

  // Partidos iniciales
  renderMatches();

  // Filtros de estado
  document.querySelectorAll("#status-filters .res-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#status-filters .res-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeStatus = btn.getAttribute("data-status");
      renderMatches();
    });
  });

  // Filtros de liga
  document.querySelectorAll("#league-filters .res-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("#league-filters .res-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeLeague = btn.getAttribute("data-league");
      renderMatches();
    });
  });

});

// Añade esta función:
function renderMvp() {
  const grid = document.getElementById("mvp-grid");
  if (!grid || !mvpData || mvpData.length === 0) return;
  grid.innerHTML = mvpData.map(m => `
    <div class="mvp-card${m.current ? " current" : ""}">
      ${m.current ? '<span class="mvp-badge-current">MVP ACTUAL</span>' : ''}
      <img class="mvp-img" src="${m.image}" alt="${m.player}">
    </div>
  `).join("");
}

// Dentro del DOMContentLoaded, añade:
renderMvp();
