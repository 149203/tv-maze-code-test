import { useEffect, useState } from "react";
import produce from "immer";

interface propsType {}

export default function EpisodeSwitcher(props: propsType) {
   return (
      <div className="col-12 mb-4">
         <form className="form-inline">
            <div className="form-group">
               <label htmlFor="select-season">Replace</label>
               <select className="form-control ml-4" id="select-season">
                  <option>Season 1</option>
               </select>
               <select className="form-control ml-4" id="select-episode">
                  <option>Episode 1</option>
               </select>

               <label className="ml-4" htmlFor="switcher-input">
                  with the TV show:
               </label>
               <input
                  className="form-control ml-4"
                  autoComplete="off"
                  id="switcher-input"
               />
               <button className="btn btn-dark ml-4 px-4">Replace</button>
            </div>
         </form>
      </div>
   );
}
