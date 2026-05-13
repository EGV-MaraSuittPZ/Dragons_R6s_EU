// ==========================================
//  PARTIDOS — edita aquí
//  Campos:
//    opponent      → nombre del equipo rival
//    opponentLogo  → ruta al logo (en carpeta Logos/)
//    ourScore      → puntuación de DRAGONS
//    opponentScore → puntuación del rival
//    status        → "win" | "loss" | "upcoming"
//    league        → clave interna de la liga (ej: "esp")
//    leagueName    → nombre visible de la liga
//    leagueLogo    → nombre del archivo de logo de la liga (carpeta Logos/)
//    date          → fecha del partido (ej: "25 ABR, 2026")
// ==========================================

const matchesData = [
   {
    opponent: "S.O.T", opponentLogo: "Logos/sot.png",
    ourScore: 0, opponentScore: 0, status: "upcoming",
    league: "kom", leagueName: "King of Master",
    leagueLogo: "kom.png", date: "- MAY, 2026"
  },
  {
    opponent: "ProdigiFive", opponentLogo: "Logos/p5.png",
    ourScore: 0, opponentScore: 0, status: "upcoming",
    league: "esp", leagueName: "Competición Española",
    leagueLogo: "competicion_española.png", date: "- MAY, 2026"
  },
  {
    opponent: "S.O.T", opponentLogo: "Logos/sot.png",
    ourScore: 7, opponentScore: 5, status: "win",
    league: "esp", leagueName: "Competición Española",
    leagueLogo: "competicion_española.png", date: "9 MAY, 2026"
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
