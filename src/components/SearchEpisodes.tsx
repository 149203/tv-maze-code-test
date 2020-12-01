import { seasonType, episodeType } from "../models/clientInterfaces";
import { useEffect, useState } from "react";
import produce from "immer";

interface propsType {
   seasons: readonly seasonType[];
   setDisplayedSeasons: any;
}

export default function SearchEpisodes(props: propsType) {
   const [searchInput, setSearchInput] = useState("");
   const { seasons, setDisplayedSeasons } = props;

   useEffect(() => {
      const newSeasons = produce(seasons, (draftSeasons) => {
         const seasonNumbers = draftSeasons.map((season) => {
            return season.number;
         });
         if (seasonNumbers.includes(Number(searchInput))) {
            return draftSeasons.filter((season) => {
               return season.number === Number(searchInput);
            });
         }
         draftSeasons.forEach((season) => {
            let episodes: episodeType[] = [];
            season.episodes.forEach((episode) => {
               const lowerCasedInput = searchInput.toLowerCase();
               if (
                  (episode.name &&
                     episode.name.toLowerCase().includes(lowerCasedInput)) ||
                  (episode.summary &&
                     episode.summary.toLowerCase().includes(lowerCasedInput))
               ) {
                  episodes = episodes.concat(episode);
               }
            });
            season.episodes = episodes;
            if (episodes.length > 0) {
               draftSeasons = draftSeasons.concat(season);
            }
         });
      }).filter((season) => season.episodes.length > 0);

      setDisplayedSeasons(newSeasons);
   }, [searchInput, seasons, setDisplayedSeasons]);

   return (
      <div className="col-12 mt-5 mb-3">
         <div className="row">
            <div className="col-lg-1 col-md-2 col-sm-2">
               <label htmlFor="search-episodes" className="mt-2">
                  Filter
               </label>
            </div>

            <div className="col-lg-4 col-md-5 col-sm-10">
               <input
                  className="form-control"
                  id="search-episodes"
                  autoComplete="off"
                  onChange={(e) => setSearchInput(e.target.value)}
               />
            </div>
         </div>
      </div>
   );
}
