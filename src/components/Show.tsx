import "../style/master.scss";
import logo from "../icons/top-tv-logo.svg";
import { ReactComponent as FilterIcon } from "../icons/filter.svg";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import ShowTitle from "./ShowTitle";
// import CtaButton from "./CtaButton";
import Score from "./Score";
import Season from "./Season";
import Search from "./Search";
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
                  <div className="col-12 col-xl-10 offset-xl-1">
                     <img src={logo} width="40px" alt="Episode Switcher logo" />
                     <h4 className="d-inline ml-4 text-white">
                        Episode Switcher
                     </h4>

                     <Search
                        seasons={seasons}
                        setDisplayedSeasons={setDisplayedSeasons}
                     />
                  </div>
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
                           <div className="col-12 mt-5 mb-4">
                              <div className="d-flex">
                                 <form className="form-inline">
                                    <div className="form-group">
                                       <label htmlFor="search">
                                          Find an episode:
                                       </label>
                                       <input
                                          className="form-control ml-4"
                                          id="search-episodes"
                                          autoComplete="off"
                                       />
                                    </div>
                                 </form>
                              </div>
                           </div>

                           <div className="col-12 mb-4">
                              <form className="form-inline">
                                 <div className="form-group">
                                    <p>Replace</p>
                                    <select
                                       className="form-control ml-4"
                                       id="select-season"
                                    >
                                       <option>Season 1</option>
                                    </select>
                                    <select
                                       className="form-control ml-4"
                                       id="select-episode"
                                    >
                                       <option>Episode 1</option>
                                    </select>
                                    <p className="ml-4">with the TV show:</p>
                                    <input
                                       className="form-control ml-4"
                                       autoComplete="off"
                                       id="show-input"
                                    />
                                    <button className="btn btn-dark ml-4 px-4">
                                       Replace
                                    </button>
                                 </div>
                              </form>
                           </div>

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
