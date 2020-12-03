import "../style/master.scss";
import ShowTitle from "./ShowTitle";
// import CtaButton from "./CtaButton";
import Score from "./Score";
import Season from "./Season";
import SearchShows from "./SearchShows";
import SearchEpisodes from "./SearchEpisodes";
import EpisodeSwitcher from "./EpisodeSwitcher";
import ShowImage from "./ShowImage";
import { useEffect, useState } from "react";
import { showType, seasonType, episodeType } from "../models/clientInterfaces";
import getShow from "../requests/getShow";
import { truncate, stripTags } from "../utils/helpers";
import getSeasons from "../utils/getSeasons";

export default function Show() {
   const initialShow: showType = {
      name: "",
      genres: [],
      premieredAt: "",
      premiered: "",
      image: { medium: "" },
      summary: "",
      url: "",
      rating: {
         average: null,
      },
      _embedded: {
         episodes: [],
      },
   };

   const initialSeasons: readonly seasonType[] = [
      {
         number: 1,
         episodes: [
            {
               season: 1,
               airdate: "",
               id: "",
               summary: "",
               image: { medium: "" },
               name: "",
               number: 0,
               url: "",
            },
         ],
         airedAt: "",
      },
   ];

   const [show, setShow] = useState<showType>(initialShow);
   const [seasons, setSeasons] = useState(initialSeasons);
   const [displayedSeasons, setDisplayedSeasons] = useState(initialSeasons);
   const [hasDataLoaded, setHasDataLoaded] = useState(false);
   const [seasonSelect, setSeasonSelect] = useState(initialSeasons[0].number);
   const [episodeSelect, setEpisodeSelect] = useState(
      initialSeasons[0].episodes[0].number
   );
   const [episodeSelectEpisodes, setEpisodeSelectEpisodes] = useState(
      initialSeasons[0].episodes
   );
   useEffect(() => {
      const tryShow = (randomNum: number) => {
         getShow(`http://api.tvmaze.com/shows/${randomNum}?embed=episodes`)
            .then((show) => {
               if (show) {
                  const seasonsFromEpisodes = getSeasons(
                     show._embedded.episodes
                  );
                  setShow(show);
                  setSeasons(seasonsFromEpisodes);
                  setDisplayedSeasons(seasonsFromEpisodes);
                  setHasDataLoaded(true);
                  setEpisodeSelectEpisodes(seasonsFromEpisodes[0].episodes);
                  setSeasonSelect(seasonsFromEpisodes[0].number);
                  setEpisodeSelect(seasonsFromEpisodes[0].episodes[0].number);
               }
            })
            .catch(() => {
               let randomNum = Math.ceil(Math.random() * 50000);
               console.log(`Retrying for show ${randomNum}`);
               tryShow(randomNum);
            });
      };

      let randomNum = Math.ceil(Math.random() * 50000);
      // randomNum = 22038; // TEST CASES: 101, 507, 261, 47259, 10670, 25251, 48156, 9360, 19720 (404), 32636, 39899, 37628 (episodes lengths), 22038 (Season 0)
      console.log(`Searching for show ${randomNum}`);
      tryShow(randomNum);
   }, []);

   return (
      <>
         <header className="w-100 bg-dark text-white pt-2 pb-1 mb-5">
            <div className="container">
               <div className="row">
                  <SearchShows
                     setShow={setShow}
                     setSeasons={setSeasons}
                     setDisplayedSeasons={setDisplayedSeasons}
                     setHasDataLoaded={setHasDataLoaded}
                     setSeasonSelect={setSeasonSelect}
                     setEpisodeSelect={setEpisodeSelect}
                     setEpisodeSelectEpisodes={setEpisodeSelectEpisodes}
                  />
               </div>
            </div>
         </header>

         {hasDataLoaded && (
            <div>
               <main className="container">
                  <div className="row">
                     <div className="col-12 col-xl-10 offset-xl-1">
                        <article className="row">
                           <div className="col-12 d-md-none">
                              <ShowTitle show={show} />
                           </div>
                           <div className="col-4 col-sm-3">
                              <ShowImage image={show.image} name={show.name} />
                              {/* {show.image && (
                                 <img
                                    src={show.image.medium}
                                    alt={`Promotional poster for ${show.name}`}
                                    className="img-fluid"
                                 />
                              )} */}

                              <div className="float-right mt-3 d-md-none">
                                 <Score
                                    size="sm"
                                    rating={Math.round(
                                       (show.rating.average as number) * 10
                                    )}
                                 />
                              </div>
                              <div className="clearfix" />
                           </div>
                           <div className="col-8 col-sm-9">
                              <div className="row">
                                 <div className="col-12 col-md-12 d-none d-md-block">
                                    <ShowTitle show={show} />
                                 </div>
                                 {/* <div className="d-none d-md-block col-md-2">
                                    <Score
                                       size="md"
                                       rating={Math.round(
                                          (show.rating.average as number) * 10
                                       )}
                                    />
                                 </div> */}
                              </div>
                              <p className="mt-md-4 d-md-none">
                                 {show.summary &&
                                    truncate(stripTags(show.summary), 400)}
                              </p>
                              <p className="mt-md-4 d-none d-md-block">
                                 {show.summary &&
                                    truncate(stripTags(show.summary), 700)}
                              </p>
                           </div>

                           {seasons.length > 0 && (
                              <>
                                 {/* <SearchEpisodes
                                    seasons={seasons}
                                    setDisplayedSeasons={setDisplayedSeasons}
                                 /> */}

                                 <EpisodeSwitcher
                                    displayedSeasons={displayedSeasons}
                                    episodeSelectEpisodes={
                                       episodeSelectEpisodes
                                    }
                                    seasonSelect={seasonSelect}
                                    setSeasonSelect={setSeasonSelect}
                                    episodeSelect={episodeSelect}
                                    setEpisodeSelect={setEpisodeSelect}
                                    setEpisodeSelectEpisodes={
                                       setEpisodeSelectEpisodes
                                    }
                                    setDisplayedSeasons={setDisplayedSeasons}
                                 />

                                 {displayedSeasons.map((season) => {
                                    return (
                                       <Season
                                          season={season}
                                          key={season.number}
                                       />
                                    );
                                 })}
                              </>
                           )}
                        </article>
                     </div>
                  </div>
               </main>
            </div>
         )}
      </>
   );
}
