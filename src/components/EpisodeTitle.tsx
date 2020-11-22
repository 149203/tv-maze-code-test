import { toShowDate } from "../utils/helpers";
import { episodeType } from "../models/clientInterfaces";

interface propsType {
   episode: episodeType;
}

export default function Episode(props: propsType) {
   return (
      <section>
         <a
            href={props.episode.url}
            target="_blank"
            rel="noreferrer"
            className="mb-1 h5 text-decoration-underline"
         >
            {props.episode.name}
         </a>
         <p className="text-muted mb-2">
            Season {props.episode.season} | Episode {props.episode.number}
            {props.episode.airdate && " | " + toShowDate(props.episode.airdate)}
         </p>
      </section>
   );
}
