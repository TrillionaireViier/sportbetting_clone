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

export const mockMatches: Match[] = [
  {
    id: "m1",
    sport: "Football",
    homeTeam: "Manchester City",
    awayTeam: "Real Madrid",
    startTime: "78'",
    isLive: true,
    score: "2 - 1",
    markets: [
      {
        id: "mk1",
        name: "1X2",
        odds: [
          { id: "o1", name: "1", value: 1.45 },
          { id: "o2", name: "X", value: 3.50 },
          { id: "o3", name: "2", value: 5.20 },
        ],
      },
      {
        id: "mk2",
        name: "Over/Under 3.5",
        odds: [
          { id: "o4", name: "Over", value: 1.85 },
          { id: "o5", name: "Under", value: 1.95 },
        ],
      },
    ],
  },
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
