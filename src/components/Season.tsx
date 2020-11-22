import { toShowDate } from "../utils/helpers";
import { seasonType } from "../models/clientInterfaces";
import Episode from "./Episode";

interface propsType {
   season: seasonType;
}

export default function Season(props: propsType) {
   return (
      <section className="col-12">
         <h3>Season {props.season.number}</h3>
         <p className="text-muted">
            {props.season.episodes.length} episode
            {props.season.episodes.length !== 1 ? "s" : ""}
            {props.season.airedAt &&
               " | Aired " + toShowDate(props.season.airedAt)}
         </p>
         <hr className="mt-2 mb-5" />
         {props.season.episodes.map((episode) => {
            return <Episode episode={episode} key={episode.id} />;
         })}
      </section>
   );
}
