export interface GameData {
  name: string;
  background_image: string;
  genres?: Genre[];
  released?: { date: string }[];
}

export interface Genre {
  id: number;
  name: string;
}