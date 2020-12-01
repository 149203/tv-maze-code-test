// import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { useEffect, useState } from "react";
// import logo from "../icons/top-tv-logo.svg";

interface propsType {}

export default function SearchShows(props: propsType) {
   const initialIsOpen = false;
   const [isOpen, setIsOpen] = useState(initialIsOpen);
   useEffect(() => {
      console.log(isOpen);
      if (isOpen) {
         const inputGroup = document.querySelector<HTMLElement>(
            "#show-input-group"
         );
         const logoWrapper = document.querySelector<HTMLElement>(
            "#logo-wrapper"
         );
         const searchIcon = document.querySelector<HTMLElement>(
            "#show-search-icon"
         );
         if (inputGroup) {
            console.log(inputGroup);
            inputGroup.style.maxWidth = "100%";
            inputGroup.style.opacity = "1";
            inputGroup.style.transition = "max-width 0.8s, opacity 0.2s";
         }
         if (logoWrapper) {
            logoWrapper.style.opacity = "0";
            logoWrapper.style.transition = "opacity 0.3s";
         }
         if (searchIcon) {
            searchIcon.style.marginRight = "0";
         }
      }
   }, [isOpen]);

   return (
      <div className="col-12 col-xl-10 offset-xl-1 mb-2">
         <div className="position-absolute" id="logo-wrapper">
            {/* <img src={logo} width="40px" className="mr-4" alt="Episode Switcher logo" /> */}
            <h4 className="text-white mt-2">Episode Switcher</h4>
         </div>
         <div className="d-inline-flex mt-1 float-right" id="search-wrapper">
            {/* <SearchIcon
               fill="#dee2e6"
               width="28px"
               className="mt-1"
               id="show-search-icon"
               onClick={() => setIsOpen(!isOpen)}
            /> */}

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
      </div>
   );
}
