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
      <div className="col-12 mt-5 mb-4">
         <div className="d-flex">
            <form className="form-inline">
               <div className="form-group">
                  <label htmlFor="search-episodes">Find an episode:</label>
                  <input
                     className="form-control ml-4"
                     id="search-episodes"
                     autoComplete="off"
                     onChange={(e) => setSearchInput(e.target.value)}
                  />
               </div>
            </form>
         </div>
      </div>
   );
}
