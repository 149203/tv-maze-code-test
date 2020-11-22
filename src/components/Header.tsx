import logo from "../icons/top-tv-logo.svg";
export default function Header() {
   return (
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
   );
}
