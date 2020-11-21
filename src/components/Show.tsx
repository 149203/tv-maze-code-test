import "../style/master.scss"; // applies global scss styles
import logo from "../icons/top-tv-logo.svg";
import { ShowTitle } from "./ShowTitle";
import { useEffect, useState } from "react";
import axios from "axios";

function Show() {
   const [show, setShow] = useState({ name: "" });

   useEffect(() => {
      console.log("I'm a hook");
      axios
         .get(`http://api.tvmaze.com/shows/101?embed=episodes`)
         .then((res) => {
            console.log(res.data);
            setShow(res.data);
         })
         .catch((error) => {
            console.log(error);
         });
   }, []);

   return (
      <>
         <header className="w-100 bg-primary text-white pt-2 pb-1 mb-6">
            <div className="container">
               <div className="row">
                  <div className="col-12 col-xl-10 offset-xl-1">
                     <img src={logo} width="40px" alt="Episode Switcher logo" />
                     <p className="d-inline ml-4 text-white text-decoration-none lead">
                        Episode Switcher
                     </p>
                  </div>
               </div>
            </div>
         </header>
         <main className="container">
            <div className="row">
               <div className="col-12 col-xl-10 offset-xl-1">
                  <article className="row">
                     <div className="col-12 d-md-none">
                        <ShowTitle name={show.name} />
                     </div>
                     <div className="col-4 col-sm-3">
                        {/* <img
                     src={image.medium}
                     alt={`Promotional poster for ${name}`}
                     className="img-fluid"
                  /> */}
                        <div className="float-right mt-3 d-md-none">
                           {/* <Score
                        size="sm"
                        rating={Math.round(rating.average * 10)}
                     /> */}
                        </div>
                        <div className="clearfix" />
                        {/* <CtaButton url={url} xPadding={0} /> */}
                     </div>
                     <div className="col-8 col-sm-9">
                        <div className="row">
                           <div className="col-12 col-md-10 d-none d-md-block">
                              <ShowTitle name={show.name} />
                           </div>
                           <div className="d-none d-md-block col-md-2">
                              {/* <Score
                           size="md"
                           rating={Math.round(rating.average * 10)}
                        /> */}
                           </div>
                        </div>
                        <p className="mt-md-5 d-md-none">
                           {/* {truncate(stripTags(summary), 400)} */}
                        </p>
                        <p className="mt-md-5 d-none d-md-block">
                           {/* {truncate(stripTags(summary), 700)} */}
                        </p>
                        {/* <CtaButton url={url} xPadding={6} /> */}
                     </div>

                     <div className="col-12 col-md-5 offset-md-7 col-lg-4 offset-lg-8 mt-7 mb-5 mb-md-0 d-flex">
                        {/* <Search
                     placeholder="Search for an episode"
                     onChange={this.searchEpisodes}
                  /> */}
                     </div>

                     {/* {this.state.displayedSeasons.map((season) => {
                  return <Season season={season} key={season.number} />;
               })} */}
                  </article>
               </div>
            </div>
         </main>
      </>
   );
}

export default Show;
