export interface GameData {
  id: number;
  name: string;
  genres?: Genre[];
  releaseDates?: { date: string }[];
}

export interface Genre {
  id: number;
  name: string;
}