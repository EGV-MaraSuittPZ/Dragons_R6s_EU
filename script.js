// ==========================================
// 1. BASE DE DATOS DE PARTIDOS (Añade o edita aquí)
// ==========================================
const matchesData = [
  {
    opponent: "S.O.T",
    opponentLogo: "sot.png",
    ourScore: 0,
    opponentScore: 0,
    status: "",
    league: "esp",
    leagueName: "Competición Española",
    leagueLogo: "competicion_española.png",
    date: "0 MAY, 2026"
  },
  {
    opponent: "(FW)ProdigiFive",
    opponentLogo: "p5.png",
    ourScore: 0,
    opponentScore: 7,
    status: "loss",
    league: "esp",
    leagueName: "Competición Española",
    leagueLogo: "competicion_española.png",
    date: "1 MAY, 2026"
  },
  {
    opponent: "SCRAV",
    opponentLogo: "scrav",
    ourScore: 7,
    opponentScore: 4,
    status: "win",
    league: "esp",
    leagueName: "Competición Española",
    leagueLogo: "competicion_española.png",
    date: "25 ABR, 2026"
  },
  {
    opponent: "YoungCracks",
    opponentLogo: "yn.png",
    ourScore: 8,
    opponentScore: 6,
    status: "win",
    league: "esp",
    leagueName: "Competición Española",
    leagueLogo: "competicion_española.png",
    date: "19 ABR, 2026"
  },
  {
    opponent: "UDR",
    opponentLogo: "UDR.png", // Puedes cambiarlo por el logo del rival
    ourScore: 7,
    opponentScore: 0,
    status: "win",            // Puede ser: "win", "loss" o "upcoming"
    league: "esp",            // Puede ser: "esp", "liga2" o "liga3"
    leagueName: "Competición Española",
    leagueLogo: "competicion_española.png",
    date: "12 ABR, 2026"
  }, 
];

// ==========================================
// 2. ESTADO DE LOS FILTROS ACTIVOS
// ==========================================
let activeStatus = "all";
let activeLeague = "all";

// ==========================================
// 3. FUNCIÓN PARA PINTAR LOS PARTIDOS EN PANTALLA 
// ==========================================
function renderMatches() {
  const container = document.getElementById("matches-list");
  if (!container) return;

  container.innerHTML = ""; // Limpiamos la lista anterior

  // Filtramos los partidos según la selección del usuario
  const filteredMatches = matchesData.filter(match => {
    const matchesStatus = (activeStatus === "all" || match.status === activeStatus);
    const matchesLeague = (activeLeague === "all" || match.league === activeLeague);
    return matchesStatus && matchesLeague;
  });

  // Si no hay partidos que coincidan con los filtros
  if (filteredMatches.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; color: #888; padding: 40px; font-family: 'Share Tech Mono', monospace;">
        No hay partidos registrados con este filtro.
      </div>`;
    return;
  }

  // Generamos el HTML para cada partido
  filteredMatches.forEach(match => {
    const isUpcoming = match.status === "upcoming";
    const scoreText = isUpcoming ? "VS" : `${match.ourScore} - ${match.opponentScore}`;

    const matchCard = document.createElement("div");
    matchCard.className = `match-card ${match.status}`;
    
    // Contenedor principal de la tarjeta
    matchCard.style.cssText = `
      background: rgba(255, 255, 255, 0.02);
      border-left: 4px solid ${match.status === 'win' ? '#2ecc71' : match.status === 'loss' ? '#e74c3c' : '#3498db'};
      padding: 15px 20px;
      display: flex;
      flex-direction: column;
      gap: 15px;
      border-radius: 4px;
      transition: all 0.3s ease;
    `;

    matchCard.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          ${match.leagueLogo ? `<img src="${match.leagueLogo}" alt="" style="height: 18px; width: auto; object-fit: contain;">` : ""}
          <span style="font-family: 'Share Tech Mono', monospace; font-size: 0.8rem; color: #888; text-transform: uppercase;">
            ${match.leagueName}
          </span>
        </div>
        <span style="font-family: 'Share Tech Mono', monospace; font-size: 0.85rem; color: #666;">
          ${match.date}
        </span>
      </div>

      <div class="match-versus-row" style="display: flex; justify-content: space-between; align-items: center; gap: 15px; width: 100%;">
        
        <div style="display: flex; align-items: center; gap: 12px; flex: 1; justify-content: flex-end; min-width: 0;">
          <span style="color: #fff; font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: clamp(1rem, 2vw, 1.3rem); letter-spacing: 0.5px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            DRAGONS
          </span>
          <img src="logo.png" alt="Dragons Logo" style="height: 35px; width: 35px; min-width: 35px; object-fit: contain;" onerror="this.style.display='none'">
        </div>

        <div style="display: flex; justify-content: center; min-width: 80px; flex-shrink: 0;">
          <span style="background: rgba(255, 255, 255, 0.07); padding: 6px 16px; border-radius: 4px; font-family: 'Share Tech Mono', monospace; color: #fff; font-weight: bold; font-size: clamp(1rem, 2vw, 1.2rem); text-align: center; border: 1px solid rgba(255,255,255,0.1);">
            ${scoreText}
          </span>
        </div>

        <div style="display: flex; align-items: center; gap: 12px; flex: 1; justify-content: flex-start; min-width: 0;">
          <img src="${match.opponentLogo}" alt="${match.opponent}" style="height: 35px; width: 35px; min-width: 35px; object-fit: contain;" onerror="this.style.display='none'">
          <span style="color: #aaa; font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: clamp(1rem, 2vw, 1.3rem); letter-spacing: 0.5px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
            ${match.opponent}
          </span>
        </div>

      </div>
    `;

    // Efecto Hover
    matchCard.addEventListener("mouseenter", () => {
      matchCard.style.background = "rgba(255, 255, 255, 0.05)";
      matchCard.style.transform = "translateY(-2px)";
    });
    matchCard.addEventListener("mouseleave", () => {
      matchCard.style.background = "rgba(255, 255, 255, 0.02)";
      matchCard.style.transform = "translateY(0)";
    });

    container.appendChild(matchCard);
  });
}

// ==========================================
// 4. LÓGICA DE FILTRADO (EVENT LISTENERS)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  
  // Filtros de Estado (Victorias, Derrotas, Próximos)
  const statusButtons = document.querySelectorAll("#status-filters .res-filter");
  statusButtons.forEach(button => {
    button.addEventListener("click", () => {
      statusButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeStatus = button.getAttribute("data-status");
      renderMatches();
    });
  });

  // Filtros de Ligas
  const leagueButtons = document.querySelectorAll("#league-filters .res-filter");
  leagueButtons.forEach(button => {
    button.addEventListener("click", () => {
      leagueButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      activeLeague = button.getAttribute("data-league");
      renderMatches();
    });
  });

  // Render inicial al cargar la página
  renderMatches();
});

// ==========================================
// 5. MENÚ RESPONSIVE (Función toggleMenu de tu HTML)
// ==========================================
function toggleMenu() {
  const mobileNav = document.getElementById("nav-mobile");
  const hamburger = document.getElementById("hamburger");
  if (mobileNav && hamburger) {
    mobileNav.classList.toggle("open");
    hamburger.classList.toggle("active");
  }
}
