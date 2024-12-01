export interface GameData {
  name: string;
  background_image: string;
  genres?: Genre[]; 
  released?: string;  
  rating: number;
  platforms: Platform[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface Platform {
  id: number;
  platform: { name: string };
}

