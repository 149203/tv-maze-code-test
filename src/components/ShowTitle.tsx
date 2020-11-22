// import { toListText, toShowDate } from "../utils/helpers";
import { toListText, toShowDate } from "../utils/helpers";
import { showType } from "../models/clientInterfaces";

interface propsType {
   show: showType;
}

export default function ShowTitle(props: propsType) {
   return (
      <section>
         <h1>{props.show.name}</h1>
         <p className="text-muted mb-3">
            {toListText(props.show.genres)} | Premiered on{" "}
            {toShowDate(props.show.premieredAt)}
         </p>
      </section>
   );
}
