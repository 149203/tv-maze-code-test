import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { useEffect, useState } from "react";
import produce from "immer";

interface propsType {}

export default function SearchShows(props: propsType) {
   return (
      <div className="d-flex pl-3" id="search-wrapper">
         <SearchIcon
            fill="#dee2e6"
            width="28px"
            className=""
            id="show-search-icon"
         />

         <div className="input-group ml-3" id="show-input-group">
            <input
               type="text"
               className="form-control form-control rounded-left"
               placeholder="Enter a TV show"
               autoComplete="off"
            />
            <div className="input-group-append">
               <button className="btn btn-secondary">Search</button>
            </div>
         </div>
      </div>
   );
}
