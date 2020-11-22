export interface episodeType {
   season: number;
   airdate: string;
   id: string;
   summary: string;
   image: { medium: string };
   name: string;
   number: number;
   url: string;
}

export interface seasonType {
   number: number;
   episodes: ReadonlyArray<episodeType>;
   airedAt: string;
}

export interface showType {
   name: string;
   genres: ReadonlyArray<string>; // For mutable arrays: Array<string> or string[]
   premieredAt: string;
   image: {
      medium: string;
   };
   summary: string;
   url: string;
   rating: {
      average: number | null;
   };
   _embedded: {
      episodes: ReadonlyArray<episodeType>;
   };
}
