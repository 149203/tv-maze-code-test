import { seasonType, episodeType } from "../models/clientInterfaces";

export default function getSeasons(episodes: readonly episodeType[]) {
   let seasons: readonly seasonType[] = [];
   episodes.forEach((episode: episodeType) => {
      // get list of season numbers
      const seasonNumbers: readonly number[] = seasons.map(
         (season: seasonType) => {
            return season.number;
         }
      );
      // if episode season number is not in seasons create a new season
      if (!seasonNumbers.includes(episode.season)) {
         const season: seasonType = {
            number: episode.season,
            episodes: [episode],
            airedAt: episode.airdate,
         };
         seasons = seasons.concat(season);
      } else {
         // else concat the episode into its season
         const seasonIndex = seasons.findIndex((season) => {
            return season.number === episode.season;
         });
         const targetSeason = seasons[seasonIndex];
         const episodes = targetSeason.episodes.concat(episode);
         targetSeason.episodes = episodes;
      }
   });
   return seasons;
}
