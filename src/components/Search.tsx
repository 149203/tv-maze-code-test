import { ReactComponent as SearchIcon } from "../icons/search.svg";
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
      <div className="d-flex bg-primary pl-4" id="search-wrapper">
         <label htmlFor="search">
            <SearchIcon
               fill="#cccdd2"
               width="28px"
               style={{ marginTop: "6px" }}
            />
         </label>
         {/* <input
            className="form-control ml-4 bg-transparent text-white"
            placeholder={props.placeholder}
            id="search"
            autoComplete="off"
            onChange={(e) => {
               setSearchInput(e.target.value);
            }}
         /> */}
         <div className="input-group">
            <input
               type="text"
               className="form-control form-control"
               placeholder="Search for a show"
               autoComplete="off"
            />
            <div className="input-group-append">
               <button className="btn btn-success">Go</button>
            </div>
         </div>
      </div>
   );
}
