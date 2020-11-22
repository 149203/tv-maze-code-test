import { truncate, stripTags } from "../utils/helpers";
import { episodeType } from "../models/clientInterfaces";
import Screenshot from "./Screenshot";
import EpisodeTitle from "./EpisodeTitle";

interface propsType {
   episode: episodeType;
}

export default function Episode(props: propsType) {
   return (
      <section className="row mb-7">
         <div className="col-12 d-md-none">
            <EpisodeTitle episode={props.episode} />
         </div>

         <div className="col-5 col-md-3">
            <Screenshot episode={props.episode} />
         </div>
         <div className="col-7 col-md-9">
            <div className="d-none d-md-block">
               <EpisodeTitle episode={props.episode} />
            </div>
            <p>
               {props.episode.summary &&
                  truncate(stripTags(props.episode.summary), 270)}
            </p>
         </div>
      </section>
   );
}
