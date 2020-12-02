// import { toListText, toShowDate } from "../utils/helpers";
import { toListText, toShowDate } from "../utils/helpers";
import { showType } from "../models/clientInterfaces";
import { isPropertySignature } from "typescript";

interface propsType {
   show: showType;
}

export default function ShowTitle(props: propsType) {
   return (
      <section>
         <h1 className="mt-n2">{props.show.name}</h1>
         <p className="text-muted mb-3">
            {props.show.genres.length > 0 && (
               <span>{toListText(props.show.genres)}</span>
            )}
            {props.show.genres.length > 0 && props.show.premieredAt && (
               <span> | </span>
            )}
            {props.show.premieredAt && (
               <span>
                  Premiered on{" "}
                  {props.show.premieredAt && toShowDate(props.show.premieredAt)}
               </span>
            )}
         </p>
      </section>
   );
}
