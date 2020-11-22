// import { toListText, toShowDate } from "../utils/helpers";
import { toListText, toShowDate } from "../utils/helpers";
import { iShow } from "../models/clientInterfaces";

interface Props {
   show: iShow;
}

export default function ShowTitle(props: Props) {
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
