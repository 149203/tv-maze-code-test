export interface iShow {
   name: string;
   genres: ReadonlyArray<string>; // For mutable arrays: Array<string> or string[]
   premieredAt: string;
   image: {
      medium: string;
   };
   summary: string;
   url: string;
}
