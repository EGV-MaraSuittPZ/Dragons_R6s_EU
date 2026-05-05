// ==========================================
// 1. BASE DE DATOS DE PARTIDOS (Añade o edita aquí)
// ==========================================
const matchesData = [
  {
    opponent: "Giants Gaming",
    opponentLogo: "logo.png", // Puedes cambiarlo por el logo del rival
    ourScore: 7,
    opponentScore: 5,
    status: "win",            // Puede ser: "win", "loss" o "upcoming"
    league: "esp",            // Puede ser: "esp", "liga2" o "liga3"
    leagueName: "Competición Española",
    leagueLogo: "competicion_española.png",
    date: "12 ABR, 2026"
  },
  {
    opponent: "Wizards Esports",
    opponentLogo: "logo.png",
    ourScore: 3,
    opponentScore: 7,
    status: "loss",
    league: "esp",
    leagueName: "Competición Española",
    leagueLogo: "competicion_española.png",
    date: "20 ABR, 2026"
  },
  {
    opponent: "Team Secret",
    opponentLogo: "logo.png",
    ourScore: 0,
    opponentScore: 0,
    status: "upcoming",
    league: "liga2",
    leagueName: "Liga 2",
    leagueLogo: "", // Si no tiene logo, se ocultará automáticamente gracias al HTML
    date: "18 MAY, 2026"
  },
  {
    opponent: "Rogue",
    opponentLogo: "logo.png",
    ourScore: 7,
    opponentScore: 2,
    status: "win",
    league: "liga3",
    leagueName: "Liga 3",
    leagueLogo: "",
    date: "02 MAY, 2026"
  }
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
    
    // Le aplicamos estilos en línea alineados con el look esport de tu web
    matchCard.style.cssText = `
      background: rgba(255, 255, 255, 0.02);
      border-left: 4px solid ${match.status === 'win' ? '#2ecc71' : match.status === 'loss' ? '#e74c3c' : '#3498db'};
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 4px;
      transition: all 0.3s ease;
    `;

    matchCard.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 6px;">
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

      <div style="display: flex; align-items: center; gap: 20px; font-family: 'Barlow', sans-serif; font-weight: 600;">
        <span style="color: #fff; letter-spacing: 0.5px;">DRAGONS</span>
        <span style="background: rgba(255, 255, 255, 0.07); padding: 5px 12px; border-radius: 4px; font-family: 'Share Tech Mono', monospace; color: #fff; min-width: 45px; text-align: center;">
          ${scoreText}
        </span>
        <span style="color: #aaa;">${match.opponent}</span>
      </div>
    `;

    // Efecto Hover táctil/ratón
    matchCard.addEventListener("mouseenter", () => {
      matchCard.style.background = "rgba(255, 255, 255, 0.05)";
      matchCard.style.transform = "translateX(5px)";
    });
    matchCard.addEventListener("mouseleave", () => {
      matchCard.style.background = "rgba(255, 255, 255, 0.02)";
      matchCard.style.transform = "translateX(0)";
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
