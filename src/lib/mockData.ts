export type SportCategory = "Football" | "Basketball" | "Tennis" | "Esports";

export interface Odds {
  id: string;
  name: string;
  value: number;
}

export interface Market {
  id: string;
  name: string;
  odds: Odds[];
}

export interface Match {
  id: string;
  sport: SportCategory;
  homeTeam: string;
  awayTeam: string;
  startTime: string; // ISO string or simple time
  isLive: boolean;
  score?: string; // e.g., "2 - 1"
  markets: Market[];
}

const standard1X2Market = (id: string, o1: number, oX: number, o2: number): Market => ({
  id: `mk1X2_${id}`,
  name: "1X2",
  odds: [
    { id: `o1_${id}`, name: "1", value: o1 },
    { id: `oX_${id}`, name: "X", value: oX },
    { id: `o2_${id}`, name: "2", value: o2 },
  ],
});

const standardOUMarket = (id: string, over: number, under: number): Market => ({
  id: `mkOU_${id}`,
  name: "Over/Under 2.5",
  odds: [
    { id: `oO_${id}`, name: "Over", value: over },
    { id: `oU_${id}`, name: "Under", value: under },
  ],
});

export const mockMatches: Match[] = [
  // Football - Live
  {
    id: "m1",
    sport: "Football",
    homeTeam: "Manchester City",
    awayTeam: "Real Madrid",
    startTime: "78'",
    isLive: true,
    score: "2 - 1",
    markets: [
      standard1X2Market("m1", 1.45, 3.50, 5.20),
      standardOUMarket("m1", 1.85, 1.95),
    ],
  },
  {
    id: "m5",
    sport: "Football",
    homeTeam: "Arsenal",
    awayTeam: "Chelsea",
    startTime: "45'",
    isLive: true,
    score: "0 - 0",
    markets: [
      standard1X2Market("m5", 2.10, 3.10, 3.80),
      standardOUMarket("m5", 2.05, 1.75),
    ],
  },
  {
    id: "m6",
    sport: "Football",
    homeTeam: "Bayern Munich",
    awayTeam: "Dortmund",
    startTime: "12'",
    isLive: true,
    score: "1 - 0",
    markets: [
      standard1X2Market("m6", 1.30, 4.50, 7.20),
      standardOUMarket("m6", 1.50, 2.50),
    ],
  },

  // Football - Upcoming
  {
    id: "m7",
    sport: "Football",
    homeTeam: "Barcelona",
    awayTeam: "Atletico Madrid",
    startTime: "Tomorrow, 21:00",
    isLive: false,
    markets: [
      standard1X2Market("m7", 1.95, 3.40, 4.10),
      standardOUMarket("m7", 1.90, 1.90),
    ],
  },
  {
    id: "m8",
    sport: "Football",
    homeTeam: "PSG",
    awayTeam: "Marseille",
    startTime: "Tomorrow, 20:45",
    isLive: false,
    markets: [
      standard1X2Market("m8", 1.55, 4.20, 5.50),
      standardOUMarket("m8", 1.65, 2.20),
    ],
  },
  {
    id: "m9",
    sport: "Football",
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    startTime: "Sunday, 18:30",
    isLive: false,
    markets: [
      standard1X2Market("m9", 2.40, 3.10, 3.00),
      standardOUMarket("m9", 2.10, 1.70),
    ],
  },
  {
    id: "m10",
    sport: "Football",
    homeTeam: "Liverpool",
    awayTeam: "Manchester Utd",
    startTime: "Sunday, 17:30",
    isLive: false,
    markets: [
      standard1X2Market("m10", 1.75, 3.80, 4.50),
      standardOUMarket("m10", 1.75, 2.05),
    ],
  },

  // Basketball
  {
    id: "m2",
    sport: "Basketball",
    homeTeam: "Los Angeles Lakers",
    awayTeam: "Golden State Warriors",
    startTime: "Q3 04:12",
    isLive: true,
    score: "85 - 90",
    markets: [
      {
        id: "mk3",
        name: "Moneyline",
        odds: [
          { id: "o6", name: "LAL", value: 2.10 },
          { id: "o7", name: "GSW", value: 1.75 },
        ],
      },
    ],
  },
  {
    id: "m11",
    sport: "Basketball",
    homeTeam: "Boston Celtics",
    awayTeam: "Miami Heat",
    startTime: "Tomorrow, 02:30",
    isLive: false,
    markets: [
      {
        id: "mk11",
        name: "Moneyline",
        odds: [
          { id: "o11a", name: "BOS", value: 1.45 },
          { id: "o11b", name: "MIA", value: 2.80 },
        ],
      },
    ],
  },

  // Tennis
  {
    id: "m3",
    sport: "Tennis",
    homeTeam: "C. Alcaraz",
    awayTeam: "N. Djokovic",
    startTime: "Tomorrow, 14:00",
    isLive: false,
    markets: [
      {
        id: "mk4",
        name: "Match Winner",
        odds: [
          { id: "o8", name: "1", value: 1.80 },
          { id: "o9", name: "2", value: 2.05 },
        ],
      },
    ],
  },

  // Esports
  {
    id: "m4",
    sport: "Esports",
    homeTeam: "Team Liquid",
    awayTeam: "Natus Vincere",
    startTime: "Today, 18:30",
    isLive: false,
    markets: [
      {
        id: "mk5",
        name: "Match Winner",
        odds: [
          { id: "o10", name: "1", value: 1.65 },
          { id: "o11", name: "2", value: 2.25 },
        ],
      },
    ],
  }
];
