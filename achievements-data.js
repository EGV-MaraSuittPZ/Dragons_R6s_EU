// ==========================================
//  PALMARÉS / ACHIEVEMENTS — edita aquí
// ==========================================

// ── Estadísticas del palmarés ──────────────────────────
//  Estos valores se muestran en las tarjetas de la sección Palmarés.
//  torneosGanados y ganancias se editan aquí manualmente.
//  partidosJugados se calcula automáticamente desde matchesData.
const achievementsStats = {
  torneosGanados: 0,
  ganancias: "0€",       // ej: "500€" o "1.200€"
};

// ── Lista de logros / títulos ──────────────────────────
//  Añade un objeto por cada título o logro conseguido.
//  Cuando el equipo no tiene títulos aún, deja el array vacío [].
//  Campos:
//    title       → nombre del torneo o logro
//    position    → posición obtenida (ej: "1º", "Top 4")
//    date        → fecha o temporada (ej: "Mayo 2026")
//    league      → nombre de la competición
//    prize       → premio en dinero u otro (ej: "200€") — opcional
//    description → descripción breve — opcional
const achievementsList = [
  // Ejemplo (descomenta y edita cuando tengáis títulos):
  // {
  //   title: "Competición Española",
  //   position: "1º",
  //   date: "Junio 2026",
  //   league: "Competición Española",
  //   prize: "500€",
  //   description: "Primera victoria oficial del equipo."
  // },
];

// ── Textos de la sección cuando no hay títulos ─────────
const achievementsEmpty = {
  icon: "🐉",
  title: "SIN TÍTULOS POR AHORA",
  subtitle: "El equipo está en construcción. Los títulos llegarán.",
};
