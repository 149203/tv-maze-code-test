import { useEffect, useState } from "react";
import { seasonType, episodeType } from "../models/clientInterfaces";
import produce from "immer";
import getSeasons from "../utils/getSeasons";
import getShow from "../requests/getShow";

interface propsType {
   seasons: readonly seasonType[];
   seasonSelect: number;
   setSeasonSelect: any; // TODO: replace
   episodeSelect: number;
   setEpisodeSelect: any; // TODO: replace
   episodeSelectEpisodes: any; // TODO: replace with list of episodes
   setEpisodeSelectEpisodes: any;
}

export default function EpisodeSwitcher(props: propsType) {
   const [input, setInput] = useState("");

   const getEpisodes = (seasonNum: number) => {
      return props.seasons.filter((season) => {
         return season.number === seasonNum;
      })[0].episodes;
   };

   const submitEpisode = () => {
      console.log({
         seasonSelect: props.seasonSelect,
         episodeSelect: props.episodeSelect,
         input,
      });
      getShow(
         `http://api.tvmaze.com/singlesearch/shows?q=${input}&embed=episodes`
      )
         .then((show) => {
            if (show) {
               // console.log(show);
               // flatten all episodes
               // find the episode where season and number match
               const episode = show._embedded.episodes.find(
                  (episode: episodeType) => {
                     return (
                        episode.season === props.seasonSelect &&
                        episode.number === props.episodeSelect
                     );
                  }
               );
               console.log(episode);

               // TODO: REPLACE THE CURRENT EPISODE IN THIS SPOT WITH THIS EPISODE
            }
         })
         .catch(() => {
            console.log("NO SHOW!");
         });
   };

   return (
      <div className="col-12 mb-5">
         <div className="row">
            <div className="col-lg-1 col-sm-2">
               <label htmlFor="select-season" className="mt-2">
                  Replace
               </label>
            </div>
            <div className="col-lg-2 col-sm-5">
               <select
                  className="form-control"
                  id="select-season"
                  value={props.seasonSelect}
                  onChange={(e) => {
                     props.setEpisodeSelectEpisodes(
                        getEpisodes(Number(e.target.value))
                     );
                     props.setSeasonSelect(Number(e.target.value));
                  }}
               >
                  {props.seasons.map((season) => {
                     return (
                        <option value={season.number} key={season.number}>
                           Season {season.number}
                        </option>
                     );
                  })}
               </select>
            </div>
            <div className="col-lg-2 col-sm-5 mt-3 mt-sm-0">
               <select
                  className="form-control"
                  id="select-episode"
                  value={props.episodeSelect}
                  onChange={(e) => {
                     props.setEpisodeSelect(Number(e.target.value));
                  }}
               >
                  {props.episodeSelectEpisodes.map((episode: episodeType) => {
                     return (
                        <option value={episode.number} key={episode.number}>
                           Episode {episode.number}
                        </option>
                     );
                  })}
               </select>
            </div>

            <div className="col-lg-1 col-sm-2 mt-3 mt-sm-3 mt-lg-0">
               <label className="mt-2" htmlFor="switcher-input">
                  with
               </label>
            </div>
            <div className="col-lg-3 ml-lg-n4 col-sm-7 mt-sm-3 mt-lg-0">
               <input
                  className="form-control"
                  autoComplete="off"
                  id="switcher-input"
                  value={input}
                  onChange={(e) => {
                     setInput(e.target.value);
                  }}
               />
            </div>

            <div className="col-lg-2 col-sm-3 mt-sm-3 mt-lg-0 mt-3 mt-sm-0">
               <button
                  className="btn btn-dark btn-block"
                  onClick={() => {
                     submitEpisode();
                  }}
               >
                  Replace
               </button>
            </div>
         </div>
      </div>
   );
}
