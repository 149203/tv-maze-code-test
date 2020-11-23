import searchIcon from "../icons/search.svg";
import { seasonType, episodeType } from "../models/clientInterfaces";
import { useEffect, useState } from "react";
import produce from "immer";

interface propsType {
   placeholder: string;
   seasons: readonly seasonType[];
   setDisplayedSeasons: any;
}

export default function Search(props: propsType) {
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
      <>
         <label htmlFor="search">
            <img
               src={searchIcon}
               width="28px"
               style={{ marginTop: "6px" }}
               alt="search"
            />
         </label>
         <input
            className="form-control ml-4"
            placeholder={props.placeholder}
            id="search"
            autoComplete="off"
            onChange={(e) => {
               setSearchInput(e.target.value);
            }}
         />
      </>
   );
}
