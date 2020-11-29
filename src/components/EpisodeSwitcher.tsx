import { useEffect, useState } from "react";
import produce from "immer";

interface propsType {}

export default function EpisodeSwitcher(props: propsType) {
   return (
      <div className="col-12 mb-5">
         <div className="row">
            <div className="col-lg-1 col-sm-2">
               <label htmlFor="select-season" className="mt-2">
                  Replace
               </label>
            </div>
            <div className="col-lg-2 col-sm-5">
               <select className="form-control" id="select-season">
                  <option>Season 1</option>
               </select>
            </div>
            <div className="col-lg-2 col-sm-5 mt-3 mt-sm-0">
               <select className="form-control" id="select-episode">
                  <option>Episode 1</option>
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
               />
            </div>

            <div className="col-lg-2 col-sm-3 mt-sm-3 mt-lg-0 mt-3 mt-sm-0">
               <button className="btn btn-dark btn-block">Replace</button>
            </div>
         </div>
      </div>
   );
}
