import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { useEffect, useState } from "react";
import produce from "immer";

interface propsType {}

export default function SearchShows(props: propsType) {
   return (
      <div className="d-flex bg-dark pl-3" id="search-wrapper">
         <div className="input-group">
            <SearchIcon
               fill="#e9ecef"
               width="24px"
               style={{ marginTop: "3px" }}
               className="mr-3"
            />

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
