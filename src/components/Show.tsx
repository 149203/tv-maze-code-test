import "../style/master.scss";
import ShowTitle from "./ShowTitle";
// import CtaButton from "./CtaButton";
import Score from "./Score";
import Season from "./Season";
import SearchShows from "./SearchShows";
import SearchEpisodes from "./SearchEpisodes";
import EpisodeSwitcher from "./EpisodeSwitcher";
import { useEffect, useState } from "react";
import { showType, seasonType } from "../models/clientInterfaces";
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
         number: 0,
         episodes: [],
         airedAt: "",
      },
   ];

   const [show, setShow] = useState<showType>(initialShow);
   const [seasons, setSeasons] = useState(initialSeasons);
   const [displayedSeasons, setDisplayedSeasons] = useState(initialSeasons);
   const [hasDataLoaded, setHasDataLoaded] = useState(false);
   useEffect(() => {
      // 101 = The Good Wife (85)
      // 507 = Angels in America (77)
      // 261 = The Soup (45)
      getShow("http://api.tvmaze.com/shows/101?embed=episodes").then((show) => {
         if (show) {
            const seasonsFromEpisodes = getSeasons(show._embedded.episodes);
            setShow(show);
            setSeasons(seasonsFromEpisodes);
            setDisplayedSeasons(seasonsFromEpisodes);
            setHasDataLoaded(true);
         }
      });
   }, []);

   return (
      <>
         <header className="w-100 bg-dark text-white pt-2 pb-1 mb-5">
            <div className="container">
               <div className="row">
                  <SearchShows />
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
                              <img
                                 src={show.image.medium}
                                 alt={`Promotional poster for ${show.name}`}
                                 className="img-fluid"
                              />

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
                                 <div className="col-12 col-md-10 d-none d-md-block">
                                    <ShowTitle show={show} />
                                 </div>
                                 <div className="d-none d-md-block col-md-2">
                                    <Score
                                       size="md"
                                       rating={Math.round(
                                          (show.rating.average as number) * 10
                                       )}
                                    />
                                 </div>
                              </div>
                              <p className="mt-md-5 d-md-none">
                                 {truncate(stripTags(show.summary), 400)}
                              </p>
                              <p className="mt-md-5 d-none d-md-block">
                                 {truncate(stripTags(show.summary), 700)}
                              </p>
                           </div>

                           <SearchEpisodes
                              seasons={seasons}
                              setDisplayedSeasons={setDisplayedSeasons}
                           />

                           <EpisodeSwitcher />

                           {displayedSeasons.map((season) => {
                              return (
                                 <Season season={season} key={season.number} />
                              );
                           })}
                        </article>
                     </div>
                  </div>
               </main>
            </div>
         )}
      </>
   );
}
