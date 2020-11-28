import { toShowDate } from "../utils/helpers";
import { episodeType } from "../models/clientInterfaces";

interface propsType {
   episode: episodeType;
}

export default function Episode(props: propsType) {
   return (
      <section>
         <p className="mb-1 h5">{props.episode.name}</p>
         <p className="text-muted mb-2">
            Season {props.episode.season} | Episode {props.episode.number}
            {props.episode.airdate && " | " + toShowDate(props.episode.airdate)}
         </p>
      </section>
   );
}
